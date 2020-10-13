import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ClienteService } from 'src/app/services/cliente/cliente.service';


export interface NavItem {
  displayName: string;
  disabled?: boolean;
  iconName: string;
  route?: string;
  children?: NavItem[];
}


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  title = 'logistica Sustentable';
  isAuthenticated = false;
  usuario = {
    nombre: 'Nombre Paterno Materno',
    correo: 'correo@dominio.cl',
    img: ''
  };
  sistemas = 'sistema';

  menuFull: any[] = [];

  menu: NavItem[] = [
    {
      displayName: 'Encomienda Masivo',
      iconName: 'desktop_windows',
      route: 'encomienda/vista/masiva',
      children: [
        {
          displayName: 'Mis Expedientes',
          iconName: 'how_to_reg',
          route: '/misexpedientes'
        },
        {
          displayName: 'Todos',
          iconName: 'waves',
          route: '/todos'
        }
      ]
    },
    {
      displayName: 'Formulario Encomienda',
      iconName: 'ballot',
      route: 'encomienda/vista/unica',
    },
    {
      displayName: 'Gestión Encomienda',
      iconName: 'ballot',
      route: 'encomienda/vista/gestion/encomiendas',
    },
    {
      displayName: 'Mis Ordenes',
      iconName: 'ballot',
      route: 'encomienda/vista/ordenes',
    },
    // {
    //   displayName: 'Expedientes',
    //   iconName: 'description',
    //   children: [
    //     {
    //       displayName: 'Mis Expedientes',
    //       iconName: 'how_to_reg',
    //       route: '/misexpedientes'
    //     },
    //     {
    //       displayName: 'Todos',
    //       iconName: 'waves',
    //       route: '/todos'
    //     }
    //   ]
    // },
    // {
    //   displayName: 'Perfiles',
    //   iconName: 'group',
    //   children: [
    //     {
    //       displayName: 'Búsqueda Perfil',
    //       iconName: 'search',
    //       route: 'busquedaperfiles'
    //     }
    //   ]
    // }
  ];
  usuarioAwkn: any;
  isAdmin = false;
  panelOpenState = false;

  constructor(
    private router: Router,
    private rutaActiva: ActivatedRoute,
    private usuarioService: UsuarioService,
    private cliente: ClienteService
  ) {
    this.usuarioAwkn = this.usuarioService.getAwknSession();
    // if (this.usuarioService.isAutenticated()) {
    //   this.sistemas = 'sistema';
    // } else {
    //   this.sistemas = 'login';
    // }
  }


  ngOnInit(): void {
    this.loadUser();
    this.isAdmin = ((this.usuarioAwkn.roles.includes('ADMIN')) ? true : false);
  }

  loadUser() {
    this.usuario = {
      nombre: this.usuarioService.getDataProfile().name,
      correo: this.usuarioService.getDataProfile().email,
      img: this.usuarioService.getDataProfile().picture
    };
    this.getMenu();
  }

  getMenu() {
    let rol = '';
    if (this.usuarioAwkn.roles.includes('ADMIN')) {
      rol = 'ADMIN';
    } else if (this.usuarioAwkn.roles.includes('REPARTIDOR')) {
      rol = 'REPARTIDOR';
    } else if (this.usuarioAwkn.roles.includes('COMERCIO')) {
      rol = 'COMERCIO';
    }
    const cuerpo = {
      servicio: 'getLayOut',
      body: {
        rol
      }
    };
    this.cliente.callServices(cuerpo)
      .then(t => {
        this.menuFull = t.map(m1 => {
          return {
            display: m1.categoria.nombre,
            icon: m1.categoria.icono,
            url: m1.categoria.url,
            child: m1.modulos.map(m2 => {
              return {
                display: m2.nombre,
                icon: m2.icono,
                url: m2.url
              };
            })
          };
        });
      });
  }

  cerrarSesion() {
    this.usuarioService.logOutGoogle();
  }

  activarRuta(ruta) {
    this.usuarioService.validarSessionRedirect(ruta);
  }

}
