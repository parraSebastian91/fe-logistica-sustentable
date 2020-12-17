import { Component, OnInit, ViewEncapsulation, ViewChild, Inject } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-gestion-encomienda',
  templateUrl: './gestion-encomienda.component.html',
  styleUrls: ['./gestion-encomienda.component.scss']
})
export class GestionEncomiendaComponent implements OnInit {
  @ViewChild('encomiendaForm', { static: false }) encomiendaForm: FormGroupDirective;

  formEncomienda: FormGroup;

  repartidores = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private cliente: ClienteService,
    public dialogRef: MatDialogRef<GestionEncomiendaComponent>,
    private usuarioService: UsuarioService,
    private snackBar: MatSnackBar
  ) {
    this.repartidores = this.data.repartidores;
  }

  ngOnInit(): void {
    const fila = this.data.fila;
    this.formEncomienda = new FormGroup({
      contactoRetiro: new FormControl(fila.contacto_retiro),
      telefonoRetiro: new FormControl(fila.telefono_retiro),
      direccionRetiro: new FormControl(fila.direccion_retiro),
      contactoDespacho: new FormControl(fila.nombre_destinatario),
      telefonoDespacho: new FormControl(fila.telefono_destinatario),
      direccionDespacho: new FormControl(fila.direccion_destinatario),
      descripcion: new FormControl(fila.descripcion),
      alto: new FormControl(fila.alto),
      ancho: new FormControl(fila.ancho),
      largo: new FormControl(fila.largo),
      peso: new FormControl(fila.peso),
      // repartidor: new FormControl(((fila.asignacion === null) ? '' : fila.asignacion.id_usu), [Validators.required])
      retiro: new FormControl(((fila.asignacion_retiro === null) ? '' : fila.asignacion_retiro.id_usu)),
      despacho: new FormControl(((fila.asignacion_despacho === null) ? '' : fila.asignacion_despacho.id_usu)),
      valorTotal: new FormControl(fila.valor_total)
    });
    this.deshabilitarFormulario();
  }



  deshabilitarFormulario() {
    this.formEncomienda.get('contactoRetiro').disable();
    this.formEncomienda.get('telefonoRetiro').disable();
    this.formEncomienda.get('direccionRetiro').disable();
    this.formEncomienda.get('contactoDespacho').disable();
    this.formEncomienda.get('telefonoDespacho').disable();
    this.formEncomienda.get('direccionDespacho').disable();
    this.formEncomienda.get('descripcion').disable();
    this.formEncomienda.get('alto').disable();
    this.formEncomienda.get('ancho').disable();
    this.formEncomienda.get('largo').disable();
    this.formEncomienda.get('peso').disable();
    if (this.data.fila.envio_especial === 'No') {
      this.formEncomienda.get('valorTotal').disable();
    } else {
      this.formEncomienda.get('valorTotal').enable();
    }
  }

  async guardar() {
    const retiro = this.formEncomienda.get('retiro').value;
    const despacho = this.formEncomienda.get('despacho').value;
    if (this.formEncomienda.valid) {


      // Long id_usu_retiro;
      // Long id_usu_despacho;
      // Long peso;
      // Long pagado_retiro;
      // Long pagado_despacho;

      // Long valor_total;
      // float km_recorrido = 0
      // boolean envio_especial = false;
      // boolean pagado = false;
      // boolean retiro_pagado;
      // boolean despacho_pagado;

      const cuerpoValorTotal = {
        servicio: 'setPagoRepartidor',
        body: {
          valor_total: this.formEncomienda.get('valorTotal').value,
          km_recorrido: 0,
          envio_especial: ((this.data.fila.envio_especial === 'No') ? false : true),
          pagado: ((this.data.fila.pagado === 'No') ? false : true),
          retiro_pagado: this.data.fila.retiro_pagado,
          despacho_pagado: this.data.fila.despacho_pagado
        },
        bindPath: {
          id: this.data.fila.id_enc
        }
      }

      const cuerpo = {
        servicio: 'setRepartidores',
        body: {
          id_usu_retiro: retiro,
          id_usu_despacho: despacho
        },
        bindPath: {
          id: this.data.fila.id_enc
        }
      };

      await this.cliente.callServices(cuerpo)
        .then(t => {
          this.snackBar.open(`Asignación correcta para la encomienda: ${t.cod_seguimiento}`, 'Perfecto!!!', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
          this.dialogRef.close({ resp: 'reload' });
        });

      await this.cliente.callServices(cuerpoValorTotal)
        .then(t => {
          this.snackBar.open(`Se ha actializado los datos para la encomienda: ${t.cod_seguimiento}`, 'Perfecto!!!', {
            duration: 3000,
            horizontalPosition: 'left',
            verticalPosition: 'top',
          });
          this.dialogRef.close({ resp: 'reload' });
        });
    }
  }

  cerrar() {
    this.dialogRef.close({ resp: 'cancelar' });
  }

  descargar() {
    const data = document.getElementById('encomienda');
    html2canvas(data).then(canvas => {
      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jspdf('l', 'cm', 'a4');
      // let pdf = new jspdf('p', 'cm', 'a4');
      pdf.addImage(contentDataURL, 'PNG', 0, 0, 29.7, 21.0);
      pdf.save(`${this.data.fila.cod_seguimiento}.pdf`);
    });
  }

  pagar() {
    const cuerpo = {
      servicio: 'setRepartidores',
      body: {
        id_usu_retiro: null,
        id_usu_despacho: null,
        pagado: true
      },
      bindPath: {
        id: this.data.fila.id_enc
      }
    };

    Swal.fire({
      title: `Encomineda n° ${this.data.fila.cod_seguimiento}`,
      text: '¿Confirma marcar como pagado?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#3085d6',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Confirmar',
      heightAuto: false
    }).then((result) => {
      if (result.value) {
        this.cliente.callServices(cuerpo)
          .then(t => {
            this.snackBar.open(`Encomienda Pagada`, 'Perfecto!!!', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
            });
            this.dialogRef.close({ resp: 'reload' });
          });
      }
    });
  }

}
