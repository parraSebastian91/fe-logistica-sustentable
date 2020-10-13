import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.scss']
})
export class FiltroComponent implements OnInit {

  columna = 'indice';
  filtro;
  filtroText;
  selectData;
  @Input() control;
  constructor(
    public dialogRef: MatDialogRef<FiltroComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.filtro = '';
    this.filtroText = '';
    dialogRef.disableClose = true;
    if (!this.data.data) {
      this.data = { data: [], filtro: { filtro: '', filtroText: '' } };
    }
  }

  ngOnInit() {
    this.selectData = this.data.data.sort();
    if (this.data.filtro.filtro) {
      this.filtro = this.data.filtro.filtro;
      this.filtroText = this.data.filtro.filtroText;
    }
  }

  aplicarFiltro() {
    this.dialogRef.close({
      filtro: this.filtro,
      filtroText: this.filtroText,
      columna: this.data.process,
      accion: 'aplicarFiltro'
    });
  }

  applyFilter(filtro: string) {
    this.filtro = filtro;
  }

  onResetear() {
    this.dialogRef.close({
      filtro: '',
      filtroText: '',
      columna: this.data.process,
      accion: 'resetear'
    });
  }
  validar(valor) {
    // let val = valor.replace('.', '');
    const val = valor.replace(',', '.');
    this.filtroText = val;
  }

  onCancel() {
    this.dialogRef.close('');
  }
}
