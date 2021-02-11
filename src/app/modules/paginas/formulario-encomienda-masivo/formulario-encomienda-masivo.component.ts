import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { UploadComponent } from '../../../util/upload/upload.component';
import { DocService } from 'src/app/services/doc-service.service';
import { EditarEncomiendaComponent } from './editar-encomienda/editar-encomienda.component';
import { HttpClient } from '@angular/common/http';
import { PuntoRetiroComponent } from '../../../util/modals/punto-retiro/punto-retiro.component';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';
import {
  faTrashAlt,
  faPlusSquare,
  faSave,
  faMinusSquare,
  faTrash,
  faFileExcel,
} from '@fortawesome/free-solid-svg-icons';

import Swal from 'sweetalert2';
import { ResumenEncomiendaComponent } from 'src/app/util/modals/resumen-encomienda/resumen-encomienda.component';

@Component({
  selector: 'app-formulario-encomienda-masivo',
  templateUrl: './formulario-encomienda-masivo.component.html',
  styleUrls: ['./formulario-encomienda-masivo.component.scss'],
})
export class FormularioEncomiendaMasivoComponent implements OnInit {
  accionFila = ['edit'];
  seleccionFila = false;
  filasSeleccionadas = [];
  dataExcel = [];
  isRegistrado: boolean;
  selecShop = {
    idDireccion: 0,
    NombreTienda: '',
    nameContacto: '',
    direccion: '',
    comuna: { id: '', name: '', zona: '' },
    telefono: '',
    referencia: '',
  };
  delIcon = faMinusSquare;
  faPlusSquare = faPlusSquare;
  faFileExcel = faFileExcel;
  comunas: any = [];
  totalValorizado = 0;
  ptoRetiro: any = [];
  ptoRetiroControl: FormControl;
  puntoRetiro: FormGroup;
  descargando = 0;
  total = 0;
  arrayCostoFinal = [];

  estadoEliminando = false;
  btnAgregar = false;
  btnEliminar = false;

  dataSource;
  selection;
  displayedColumns: string[] = [
    'select',
    'contacto',
    'direccion',
    'telefono',
    'referencia',
    'descripcion',
    'dimencion',
    'peso',
    'accion',
  ];
  haveEpecial = false;

  constructor(
    public dialog: MatDialog,
    private docService: DocService,
    private cliente: ClienteService,
    private usuarioService: UsuarioService,
    private router: Router
  ) {
    // const data = this.ELEMENT_DATA.map(v => {
    //   return {
    //     contacto: v.nombre,
    //     direccion: `${v.direccion}, ${v.comuna}`,
    //     telefono: v.telefono,
    //     referencia: v.referencia,
    //     descripcion: v.Descripcion,
    //     dimencion: `${v.alto} x ${v.ancho} x ${v.largo}`,
    //     peso: v.peso
    //   };
    // });
  }

  ngOnInit(): void {
    this.puntoRetiro = new FormGroup({
      nombrePunto: new FormControl('', [Validators.required]),
      nombreRetiro: new FormControl('', [Validators.required]),
      direccionRetiro: new FormControl('', [Validators.required]),
      comunaRetiro: new FormControl('', [Validators.required]),
      telefonoRetiro: new FormControl('', [Validators.required]),
      referenciaRetiro: new FormControl('', [Validators.required]),
    });

    this.ptoRetiroControl = new FormControl();
    this.getAllComuna();
  }

  async getAllComuna() {
    this.comunas = await this.cliente
      .callServices({ servicio: 'getComunaByProvincia' })
      .then((v) => {
        return v.map((e) => {
          return {
            id: e.id_com,
            zona: e.id_zon,
            name: e.nombre,
          };
        });
      })
      .catch((e) => console.log(e));
    this.getTiendasByUsuario();
  }

  async getTiendasByUsuario() {
    this.ptoRetiro = await this.cliente
      .callServices({
        servicio: 'getTiendasByUsuarios',
        body: { id: this.usuarioService.getAwknSession().id },
      })
      .then((v) => {
        this.isRegistrado = v.length === 0 ? false : true;
        return v.map((e) => {
          return {
            id: e.id_dir,
            name: e.nombre,
            contacto: e.nombre_contacto,
            comuna: this.comunas.find((valor: any) => valor.id === e.id_com),
            direccion: e.direccion,
            telefono: e.telefono,
            referencia: e.referencia,
          };
        });
      })
      .catch((e) => console.log(e));
    if (this.ptoRetiro.length === 0) {
      Swal.fire({
        title: 'No tiene ninguna tienda asignada',
        text:
          'Debes tener al menos UNA tienda asignada para encomiendas masivas, ¿deseas agregar una?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No por ahora',
        confirmButtonText: 'Sí, crearé una!',
        heightAuto: false,
      }).then((result) => {
        if (result.value) {
          this.agregarPuntoRetiro();
        }
        if (result.isDismissed) {
          this.router.navigate(['encomienda', 'vista', 'unica']);
        }
      });
    } else {
      this.ptoRetiroControl.setValue(this.ptoRetiro[0].id);
      this.setShop(this.ptoRetiro[0]);
    }
  }

