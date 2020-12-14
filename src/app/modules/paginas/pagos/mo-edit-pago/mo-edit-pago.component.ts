import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-mo-edit-pago',
  templateUrl: './mo-edit-pago.component.html',
  styleUrls: ['./mo-edit-pago.component.scss']
})
export class MoEditPagoComponent implements OnInit {
  @ViewChild('formPagos', { static: false }) formPagos: FormGroupDirective;

  pagos: FormGroup;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private dialogRef: MatDialogRef<MoEditPagoComponent>
  ) { }

  ngOnInit(): void {
    this.pagos = new FormGroup({
      montoRetiro: new FormControl(''),
      montoDespacho: new FormControl(''),
    });
    this.pagos.get('montoRetiro').setValue(this.data.pagado_retiro)
    this.pagos.get('montoDespacho').setValue(this.data.pagado_despacho)

    if (this.data.pagado_retiro === 'No Aplica') {
      this.pagos.get('montoRetiro').disable();
    }

    if (this.data.pagado_despacho === 'No Aplica') {
      this.pagos.get('montoDespacho').disable();
    }
  }

  guardar() {
    this.data.pagado_retiro = this.pagos.get('montoRetiro').value;
    this.data.pagado_despacho = this.pagos.get('montoDespacho').value;
    this.dialogRef.close(this.data);
  }

}
