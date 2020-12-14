import { Component, OnInit, ViewEncapsulation, ViewChild, Inject } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClienteService } from 'src/app/services/cliente/cliente.service';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

export interface EncomiendaRow {
  id: number;
  Contacto: string;
  Direccion: string;
  Comuna: string;
  Telefono: number;
  Descripcion: string;
  Alto: number;
  Ancho: number;
  Largo: number;
  Peso: number;
  Valor: number;
}


@Component({
  selector: 'app-editar-encomienda',
  templateUrl: './editar-encomienda.component.html',
  styleUrls: ['./editar-encomienda.component.scss']
})
export class EditarEncomiendaComponent implements OnInit {
  
  @ViewChild('formEncomienda', { static: false }) formEncomienda: FormGroupDirective;
  isValorizado = false;
  comunas: any = [];

  encomienda: FormGroup;

  row: EncomiendaRow = {
    id: this.data.fila.id || -1,
    Contacto: '',
    Direccion: '',
    Comuna: '',
    Alto: 0,
    Ancho: 0,
    Largo: 0,
    Peso: 0,
    Descripcion: '',
    Telefono: 0,
    Valor: 0
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private dialogRef: MatDialogRef<EditarEncomiendaComponent>,
    private cliente: ClienteService,
    private snackBar: MatSnackBar
  ) {
    this.comunas = this.data.comunas;
  }

  ngOnInit(): void {
    if (this.data.isNew) {
      this.encomienda = new FormGroup({
        contacto: new FormControl('', [Validators.required]),
        direccion: new FormControl('', [Validators.required]),
        comuna: new FormControl([Validators.required]),
        alto: new FormControl('', [Validators.required]),
        ancho: new FormControl('', [Validators.required]),
        largo: new FormControl('', [Validators.required]),
        peso: new FormControl('', [Validators.required]),
        descripcion: new FormControl('', [Validators.required])
      });
    } else {
      const fila = this.data.fila;
      this.encomienda = new FormGroup({
        contacto: new FormControl(fila.Contacto, [Validators.required]),
        direccion: new FormControl(fila.Direccion, [Validators.required]),
        comuna: new FormControl(this.comunas.find(v => v.name === fila.Comuna.trim()).name, [Validators.required]),
        alto: new FormControl(fila.Alto, [Validators.required]),
        ancho: new FormControl(fila.Ancho, [Validators.required]),
        largo: new FormControl(fila.Largo, [Validators.required]),
        peso: new FormControl(fila.Peso, [Validators.required]),
        descripcion: new FormControl(fila.Descripcion, [Validators.required])
      });
      this.row.Valor = fila.Valor;
      this.isValorizado = true;
    }
  }

  valorizar(e) {
    const cuerpo = {
      servicio: 'postTarifador',
      body: {
        comuna_desde: this.data.idComunaRetiro,
        comuna_hasta: this.comunas.find(v => v.name.trim() === e.Comuna.trim()).id,
        peso: e.Peso
      }
    };
    this.cliente
      .callServices(cuerpo)
      .then(resp => {
        this.row.Valor = resp.costo_final;
        this.isValorizado = true;
        this.snackBar.open(`Valorización completa!`, 'Ok!', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
      });
  }

  guardar() {
    if (this.encomienda.valid) {
      this.row.Contacto = this.encomienda.get('contacto').value;
      this.row.Direccion = this.encomienda.get('direccion').value;
      this.row.Comuna = this.encomienda.get('comuna').value;
      this.row.Alto = this.encomienda.get('alto').value;
      this.row.Ancho = this.encomienda.get('ancho').value;
      this.row.Largo = this.encomienda.get('largo').value;
      this.row.Peso = this.encomienda.get('peso').value;
      this.row.Descripcion = this.encomienda.get('descripcion').value;
      if (!this.isValorizado) {
        this.valorizar(this.row);
      } else {
        this.dialogRef.close(this.row);
      }
    }
  }

}