  cargarExcel() {
    const modalUpload = this.dialog.open(UploadComponent, {});
    modalUpload.afterClosed().subscribe((result) => {
      const excel = result[0];
      this.procesarExcel(excel);
    });
  }

  descargarExcel() {
    this.docService.downloadExcelSample();
  }

  setShop(select) {
    this.selecShop = {
      idDireccion: select.id,
      NombreTienda: select.name,
      nameContacto: select.contacto,
      comuna: select.comuna,
      direccion: select.direccion,
      telefono: select.telefono,
      referencia: select.referencia,
    };
  }

  cambioTienda(event) {
    const select = event.value;
    this.setShop(this.ptoRetiro.find((v) => v.id === select));
    this.valorizar(this.dataExcel);
  }

  crearEncomienda() {
    const modalFiltro = this.dialog.open(EditarEncomiendaComponent, {
      data: {
        isNew: true,
        idComunaRetiro: this.selecShop.comuna.id,
        comunas: this.comunas,
        fila: [],
      },
      width: '700px',
      panelClass: ['filtro-container', 'filtro-content'],
    });
    modalFiltro.afterClosed().subscribe((result) => {
      if (result && result.resp !== 'cancelar') {
        const newArray = [];
        this.dataExcel.forEach((v) => {
          newArray.push(v);
        });
        result.id = Math.max(...newArray.map((v) => v.id));
        newArray.push(result);
        this.dataExcel = newArray;
        this.totalValorizado = this.dataExcel
          .map((v) => v.Valor)
          .reduce((a, b) => a + b);
      }
    });
  }

  editarEncomienda(fila) {
    const modalFiltro = this.dialog.open(EditarEncomiendaComponent, {
      data: {
        isNew: false,
        idComunaRetiro: this.selecShop.comuna.id,
        comunas: this.comunas,
        fila,
      },
      width: '700px',
      panelClass: ['filtro-container', 'filtro-content'],
    });
    modalFiltro.afterClosed().subscribe((result) => {
      if (result && result.resp !== 'cancelar') {
        const newArray = [];
        this.dataExcel.forEach((v) => {
          if (v.id === result.id) {
            newArray.push(result);
          } else {
            newArray.push(v);
          }
        });
        this.dataExcel = newArray;
        this.totalValorizado = this.dataExcel
          .map((v) => v.Valor)
          .reduce((a, b) => a + b);
      }
    });
  }

  eliminar() {
    if (!this.estadoEliminando) {
      this.estadoEliminando = true;
      this.btnAgregar = true;
      this.seleccionFila = true;
      this.accionFila = undefined;
      this.delIcon = faTrash;
    } else {
      this.eliminarDetalle();
    }
  }

  setEstadoInicial() {
    this.estadoEliminando = false;
    this.btnAgregar = false;
    this.seleccionFila = false;
    this.accionFila = ['edit'];
    this.delIcon = faMinusSquare;
  }

  eliminarDetalle() {
    this.descargando = 0;
    this.total = this.filasSeleccionadas.length;
    if (this.total === 0) {
      this.setEstadoInicial();
      return;
    }
    const newArray = [];
    this.dataExcel.forEach((v) => {
      if (!this.filasSeleccionadas.map((e) => e.id).includes(v.id)) {
        newArray.push(v);
      }
    });
    this.dataExcel = newArray;
    this.totalValorizado = this.dataExcel
      .map((v) => v.Valor)
      .reduce((a, b) => a + b);
    this.setEstadoInicial();
  }

  setEliminacion(del) {
    console.log(del);
  }

  selectedRow(row) {
    this.filasSeleccionadas = row;
  }

  procesarExcel(excel) {
    let wb;
    if (excel.file_ext !== 'xlsx') {
      return;
    }
    wb = this.docService.readSheet(excel);
    this.valorizar(wb.data);
  }

  removeAccents(str) {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim()
      .toLocaleLowerCase();
  }

