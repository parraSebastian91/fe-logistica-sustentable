import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { MatDialog } from '@angular/material/dialog';
import { GestionEncomiendaComponent } from 'src/app/util/modals/gestion-encomienda/gestion-encomienda.component';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { BottonSheetComponent } from 'src/app/util/botton-sheet/botton-sheet.component';
import { DocService } from 'src/app/services/doc-service.service';

@Component({
  selector: 'app-encomiendas',
  templateUrl: './encomiendas.component.html',
  styleUrls: ['./encomiendas.component.scss']
})
export class EncomiendasComponent implements OnInit {
  accionFila = ['edit', 'see'];
  seleccionFila = false;
  filasSeleccionadas = [];
  encomiendas = [];
  comunas: any;
  listaTiendas: any;
  isRegistrado: boolean;
  listaRepartidores: any;

  anchoColumna = {
    estado: 75,
    envio_especial: 110,
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
    valor_total: 85
  };

  aliniacionColumna = {
    estado: 'center',
    envio_especial: 'center',
    pagado: 'center',
    fecha_creacion: 'center',
    cod_seguimiento: 'center',
    alto: 'center',
    ancho: 'center',
    largo: 'center',
    peso: 'center',
    valor_total: 'center'
  };

  constructor(
    private cliente: ClienteService,
    public dialog: MatDialog,
    private bottomSheet: MatBottomSheet,
    private docService: DocService
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  async getData() {
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
    this.listaTiendas = await this.cliente
      .callServices({ servicio: 'setAllPuntoRetiro' })
      .then(v => {
        return v.map(e => {
          return {
            id: e.id_dir,
            name: e.nombre,
            contacto: e.nombre_contacto,
            comuna: this.comunas.find((valor: any) => valor.id === e.id_com),
            direccion: e.direccion,
            telefono: e.telefono,
            referencia: e.referencia
          };
        });
      })
      .catch(e => console.log(e));
    this.getEncomiendas();
    this.getRepartidores();
  }

  async getRepartidores() {
    this.listaRepartidores = await this.cliente
      .callServices({ servicio: 'getRepartidores' })
      .then(v => v)
      .catch(e => console.log(e));
  }

  async getAlTiendas() {
    this.listaTiendas = await this.cliente
      .callServices({ servicio: 'setAllPuntoRetiro' })
      .then(v => {
        return v.map(e => {
          return {
            id: e.id_dir,
            name: e.nombre,
            contacto: e.nombre_contacto,
            comuna: this.comunas.find((valor: any) => valor.id === e.id_com),
            direccion: e.direccion,
            telefono: e.telefono,
            referencia: e.referencia
          };
        });
      })
      .catch(e => console.log(e));
  }

  async getEncomiendas() {
    const cuerpo = {
      servicio: 'postGetAllEncomienda'
    };
    this.cliente.callServices(cuerpo)
      .then(v => {
        this.encomiendas = v.map(m => {
          // const tienda = this.listaTiendas.find(f => f.id === m.id_dir_rem);
          return {
            estado: m.seguimiento,
            pagado: ((m.pagado) ? 'Sí' : 'No'),
            envio_especial: ((m.envio_especial) ? 'Sí' : 'No'),
            fecha_creacion: new Date(m.fecha_inicio).toLocaleDateString(),
            cod_seguimiento: m.cod_seguimiento,
            valor_total: m.valor_total,
            asignnacion_de_retiro: ((m.usuario_retiro === null) ? 'NO ASIGNADO' : `${m.usuario_retiro.nombre} ${m.usuario_retiro.apellido_pa}`),
            asignnacion_de_despacho: ((m.usuario_despacho === null) ? 'NO ASIGNADO' : `${m.usuario_despacho.nombre} ${m.usuario_despacho.apellido_pa}`),
            contacto_retiro: m.direccion_remitente.nombre_contacto,
            direccion_retiro: `${m.direccion_remitente.direccion}, ${this.comunas.find((valor: any) => valor.id === m.direccion_remitente.id_com).name}`,
            telefono_retiro: m.direccion_remitente.telefono,
            nombre_destinatario: m.nombre_destinatario,
            direccion_destinatario: m.direccion_destinatario,
            comuna_destinatario: this.comunas.find(f => f.id === m.id_com_dest).name,
            telefono_destinatario: m.telefono_destinatario,
            descripcion: m.descripcion,
            alto: m.alto,
            ancho: m.ancho,
            largo: m.largo,
            peso: m.peso,
            id_enc: m.id_enc,
            asignacion_retiro: m.usuario_retiro,
            asignacion_despacho: m.usuario_despacho,
            retiro_pagado: m.retiro_pagado,
            despacho_pagado:m.despacho_pagado
          };
        });
      });
  }

  editarEncomienda(fila) {
    const modalFiltro = this.dialog.open(GestionEncomiendaComponent, {
      data: {
        fila,
        repartidores: this.listaRepartidores
      },
      width: '50%',
      panelClass: ['filtro-container', 'filtro-content']
    });
    modalFiltro.afterClosed().subscribe(result => {
      if (result && result.resp !== 'cancelar') {
        this.getEncomiendas();
      }
    });
  }

  selectedRow(row) {
    this.filasSeleccionadas = row;
  }

  exportarEncomiendas() {
    this.docService.exportAsExcelFile(this.encomiendas).then(t => {
      this.docService.saveAsExcelFile(t, `Encomiendas-${new Date().toLocaleDateString()}`);
    });
  }

  openBottomSheet(evt): void {
    this.bottomSheet.open(BottonSheetComponent, { data: evt });
    this.bottomSheet._openedBottomSheetRef.afterDismissed().subscribe(s => {
      if (s === 'reload') {
        this.getEncomiendas();
      }
    });
  }

}
