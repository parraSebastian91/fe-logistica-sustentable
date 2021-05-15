import { Component, OnInit, ViewEncapsulation, ViewChild, Inject } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  formPerfil: FormGroup;
  idCliente: Number;

  roles = {
    admin: false,
    comercio: false,
    repartidor: false
  }

  constructor(
    private rutaActiva: ActivatedRoute,
    private cliente: ClienteService,
    private router: Router,
    private usuario: UsuarioService
  ) { }

  ngOnInit(): void {
    this.idCliente = this.rutaActiva.snapshot.params.id    
    if(!this.idCliente){
      this.idCliente = this.usuario.getAwknSession().username;
    }
    this.formPerfil = new FormGroup({
      id: new FormControl(0),
      nombre: new FormControl(''),
      correo: new FormControl(''),
      apellidoPaterno: new FormControl(''),
      apellidoMaterno: new FormControl(''),
      adminChk: new FormControl(false),
      comercioChk: new FormControl(false),
      repartidorChk: new FormControl(false),
    });
    this.obtenerCliente();
  }

  obtenerCliente() {
    const cuerpo = {
      servicio: 'getUsuarioByCorreo',
      body: { correo: this.idCliente }
    }
    this.cliente.callServices(cuerpo)
      .then(t => {
        this.formPerfil.get('id').setValue(t.id_usu);
        this.formPerfil.get('nombre').setValue(t.nombre);
        this.formPerfil.get('apellidoPaterno').setValue(t.apellido_pa);
        this.formPerfil.get('apellidoMaterno').setValue(t.apellido_ma);
        this.formPerfil.get('correo').setValue(t.username);
        this.formPerfil.get('correo').disable();
        this.formPerfil.get('adminChk').setValue(t.roles.map(m => m.nombre).includes('ADMIN'));
        this.formPerfil.get('comercioChk').setValue(t.roles.map(m => m.nombre).includes('COMERCIO'));
        this.formPerfil.get('repartidorChk').setValue(t.roles.map(m => m.nombre).includes('REPARTIDOR'));
      });
  }

  guardar() {
    const cuerpo = {
      servicio: 'updUsuario',
      body: {
        password: null,
        nombre: this.formPerfil.get('nombre').value,
        apellido_pa: this.formPerfil.get('apellidoPaterno').value,
        apellido_ma: this.formPerfil.get('apellidoMaterno').value,
        role: []
      },
      bindPath: {
        usuario: this.formPerfil.get('id').value
      }
    }

    const cuerpoQuitar = {
      servicio: 'deleteRol',
      body: {
        role: []
      },
      bindPath: {
        usuario: this.formPerfil.get('id').value
      }
    }

    if (this.roles.admin) {
      (this.formPerfil.get('adminChk').value)?cuerpo.body.role.push('ADMIN'):cuerpoQuitar.body.role.push('ADMIN');
    }
    if (this.roles.comercio) {
      (this.formPerfil.get('comercioChk').value)?cuerpo.body.role.push('COMERCIO'):cuerpoQuitar.body.role.push('COMERCIO');
    }
    if (this.roles.repartidor) {
      (this.formPerfil.get('repartidorChk').value)?cuerpo.body.role.push('REPARTIDOR'):cuerpoQuitar.body.role.push('REPARTIDOR');
    }

    this.cliente.callServices(cuerpo)
      .then(t => {
        this.cliente.callServices(cuerpoQuitar)
          .then(t => {
            Swal.fire({
              title: 'Operación Correcta',
              text: 'La actualización de usuario se completo exitósamente',
              icon: 'success',
              confirmButtonText: 'ok',
              heightAuto: false
            })
              .then(t => {
                this.router.navigate(['encomienda', 'vista', 'mantenedor', 'lista-usuarios']);
              });
          })
          .catch(err => {
            Swal.fire({
              title: 'Existio un error en la operación',
              text: 'Ha ocurrido un error en el proceso de actualización',
              icon: 'error',
              confirmButtonText: 'ok',
              heightAuto: false
            })
              .then(t => {
                this.router.navigate(['encomienda', 'vista', 'mantenedor', 'lista-usuarios']);
              });
          });
      });
  }

  eventos(opc) {
    switch(opc){
      case'admin':
        this.roles.admin = true;
      break;
      case'comercio':
        this.roles.comercio = true;
      break;
      case'repartidor':
        this.roles.repartidor = true;
      break;
    }
  }

}