  valorizar(data) {
    const auxArray = [];
    this.total = data.length;
    data.forEach((e, i) => {
      const comunaHasta = this.comunas.find(
        (v) => this.removeAccents(v.name) === this.removeAccents(e.Comuna)
      );
      if (!comunaHasta) {
        Swal.fire({
          title: `Comuna "${e.Comuna.toUpperCase()}" no existe dentro del listado disponible de COMUNAS.`,
          html: `Corrija el documento con el listado que aparece como lista desplegable de la celda en la columna <u>COMUNA</u>.</br><b>- Fila numero: ${i + 3} -</b>`,
          icon: 'warning',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok, lo haré!',
          heightAuto: false,
        })
        return;
      }

      const cuerpo = {
        servicio: 'postTarifador',
        body: {
          comuna_desde: this.selecShop.comuna.id,
          comuna_hasta: comunaHasta.id,
          peso: e.Peso,
        },
      };
      this.cliente
        .callServices(cuerpo)
        .then((resp) => {
          const row = {
            id: i,
            Contacto: e.Contacto,
            Direccion: e.Direccion,
            Comuna: e.Comuna,
            Alto: e.Alto,
            Ancho: e.Ancho,
            Largo: e.Largo,
            Peso: e.Peso,
            Descripcion: e.Descripcion,
            Telefono: e.Telefono,
            Valor: resp.costo_final,
            envio_especial: resp.envio_especial,
          };
          this.descargando++;
          auxArray.push(row);
          this.validarDescargaDatos(auxArray);
        })
        .catch((err) => {
          const row = {
            id: i,
            Contacto: e.Contacto,
            Direccion: e.Direccion,
            Comuna: e.Comuna,
            Alto: e.Alto,
            Ancho: e.Ancho,
            Largo: e.Largo,
            Peso: e.Peso,
            Descripcion: e.Descripcion,
            Telefono: e.Telefono,
            Valor: e.costo_final,
            envio_especial: e.envio_especial,
          };
          this.descargando++;
          auxArray.push(row);
          this.validarDescargaDatos(auxArray);
        });
    });
  }

  validarDescargaDatos(auxArray) {
    if (this.descargando === this.total) {
      this.descargando = 0;
      this.dataExcel = auxArray;
      this.totalValorizado = this.dataExcel
        .map((v) => v.Valor)
        .reduce((a, b) => a + b);
      // this.cargando = false;
    } else {
      // this.cargando = true;
    }
  }

  agregarPuntoRetiro() {
    const modalFiltro = this.dialog.open(PuntoRetiroComponent, {
      data: {},
      width: '700px',
      panelClass: ['filtro-container', 'filtro-content'],
    });
    modalFiltro.afterClosed().subscribe((e) => {
      if ((!e || e.resp === 'cancelar') && this.ptoRetiro.length === 0) {
        this.router.navigate(['encomienda', 'vista', 'unica']);
      } else {
        const pto = {
          id: e.id_dir,
          name: e.nombre,
          contacto: e.nombre_contacto,
          direccion: e.direccion,
          comuna: this.comunas.find((valor: any) => valor.id === e.id_com),
          telefono: e.telefono,
          referencia: e.referencia,
        };
        this.ptoRetiro.push(pto);
        this.ptoRetiroControl.setValue(
          this.ptoRetiro[this.ptoRetiro.length - 1].id
        );
        this.setShop(this.ptoRetiro[this.ptoRetiro.length - 1]);
      }
    });
  }

  createRequest(e, id_masivo?) {
    const d = new Date();
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
    const body = {
      descripcion: e.Descripcion,
      alto: e.Alto,
      ancho: e.Ancho,
      largo: e.Largo,
      peso: e.Peso,
      nombre_destinatario: e.Contacto,
      telefono_destinatario: e.Telefono,
      direccion_destinatario: e.Direccion,
      km_recorrido: 0,
      valor_total: e.Valor,
      id_dir_rem: this.selecShop.idDireccion,
      id_com_dest: this.comunas.find((v) => v.name.trim() === e.Comuna.trim())
        .id,
      id_usu: null,
      id_masivo: id_masivo ? id_masivo : null,
      encomienda_masiva: true,
      envio_especial: e.envio_especial,
    };
    return {
      servicio: 'postSetEncomienda',
      body,
    };
  }

  encomiendas = [];
  gestionTotales = 0;
  enviados = 0;

