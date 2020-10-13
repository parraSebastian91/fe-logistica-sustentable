import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from './services/usuario.service';

export interface NavItem {
  displayName: string;
  disabled?: boolean;
  iconName: string;
  route?: string;
  children?: NavItem[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // title = 'logistica Sustentable';
  // isAuthenticated = false;
  // usuario = {
  //   nombre: 'Nombre Paterno Materno',
  //   correo: 'correo@dominio.cl',
  //   img: ''
  // };
  // sistemas = 'sistema';
  constructor(
    // private router: Router,
    // private rutaActiva: ActivatedRoute,
    // private usuarioService: UsuarioService
  ) {
    // if (this.usuarioService.isAutenticated()) {
    //   this.sistemas = 'sistema';
    // } else {
    //   this.sistemas = 'login';
    // }
  }

  // menu: NavItem[] = [
  //   {
  //     displayName: 'Encomienda Masivo',
  //     iconName: 'desktop_windows',
  //     route: 'encomienda-masivo',
  //   },
  //   {
  //     displayName: 'Formulario Encomienda',
  //     iconName: 'ballot',
  //     route: 'encomienda-form',
  //   },
  //   // {
  //   //   displayName: 'Expedientes',
  //   //   iconName: 'description',
  //   //   children: [
  //   //     {
  //   //       displayName: 'Mis Expedientes',
  //   //       iconName: 'how_to_reg',
  //   //       route: '/misexpedientes'
  //   //     },
  //   //     {
  //   //       displayName: 'Todos',
  //   //       iconName: 'waves',
  //   //       route: '/todos'
  //   //     }
  //   //   ]
  //   // },
  //   // {
  //   //   displayName: 'Perfiles',
  //   //   iconName: 'group',
  //   //   children: [
  //   //     {
  //   //       displayName: 'Búsqueda Perfil',
  //   //       iconName: 'search',
  //   //       route: 'busquedaperfiles'
  //   //     }
  //   //   ]
  //   // }
  // ];


  ngOnInit(): void {
    // const ruta = this.rutaActiva.snapshot.paramMap.get('tipo');
    // console.log(this.isValidAutentication())
    // if (this.usuarioService.isAutenticated()) {
    //   this.loadUser();
    //   this.sistemas = 'sistema';
    // } else {
    //   this.sistemas = 'login';
    // }
  }

  // isValidAutentication() {
  //   const isValid = this.usuarioService.isAutenticated()
  //     .then(v => {
  //       return v;
  //     });
  //   return isValid;
  // }

  // loadUser() {
  //   this.usuario = {
  //     nombre: this.usuarioService.getDataProfile().name,
  //     correo: this.usuarioService.getDataProfile().email,
  //     img: this.usuarioService.getDataProfile().picture
  //   }
  // }

  // activarRuta(ruta) {
  //   this.router.navigate([ruta.route]);
  // }

  // respLogin(respuesta) {

  //   switch (respuesta) {
  //     case 'RegistroForm':
  //       this.sistemas = 'registro';
  //       break;
  //     case 'Sistema':
  //       this.sistemas = 'sistema';
  //       this.loadUser();
  //       this.router.navigate(['encomienda-form']);
  //       break;
  //   }

  // }

}
