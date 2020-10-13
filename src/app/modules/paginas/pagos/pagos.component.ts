import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { faTachometerAlt, faUserTie, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment, Moment } from 'moment';

const moment = _rollupMoment || _moment;

// const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
  parse: {
    dateInput: 'DD-MM-YYYY',
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LLLL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [
        MAT_DATE_LOCALE,
        MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})
export class PagosComponent implements OnInit {
  @ViewChild('formPagos', { static: false }) formPagos: FormGroupDirective;
  faTachometerAlt = faTachometerAlt;
  anchoColumna = {
    estado: 75,
    pagado: 75,
    fecha_creacion: 120,
    cod_seguimiento: 150,
    telefono_retiro: 180,
    alto: 100,
    ancho: 100,
    largo: 100,
    peso: 100,
    comuna_destinatario: 180,
    telefono_destinatario: 180,
    pagado_despacho: 100,
    despacho_pagado: 80,
    retiro_pagado: 80,
    pagado_retiro: 100,
    valor_total: 100
  };

  aliniacionColumna = {
    estado: 'center',
    pagado: 'center',
    fecha_creacion: 'center',
    cod_seguimiento: 'center',
    alto: 'center',
    ancho: 'center',
    largo: 'center',
    peso: 'center',
  };

  cantidadEspeciales = 0;
  cantidadNormales = 0;
  totalEspeciales = 0;
  totalNormales = 0;
  encomiendasEspeciales = [];
  encomiendasNormales = [];

  pagosForm: FormGroup;
  resumenForm: FormGroup;
  listaRepartidores: any;
  comunas;
  arrayPagoNormales: any[];
  arrayPagoEspeciales: any[];
  constructor(
    private cliente: ClienteService,
  ) { }


  ngOnInit(): void {
    this.pagosForm = new FormGroup({
      idRepartidor: new FormControl('', [Validators.required]),
      fechaInicial: new FormControl(moment(), [Validators.required]),
      fechaFinal: new FormControl(moment(), [Validators.required]),
    });

    this.resumenForm = new FormGroup({

    })


    this.init();
  }

  async init() {
    this.comunas = await this.cliente.callServices({ servicio: 'getComunaByProvincia' })
      .then(v => {
        return v.map(e => {
          return {
            id: e.id_com,
            name: e.nombre
          };
        });
      })
      .catch(e => console.log(e)); this.getRepartidores();
  }

  getComuna() {

  }

  verPedido(evt) {

  }

  buscar() {
    if (this.pagosForm.valid) {
      const fechaDesde = this.pagosForm.get('fechaInicial').value;
      const fechaHasta = this.pagosForm.get('fechaFinal').value;
      const cuerpo = {
        servicio: 'getDetalleRetartidor',
        body: {
          fecha_desde: fechaDesde.format('YYYY-MM-DD'),
          fecha_hasta: fechaHasta.format('YYYY-MM-DD'),
          id_repartidor: this.pagosForm.get('idRepartidor').value
        }
      }
      this.cliente
        .callServices(cuerpo)
        .then((t: any[]) => {
          console.log(t)
          let especiales = [];
          let normales = [];
          t.map(m => {
            // const tienda = this.listaTiendas.find(f => f.id === m.id_dir_rem);
            return {
              estado: m.seguimiento,
              cod_seguimiento: m.cod_seguimiento,
              pagado: ((m.pagado) ? 'Sí' : 'No'),
              fecha_creacion: new Date(m.fecha_inicio).toLocaleDateString(),
              // asignnacion_de_retiro: ((m.usuario_retiro === null) ? 'NO ASIGNADO' : `${m.usuario_retiro.nombre} ${m.usuario_retiro.apellido_pa}`),
              // asignnacion_de_despacho: ((m.usuario_despacho === null) ? 'NO ASIGNADO' : `${m.usuario_despacho.nombre} ${m.usuario_despacho.apellido_pa}`),
              // contacto_retiro: m.direccion_remitente.nombre_contacto,
              direccion_retiro: `${m.direccion_remitente.direccion}, ${this.comunas.find((valor: any) => valor.id === m.direccion_remitente.id_com).name}`,
              // telefono_retiro: m.direccion_remitente.telefono,
              // nombre_destinatario: m.nombre_destinatario,
              direccion_destinatario: `${m.direccion_destinatario}, ${this.comunas.find(f => f.id === m.id_com_dest).name}`,
              // comuna_destinatario: this.comunas.find(f => f.id === m.id_com_dest).name,
              // telefono_destinatario: m.telefono_destinatario,
              descripcion: m.descripcion,
              // alto: m.alto,
              // ancho: m.ancho,
              // largo: m.largo,
              peso: m.peso,
              // id_enc: m.id_enc,
              asignacion_retiro: m.usuario_retiro,
              asignacion_despacho: m.usuario_despacho,
              pagado_despacho: m.pagado_despacho,
              despacho_pagado: ((m.despacho_pagado) ? 'Sí' : 'No'),
              pagado_retiro: m.pagado_retiro,
              retiro_pagado: ((m.retiro_pagado) ? 'Sí' : 'No'),
              envio_especial: m.envio_especial,
              valor_total: m.valor_total
            };
          }).forEach(d => {
            if (d.envio_especial) {
              this.totalEspeciales += d.valor_total;
              this.cantidadEspeciales++;
              especiales.push(d)
            } else {
              this.totalNormales += d.valor_total;
              this.cantidadNormales++;
              normales.push(d);
            }
          });
          this.encomiendasNormales = normales;
          this.encomiendasEspeciales = especiales;
        })
        .catch(e => console.log(e));
    }
  }

  async getRepartidores() {
    this.listaRepartidores = await this.cliente
      .callServices({ servicio: 'getRepartidores' })
      .then(v => v)
      .catch(e => console.log(e));
  }

  pagoNormales(evt) {
    this.arrayPagoNormales = evt;
  }

  pagoEspeciales(evt) {
    this.arrayPagoEspeciales = evt;
  }

  realizarPagoNormal() {
    const cuerpo = {
      servicio: '',
      body: {
        id_usu_retiro: null,
        id_usu_despacho: null,
        peso: null,
        pagado_retiro: null,
        pagado_despacho: null,
        km_recorrido: 0,
        pagado: false,
        envio_especial: false,
        retiro_pagado: true,
        despacho_pagado: true
      }
    }
    if (!this.arrayPagoNormales || this.arrayPagoNormales.length === 0) {
      console.log('seleccionar al menos uno')
      return;
    }
    this.arrayPagoNormales.forEach(f => {
      cuerpo.body.pagado = ((f.pagado === 'No') ? false : true);
      console.log(f)
    });

  }

  realizarPagoEspecial() {

    const cuerpo = {
      servicio: '',
      body: {
        id_usu_retiro: null,
        id_usu_despacho: null,
        peso: null,
        pagado_retiro: null,
        pagado_despacho: null,
        km_recorrido: 0,
        pagado: false,
        envio_especial: false,
        retiro_pagado: true,
        despacho_pagado: true
      }
    }
    if (!this.arrayPagoEspeciales || this.arrayPagoEspeciales.length === 0) {
      console.log('seleccionar al menos uno')
      return;
    }
    this.arrayPagoNormales.forEach(f => {
      cuerpo.body.pagado = ((f.pagado === 'No') ? false : true);
      console.log(f)
    });

  }

}