  async gestionarPedidos() {
    this.gestionTotales = this.dataExcel.length;
    const cabecera: any = await this.getFirstRequest().then((v) => v);
    for (let index = 1; index < this.gestionTotales; index++) {
      const resquest = this.createRequest(
        this.dataExcel[index],
        cabecera.id_masivo
      );
      this.cliente
        .callServices(resquest)
        .then((resp) => {
          this.validarGestionPedidos(resp);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  getFirstRequest() {
    const a = new Promise((resolve, reject) => {
      const resquest = this.createRequest(this.dataExcel[0]);
      this.cliente
        .callServices(resquest)
        .then((resp) => {
          this.validarGestionPedidos(resp);
          resolve(resp);
        })
        .catch((err) => {
          console.log(err);
        });
    });
    return a;
  }
  validarGestionPedidos(r) {
    this.enviados++;
    const encomienda = {
      numero: r.cod_seguimiento,
      contacto: r.nombre_destinatario,
      direccion: `${r.direccion_destinatario}, ${
        this.comunas.find((valor: any) => valor.id === r.id_com_dest).name
      }`,
      telefono: r.telefono_destinatario,
      alto: r.alto,
      ancho: r.ancho,
      largo: r.largo,
      peso: r.peso,
      valor: r.valor_total,
    };
    this.encomiendas.push(encomienda);

    if (this.enviados === this.gestionTotales) {
      const despachos = {
        codigoSeguimiento: r.id_masivo,
        retiro: {
          nombre: this.selecShop.NombreTienda,
          direccion: `${this.selecShop.direccion}, ${this.selecShop.comuna.name}`,
          telefono: this.selecShop.telefono,
          referencia: `${this.selecShop.NombreTienda} - ${this.selecShop.referencia} `,
        },
        encomiendas: this.encomiendas,
        valorTotal: this.encomiendas
          .map((m) => m.valor)
          .reduce((a, b) => a + b, 0),
      };
      this.resumenUsuario(despachos);
    } else {
      if (r.envio_especial) {
        this.haveEpecial = true;
      }
    }
  }

  resumenUsuario(despachos) {
    if (this.haveEpecial) {
      Swal.fire({
        title: 'Tenemos un problema',
        html:
          'La comuna ingresada no esta habilitada para recibir desapachos</br> <strong>Ingrese nuevamente la dirección</strong>',
        icon: 'warning',
        confirmButtonText: 'OK!',
        heightAuto: false,
      }).then((t) => {
        const modalFiltro = this.dialog.open(ResumenEncomiendaComponent, {
          data: despachos,
          width: '1000px',
          panelClass: ['filtro-container', 'filtro-content'],
        });
        modalFiltro.afterClosed().subscribe((e) => {
          // location.reload();
          //   if (e.resp === 'cancelar') {
          //     this.ptoRetiroControl.setValue(this.ptoRetiro[0].id);
          //     this.setShop(this.ptoRetiro[0]);
          //   } else {
          //     const pto = {
          //       id: e.id_dir,
          //       name: e.nombre,
          //       contacto: e.nombre_contacto,
          //       direccion: e.direccion,
          //       comuna: e.comuna.name,
          //       telefono: e.telefono,
          //       referencia: e.referencia
          //     };
          //     this.ptoRetiro.push(pto);
          //     this.ptoRetiroControl.setValue(this.ptoRetiro[this.ptoRetiro.length - 1].id);
          //     this.setShop(this.ptoRetiro[this.ptoRetiro.length - 1]);
          //   }
        });
      });
    } else {
      const modalFiltro = this.dialog.open(ResumenEncomiendaComponent, {
        data: despachos,
        width: '1000px',
        panelClass: ['filtro-container', 'filtro-content'],
      });
      modalFiltro.afterClosed().subscribe((e) => {
        // location.reload();
        //   if (e.resp === 'cancelar') {
        //     this.ptoRetiroControl.setValue(this.ptoRetiro[0].id);
        //     this.setShop(this.ptoRetiro[0]);
        //   } else {
        //     const pto = {
        //       id: e.id_dir,
        //       name: e.nombre,
        //       contacto: e.nombre_contacto,
        //       direccion: e.direccion,
        //       comuna: e.comuna.name,
        //       telefono: e.telefono,
        //       referencia: e.referencia
        //     };
        //     this.ptoRetiro.push(pto);
        //     this.ptoRetiroControl.setValue(this.ptoRetiro[this.ptoRetiro.length - 1].id);
        //     this.setShop(this.ptoRetiro[this.ptoRetiro.length - 1]);
        //   }
      });
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.position + 1
    }`;
  }
}
