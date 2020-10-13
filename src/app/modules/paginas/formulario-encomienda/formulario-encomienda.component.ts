import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { PuntoRetiroComponent } from '../../../util/modals/punto-retiro/punto-retiro.component';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { faRulerCombined, faWeightHanging, faClipboard } from '@fortawesome/free-solid-svg-icons';
import { ResumenEncomiendaComponent } from 'src/app/util/modals/resumen-encomienda/resumen-encomienda.component';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-formulario-encomienda',
  templateUrl: './formulario-encomienda.component.html',
  styleUrls: ['./formulario-encomienda.component.scss']
})
export class FormularioEncomiendaComponent implements OnInit {
  @ViewChild('stepper') stepper;
  @ViewChild('placesRef') placesRef: GooglePlaceDirective;

  regla = faRulerCombined;
  pesa = faWeightHanging;
  nota = faClipboard;
  errDir = true;
  isLinear = false;
  puntoRetiro: FormGroup;
  puntoEntrega: FormGroup;
  encomienda: FormGroup;
  isRegistrado = false;
  comunas: any = [];
  comuna;

  options = {
    componentRestrictions: { country: 'CL' }
  };

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

  tipo;
  ptoRetiro: any = [];
  ptoRetiroControl: FormControl;


  stepName = ['Punto de Retiro', 'Punto de Entrega', 'Detalle Encomienda', 'Confirmar Servicio'];
  costo = 0;
  kmRecorrido: number;
  GoogleAddress: any;
  isEspecial: any;
  constructor(
    private cliente: ClienteService,
    public dialog: MatDialog,
    private rutaActiva: ActivatedRoute,
    private usuarioService: UsuarioService
  ) {
    this.tipo = this.rutaActiva.snapshot.paramMap.get('tipo');
  }

  ngOnInit() {
    this.ptoRetiroControl = new FormControl();

    this.puntoRetiro = new FormGroup({
      nombrePunto: new FormControl('', [Validators.required]),
      nombreRetiro: new FormControl('', [Validators.required]),
      direccionRetiro: new FormControl('', [Validators.required]),
      comunaRetiro: new FormControl('', [Validators.required]),
      telefonoRetiro: new FormControl('', [Validators.required]),
      referenciaRetiro: new FormControl('', [Validators.required]),
    });

    this.puntoEntrega = new FormGroup({
      nombreEntrega: new FormControl('', [Validators.required]),
      direccionEntrega: new FormControl('', [Validators.required]),
      comunaEntrega: new FormControl('', [Validators.required]),
      telefonoEntrega: new FormControl('', [Validators.required]),
      referenciaEntrega: new FormControl('', [Validators.required]),
    });

    this.encomienda = new FormGroup({
      descripcionEncomienda: new FormControl('', [Validators.required]),
      dimencion: new FormControl(''),
      alto: new FormControl(0, [Validators.min(0)]),
      ancho: new FormControl(0, [Validators.min(0)]),
      largo: new FormControl(0, [Validators.min(0)]),
      peso: new FormControl(0, [Validators.required, Validators.min(1)]),
    });
    this.getAllComuna();
  }


  public handleAddressChange(address: any) {
    // Do some stuff
  }

