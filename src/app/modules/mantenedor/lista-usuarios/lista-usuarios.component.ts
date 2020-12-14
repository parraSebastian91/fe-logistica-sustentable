import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente/cliente.service';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.scss']
})
export class ListaUsuariosComponent implements OnInit {

  columnasQuitadas = ['id'];
  listaUsuarios = [];
  aliniacionColumna = {
    ingreso: 'center',
    rol: 'center',
    egreso: 'center'
  };
  accionFila = ['edit', 'see'];
  seleccionFila = false;
  listUsuarios = [];
  anchoColumna = {
    ingreso: 120,
    egreso: 120,
    rol: 100
  };

  constructor(
    private cliente: ClienteService,
  ) { }


  ngOnInit(): void {
    this.getListUsuarios()
  }

  getListUsuarios() {
    const cuerpo = {
      servicio: 'getListUsuarios',
    }
    this.cliente.callServices(cuerpo)
      .then(t => {
        console.log(t)
        this.listaUsuarios = t.map(m => {
          const row = {
            id: m.id_usu,
            nombre: `${m.nombre} ${m.apellido_pa} ${m.apellido_ma}`,
            usuario: m.username,
            ingreso: new Date(m.fecha_inicio).toLocaleDateString(),
            egreso: ((m.fecha_fin === null) ? 'No Aplica' : new Date(m.fecha_fin).toLocaleDateString()),
            rol: this.getRol(m.roles)
          }
          return row;
        })
      })
  }

  getRol(rolesArray: any[]) {
    const roles = rolesArray.map(m => m.nombre)
    if (roles.includes('ADMIN')) {
      return 'Administrador'
    }
    if (roles.includes('COMERCIO')) {
      return 'Comercio'
    }
    if (roles.includes('REPARTIDOR')) {
      return 'Repartidor'
    }
  }

  editarUsuario(evt) {

  }

  exportarUsuarios() {

  }

  filaSeleccionada(evt) {

  }

}
