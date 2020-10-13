import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { EstadosService } from 'src/app/services/estados.service';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-botton-sheet',
  templateUrl: './botton-sheet.component.html',
  styleUrls: ['./botton-sheet.component.scss']
})
export class BottonSheetComponent implements OnInit {
  listEstados = [];
  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private bottomSheetRef: MatBottomSheetRef<BottonSheetComponent>,
    private estados: EstadosService,
    private cliente: ClienteService,
    private snackBar: MatSnackBar
  ) {
    this.listEstados = this.estados.getEstados();
  }

  async asignarEstado(estado) {
    const cuerpo: any = {
      servicio: 'postUpdEstado',
      body: {
        idEstado: estado.id,
        observacion: ''
      },
      bindPath: {
        idEncomienda: this.data.id_enc
      }
    };
    if (estado.id === 4) {
      await Swal.fire({
        title: 'Observación de estado',
        input: 'text',
      }).then((result) => {
        if (result.value) {
          cuerpo.body.observacion = result.value;
        }
      });
    }
    // console.log(estado, this.data, cuerpo)
    this.cliente.callServices(cuerpo)
      .then(t => {
        this.bottomSheetRef.dismiss('reload');
        this.snackBar.open(`Cambio de estado exitoso!`, 'Ok!', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
      });
  }

  ngOnInit(): void {
  }

}
