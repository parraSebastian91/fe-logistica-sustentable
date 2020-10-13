import { Component, OnInit, ViewEncapsulation, ViewChild, Inject } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-punto-retiro',
  templateUrl: './punto-retiro.component.html',
  styleUrls: ['./punto-retiro.component.scss']
})
export class PuntoRetiroComponent implements OnInit {
  puntoRetiro: FormGroup;
  @ViewChild('formPuntoRetiro', { static: false }) formPuntoRetiro: FormGroupDirective;

  comunas: any = [];

  constructor(
    private cliente: ClienteService,
    public dialogRef: MatDialogRef<PuntoRetiroComponent>,
    private usuarioService: UsuarioService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.puntoRetiro = new FormGroup({
      nombrePunto: new FormControl('', [Validators.required]),
      nombreRetiro: new FormControl('', [Validators.required]),
      direccionRetiro: new FormControl('', [Validators.required]),
      comunaRetiro: new FormControl('', [Validators.required]),
      telefonoRetiro: new FormControl('', [Validators.required]),
      referenciaRetiro: new FormControl('', [Validators.required]),
    });
    this.getAllComuna();
  }

  async getAllComuna() {
    this.comunas = await this.cliente.callServices({ servicio: 'getComunaByProvincia' })
      .then(v => {
        return v.map(e => {
          return {
            id: e.id_com,
            name: e.nombre
          };
        });
      })
      .catch(e => console.log(e));
  }

  guardar() {
    if (this.puntoRetiro.valid) {
      const cuerpo = {
        servicio: 'setPuntoRetiro',
        body: {
          nombre: this.puntoRetiro.get('nombrePunto').value, // nombre tienda
          nombre_contacto: this.puntoRetiro.get('nombreRetiro').value,
          direccion: this.puntoRetiro.get('direccionRetiro').value,
          telefono: this.puntoRetiro.get('telefonoRetiro').value,
          // fecha_inicio: '2020-07-11',
          referencia: this.puntoRetiro.get('referenciaRetiro').value,
          id_usu: this.usuarioService.getAwknSession().id,
          id_com: this.puntoRetiro.get('comunaRetiro').value,
        }
      };
      this.cliente.callServices(cuerpo).then(resp => {
        this.snackBar.open(`Se ha creado la tienda: ${cuerpo.body.nombre}`, 'Bien!', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
        this.dialogRef.close(resp);
      });
    }
  }

}
