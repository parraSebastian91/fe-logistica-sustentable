import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { faRulerCombined, faWeightHanging, faClipboard } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-orden-detalle',
  templateUrl: './orden-detalle.component.html',
  styleUrls: ['./orden-detalle.component.scss']
})
export class OrdenDetalleComponent implements OnInit {

  regla = faRulerCombined;
  pesa = faWeightHanging;
  nota = faClipboard;

  selecShop = {
    idDireccion: -1,
    NombreTienda: '',
    nameContacto: '',
    direccion: '',
    comuna: { id: '', name: '' },
    telefono: '',
    referencia: ''
  };

  ptoDespacho = {
    nameContacto: '',
    direccion: '',
    comuna: { id: '', name: '' },
    telefono: '',
    referencia: ''
  };

  dataEncomienda = {
    descripcion: '',
    dimenciones: {
      ancho: 0,
      alto: 0,
      largo: 0
    },
    peso: 0
  };

  costo = 0;
  comunaDest: any;
  comunmaRem: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<OrdenDetalleComponent>,
  ) { }

  ngOnInit(): void {
    this.comunaDest = this.data.comunas.find(f => f.id === this.data.orden.direccion_remitente.id_com);
    this.comunmaRem = this.data.comunas.find(f => f.id === this.data.orden.id_com_dest);
  }

  cerar() {
    this.dialogRef.close();
  }

}



