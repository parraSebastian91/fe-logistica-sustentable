import { Component, OnInit, EventEmitter, ViewChild, Output } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { UsuarioService } from 'src/app/services/usuario.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('ingreso', [
      state('fin', style({
        'padding-top': '0',
        transform: 'scale(1)',
        opacity: '1'
      })),
      state('inicio', style({
        'padding-top': '300px',
        transform: 'scale(0.8)',
        opacity: '0'
      })),
      transition('inicio => fin', animate('250ms ease-in')),
      transition('fin => inicio', animate('250ms ease-out'))
    ]),
    trigger('spinner', [
      state('inicio', style({
        display: 'unset',
        opacity: '1'
      })),
      state('fin', style({
        display: 'none',
        opacity: '0'
      })),
      transition('inicio => fin', animate('250ms ease-in')),
      transition('fin => inicio', animate('250ms ease-out'))
    ])
  ]
})
export class LoginComponent implements OnInit {
  estadoLogin = 'inicio';
  estadoSpinner = 'inicio';
  iconCorreo = faEnvelope;

  @Output() respLogin = new EventEmitter();

  @ViewChild('formLogin', { static: false }) formLogin: FormGroupDirective;
  loginForm: FormGroup;

  constructor(
    private clienteService: ClienteService,
    private userService: UsuarioService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      setTimeout(() => {
        this.estadoLogin = 'fin';
      }, 300);
      this.estadoSpinner = 'fin';
    }, 1500);
    this.loginForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  Registrar() {
    this.router.navigate(['auth', 'register']);
  }

  async loginWithGoogle() {
    const userGoogle: any = await this.userService.loginGoogle()
      .then(v => {
        return {
          cod: 'ok',
          usr: v
        };
      }).catch(err => {
        Swal.fire({
          title: 'Error!',
          text: 'Existió un problema, por favor intentelo de nuevo',
          icon: 'error',
          confirmButtonText: 'ok',
          heightAuto: false
        });
        return {
          cod: 'error',
          usr: undefined
        };
      });
    if (userGoogle.cod !== 'error') {
      this.userService.setSessionActive(userGoogle.usr);
      this.loginByGoogle();
    }
  }

  validateUserAwkn() {
    return new Promise((resolve, reject) => {

    });
    // this.validateUserAwkn()
    // console.log(v);
  }

  loginByGoogle() {
    const cuerpo = {
      servicio: 'postLogin',
      body: {
        username: this.userService.getNameUser(),
        password: '',
        token: this.userService.getAccessToken()
      }
    };
    this.clienteService.callServices(cuerpo)
      .then(v => {
        v.googleLog = true;
        this.userService.setSessionAwkn(v);
        this.estadoLogin = 'inicio';
        setTimeout(() => {
          if (v.roles.includes('ADMIN')) {
            this.router.navigate(['encomienda', 'vista', 'gestion', 'encomiendas']);
          } else if (v.roles.includes('COMERCIO')) {
            this.router.navigate(['encomienda', 'seleccion-vista']);
          }
        }, 300);
      }).catch(err => {
        if (err.error.message === 'Usuario no existe') {
          Swal.fire({
            title: 'Usuario no registrado',
            text: '¿Eres tú?, parece que no te tenemos registrado...',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#3085d6',
            cancelButtonText: 'Volver a intentar',
            confirmButtonText: 'Registrate aquí!',
            heightAuto: false
          }).then((result) => {
            if (result.value) {
              this.registrarByGoogle();
            }
          });
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'Existió un problema, por favor intentelo de nuevo',
            icon: 'error',
            confirmButtonText: 'ok',
            heightAuto: false
          });
        }
      });
  }

  login() {
    if (this.loginForm.valid) {
      const cuerpo = {
        servicio: 'postLogin',
        body: {
          username: this.loginForm.get('userName').value,
          password: this.loginForm.get('password').value,
          token: ''
        }
      };
      this.clienteService.callServices(cuerpo)
        .then(v => {
          v.googleLog = false;
          this.userService.setSessionAwkn(v);
          this.router.navigate(['encomienda', 'vista', 'unica']);
        }).catch(err => {
          console.log(err)
          if (err.error.message === 'Usuario no existe') {
            Swal.fire({
              title: 'Usuario no registrado?',
              text: '¿Eres tú?, parece que no te tenemos registrado...',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              cancelButtonText: 'Volver a intentar',
              confirmButtonText: 'Registrate!',
              heightAuto: false
            }).then((result) => {
              if (result.value) {
                this.Registrar();
              }
            });
          } else {
            Swal.fire({
              title: 'Error!',
              text: 'Existió un problema, por favor intentelo de nuevo',
              icon: 'error',
              confirmButtonText: 'ok',
              heightAuto: false
            });
          }
        });
    }
  }

  registrarByGoogle() {
    const cuerpo = {
      servicio: 'postRegistro',
      body: {
        username: this.userService.getDataProfile().email,
        password: '',
        nombre: this.userService.getDataProfile().given_name,
        apellido_pa: this.userService.getDataProfile().family_name,
        apellido_ma: '',
        role: ['COMERCIO'] // ['COMERCIO', 'REPARTIDOR', 'ADMIN']
      }
    };
    this.clienteService.callServices(cuerpo)
      .then(v => {
        Swal.fire({
          title: '!Registro Existoso!',
          // text: 'Existió un problema, por favor intentelo de nuevo',
          icon: 'success',
          confirmButtonText: 'ok',
          heightAuto: false
        }).then((resp) => {
          this.loginByGoogle();
        });
      });
  }


}