  async getTiendasByUsuario() {
    this.ptoRetiro = await this.cliente
      .callServices({ servicio: 'getTiendasByUsuarios', body: { id: this.usuarioService.getAwknSession().id } })
      .then(v => {
        if (v.length > 0) {
          this.isRegistrado = true;
        }
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
    if (this.isRegistrado) {
      this.ptoRetiroControl.setValue(this.ptoRetiro[0].id);
      this.setShop(this.ptoRetiro[0]);
      this.asignarRetrio();
    }
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
    this.getTiendasByUsuario();
  }

  asignarRetrio() {
    if (this.selecShop.NombreTienda === '') {
      this.selecShop.NombreTienda = this.puntoRetiro.get('nombrePunto').value;
      this.selecShop.nameContacto = this.puntoRetiro.get('nombreRetiro').value;
      this.selecShop.direccion = this.puntoRetiro.get('direccionRetiro').value;
      this.selecShop.comuna = this.comunas.find((valor: any) => valor.id === this.puntoRetiro.get('comunaRetiro').value);
      this.selecShop.telefono = this.puntoRetiro.get('telefonoRetiro').value;
      this.selecShop.referencia = this.puntoRetiro.get('referenciaRetiro').value;
    } else {
      this.puntoRetiro.get('nombrePunto').setValue(this.selecShop.NombreTienda);
      this.puntoRetiro.get('nombreRetiro').setValue(this.selecShop.nameContacto);
      this.puntoRetiro.get('direccionRetiro').setValue(this.selecShop.direccion);
      this.puntoRetiro.get('comunaRetiro').setValue(this.selecShop.comuna.id);
      this.puntoRetiro.get('telefonoRetiro').setValue(this.selecShop.telefono);
      this.puntoRetiro.get('referenciaRetiro').setValue(this.selecShop.referencia);
    }
  }

  setShop(select) {
    this.selecShop = {
      idDireccion: select.id,
      NombreTienda: select.name,
      nameContacto: select.contacto,
      comuna: select.comuna,
      direccion: select.direccion,
      telefono: select.telefono,
      referencia: select.referencia
    };
    this.puntoRetiro.setErrors({});
    this.puntoRetiro.get('nombrePunto').setValue(select.name);
    this.puntoRetiro.get('nombreRetiro').setValue(select.contacto);
    this.puntoRetiro.get('direccionRetiro').setValue(select.direccion);
    this.puntoRetiro.get('comunaRetiro').setValue(select.direccion.id);
    this.puntoRetiro.get('telefonoRetiro').setValue(select.telefono);
    this.puntoRetiro.get('referenciaRetiro').setValue(select.referencia);
  }


  setDespacho() {
    this.ptoDespacho = {
      nameContacto: this.puntoEntrega.get('nombreEntrega').value,
      comuna: this.comunas.find((valor: any) => valor.id === this.puntoEntrega.get('comunaEntrega').value).name,
      direccion: this.puntoEntrega.get('direccionEntrega').value,
      telefono: this.puntoEntrega.get('telefonoEntrega').value,
      referencia: this.puntoEntrega.get('referenciaEntrega').value
    };
    const dimenciones = this.encomienda.get('dimencion').value;
    this.dataEncomienda = {
      descripcion: this.encomienda.get('descripcionEncomienda').value,
      // dimenciones: {
      //   alto: dimenciones.split('x')[0],
      //   ancho: dimenciones.split('x')[1],
      //   largo: dimenciones.split('x')[2]
      // },
      dimenciones: {
        alto: this.encomienda.get('alto').value,
        ancho: this.encomienda.get('ancho').value,
        largo: this.encomienda.get('largo').value
      },
      peso: this.encomienda.get('peso').value
    };
    // this.puntoRetiro.get('nombrePunto').setValue(select.name);
    // this.puntoRetiro.get('nombreRetiro').setValue(select.contacto);
    // this.puntoRetiro.get('direccionRetiro').setValue(select.direccion);
    // this.puntoRetiro.get('comunaRetiro').setValue(select.direccion.id);
    // this.puntoRetiro.get('telefonoRetiro').setValue(select.telefono);
    // this.puntoRetiro.get('referenciaRetiro').setValue(select.referencia);
  }

  cambioTienda(event) {
    const select = event.value;
    this.setShop(this.ptoRetiro.find(v => v.id === select));
    this.asignarRetrio();
  }

  agregarPuntoRetiro() {
    const modalFiltro = this.dialog.open(PuntoRetiroComponent, {
      data: {},
      width: '700px',
      panelClass: ['filtro-container', 'filtro-content']
    });
    modalFiltro.afterClosed().subscribe(e => {
      if (e.resp === 'cancelar') {
        this.ptoRetiroControl.setValue(this.ptoRetiro[0].id);
        this.setShop(this.ptoRetiro[0]);
      } else {
        const pto = {
          id: e.id_dir,
          name: e.nombre,
          contacto: e.nombre_contacto,
          direccion: e.direccion,
          comuna: e.comuna.name,
          telefono: e.telefono,
          referencia: e.referencia
        };
        this.ptoRetiro.push(pto);
        this.ptoRetiroControl.setValue(this.ptoRetiro[this.ptoRetiro.length - 1].id);
        this.setShop(this.ptoRetiro[this.ptoRetiro.length - 1]);
      }
    });
  }

  calcularEncomienda() {
    this.setDespacho();
    const selComuna = this.puntoEntrega.get('comunaEntrega').value;
    const cuerpo = {
      servicio: 'postTarifador',
      body: {
        comuna_desde: ((this.isRegistrado) ? this.selecShop.comuna.id : this.puntoRetiro.get('comunaRetiro').value),
        comuna_hasta: selComuna,
        peso: this.encomienda.get('peso').value
      }
    };
    this.cliente
      .callServices(cuerpo)
      .then(resp => { // aqui me indica si es especial la encomienda
        this.costo = resp.costo_final;
        this.isEspecial = resp.envio_especial;
        if (resp.envio_especial) {
          Swal.fire({
            title: 'Nos contactaremos con usted',
            html: 'Luego de confirmar la encomienda nos contactaremos en breve con usted.',
            icon: 'warning',
            confirmButtonText: 'OK!',
            heightAuto: false
          });
        }
      });
    // const origen = `${this.selecShop.direccion}, ${this.selecShop.comuna.name}`;
    // const despacho = this.GoogleAddress.formatted_address;
    // this.cliente.getDistancia(origen, despacho).then(t => {
    //   console.log(t);
    //   this.kmRecorrido = 0;
    // });
  }

  createRequest() {
    const d = new Date();
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
    const dimenciones = this.encomienda.get('dimencion').value;

    const body = {
      descripcion: this.dataEncomienda.descripcion,
      alto: this.dataEncomienda.dimenciones.alto,
      ancho: this.dataEncomienda.dimenciones.ancho,
      largo: this.dataEncomienda.dimenciones.largo,
      peso: this.dataEncomienda.peso,
      nombre_destinatario: this.ptoDespacho.nameContacto,
      telefono_destinatario: this.ptoDespacho.telefono,
      direccion_destinatario: this.ptoDespacho.direccion,
      km_recorrido: this.kmRecorrido,
      valor_total: this.costo,
      id_dir_rem: this.selecShop.idDireccion,
      id_com_dest: this.puntoEntrega.get('comunaEntrega').value,
      id_usu: null,
      id_masivo: null,
      encomienda_masiva: false,
      envio_especial: this.isEspecial // para envio especial enviado desde el tarifador
    };
    return {
      servicio: 'postSetEncomienda', body
    };
  }

  crearPtoRetiro() {
    if (this.puntoRetiro.valid) {
      const cuerpo = {
        servicio: 'setPuntoRetiro',
        body: {
          nombre: this.selecShop.NombreTienda, // nombre tienda
          nombre_contacto: this.selecShop.nameContacto,
          direccion: this.selecShop.direccion,
          telefono: this.selecShop.telefono,
          // fecha_inicio: '2020-07-11',
          referencia: this.selecShop.referencia,
          id_usu: this.usuarioService.getAwknSession().id,
          id_com: this.selecShop.comuna.id,
        }
      };
      this.cliente.callServices(cuerpo).then(resp => {
        this.selecShop.idDireccion = resp.id_dir;
        this.crearEncomienda();
      });
    }
  }

  GestionarEnvio() {
    if (this.selecShop.idDireccion === -1) {
      this.crearPtoRetiro();
    } else {
      this.crearEncomienda();
    }
  }

  crearEncomienda() {
    const resquest = this.createRequest();
    this.cliente
      .callServices(resquest)
      .then(r => {
        const encomiendas = [];
        const encomienda = {
          numero: 1,
          contacto: r.nombre_destinatario,
          direccion: `${r.direccion_destinatario}, ${this.comunas.find((valor: any) => valor.id === r.id_com_dest).name}`,
          telefono: r.telefono_destinatario,
          alto: r.alto,
          ancho: r.ancho,
          largo: r.largo,
          peso: r.peso,
          valor: r.valor_total
        };
        encomiendas.push(encomienda);
        const despachos = {
          codigoSeguimiento: r.cod_seguimiento,
          retiro: {
            nombre: this.selecShop.NombreTienda,
            direccion: `${this.selecShop.direccion}, ${this.selecShop.comuna.name}`,
            telefono: this.selecShop.telefono,
            referencia: `${this.selecShop.NombreTienda} - ${this.selecShop.referencia} `
          },
          encomiendas,
          valorTotal: encomiendas.map(m => m.valor).reduce((a, b) => a + b, 0)
        };

        const modalFiltro = this.dialog.open(ResumenEncomiendaComponent, {
          data: despachos,
          width: '1000px',
          panelClass: ['filtro-container', 'filtro-content']
        });
        modalFiltro.afterClosed().subscribe(e => {
          location.reload();
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
      })
      .catch(err => {
        console.log(err);
      });
  }

  prueba() {
    const modalFiltro = this.dialog.open(ResumenEncomiendaComponent, {
      width: '1000px',
      panelClass: ['filtro-container', 'filtro-content']
    });
  }

  cambios(result) {
    this.GoogleAddress = result;
    this.puntoEntrega.get('direccionEntrega').setValue(result.name);
    // tslint:disable-next-line: triple-equals
    const comuna = this.comunas.find(f => (f.name.toLocaleLowerCase().trim() == result.vicinity.toLocaleLowerCase().trim()));
    if (comuna) {
      this.puntoEntrega.get('comunaEntrega')
        .setValue(comuna.id);
    } else {
      Swal.fire({
        title: 'Tenemos un problema',
        html: 'La comuna ingresada no esta habilitada para recibir desapachos</br> <strong>Ingrese nuevamente la dirección</strong>',
        icon: 'warning',
        confirmButtonText: 'OK!',
        heightAuto: false
      });
      this.errDir = true;
    }
  }

}
