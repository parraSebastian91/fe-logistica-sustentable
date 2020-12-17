import { Component, OnInit, ViewEncapsulation, ViewChild, Inject } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente/cliente.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  formPerfil: FormGroup;
  idCliente: Number;

  constructor(
    private rutaActiva: ActivatedRoute,
    private cliente: ClienteService,
  ) { }

  ngOnInit(): void {
    this.idCliente = this.rutaActiva.snapshot.params.id
    this.formPerfil = new FormGroup({
      nombre: new FormControl(''),
      apellidoPaterno: new FormControl(''),
      apellidoMaterno: new FormControl('')
    });
    this.obtenerCliente();
  }

  obtenerCliente() {
 
  }

  guardar() {

  }

}
