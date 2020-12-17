import { Component, OnInit, ViewEncapsulation, ViewChild, Inject } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
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
  ) { }

  ngOnInit(): void {
    this.idCliente = this.rutaActiva.snapshot.params.id
    this.formPerfil = new FormGroup({
      id: new FormControl(0),
      nombre: new FormControl(''),
      correo: new FormControl(''),
      apellidoPaterno: new FormControl(''),
      apellidoMaterno: new FormControl(''),
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
        if (t.roles.map(m => m.nombre).includes('ADMIN')) {
          this.roles.admin = true;
        } else {
          this.roles.admin = false;
        }
        if (t.roles.map(m => m.nombre).includes('COMERCIO')) {
          this.roles.comercio = true;
        } else {
          this.roles.comercio = false;
        }
        if (t.roles.map(m => m.nombre).includes('REPARTIDOR')) {
          this.roles.repartidor = true;
        } else {
          this.roles.repartidor = false;
        }
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
      cuerpo.body.role.push('ADMIN')
    } else {
      cuerpoQuitar.body.role.push('ADMIN')
    }
    if (this.roles.comercio) {
      cuerpo.body.role.push('COMERCIO')
    } else {
      cuerpoQuitar.body.role.push('COMERCIO')
    }
    if (this.roles.repartidor) {
      cuerpo.body.role.push('REPARTIDOR')
    } else {
      cuerpoQuitar.body.role.push('REPARTIDOR')
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

  validarRequest() {

  }

}
