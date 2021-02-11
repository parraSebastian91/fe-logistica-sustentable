import { Component, OnInit, Inject } from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-resumen-encomienda',
  templateUrl: './resumen-encomienda.component.html',
  styleUrls: ['./resumen-encomienda.component.scss']
})
export class ResumenEncomiendaComponent implements OnInit {
  codigoSeguimiento = -1;
  retiro = {
    nombre: '',
    direccion: '',
    telefono: '',
    referencia: ''
  };
  headers: string[];
  displayedColumns: string[] = ['numero', 'contacto', 'direccion', 'telefono', 'valor'];
  dataSource: any;
  valorTotal: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<ResumenEncomiendaComponent>,

  ) {

  }

  ngOnInit(): void {
    this.valorTotal = ((this.data.valorTotal === 0) ? 'Por Confirmar' : this.data.valorTotal);
    this.codigoSeguimiento = this.data.codigoSeguimiento;
    this.retiro = this.data.retiro;
    this.dataSource = this.data.encomiendas;
  }

  descargar() {
    const data = document.getElementById('orden');
    html2canvas(data).then(canvas => {
      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jspdf('l', 'cm', 'a4');
      // let pdf = new jspdf('p', 'cm', 'a4');
      pdf.addImage(contentDataURL, 'PNG', 0, 0, 29.7, 21.0);
      pdf.save('Filename.pdf');
    });
  }

  cerrar() {
    this.dialogRef.close({ resp: 'reload' });
  }

}
