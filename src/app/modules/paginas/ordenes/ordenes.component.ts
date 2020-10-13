import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { OrdenDetalleComponent } from '../../../util/modals/orden-detalle/orden-detalle.component';


@Component({
  selector: 'app-ordenes',
  templateUrl: './ordenes.component.html',
  styleUrls: ['./ordenes.component.scss']
})
export class OrdenesComponent implements OnInit {
  ptoRetiro: any;
  comunas: any;
  isRegistrado: boolean;
  ptoRetiroControl: FormControl;
  inpFiltro: FormControl;

  ordenes: any[] = [];
  ordenesFiltradas: any[] = [];
  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private cliente: ClienteService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.ptoRetiroControl = new FormControl();
    this.inpFiltro = new FormControl();
    this.getAllComuna();
    this.getAllEncomienda();
  }

  async getAllEncomienda() {
    const cuerpo = {
      servicio: 'getEncomiendabyUsuario',
      body: {
        idUsuario: this.usuarioService.getAwknSession().id
      }
    };
    this.ordenesFiltradas = await this.cliente.callServices(cuerpo)
      .then(v => v)
      .catch(e => console.log(e));
    this.ordenes = this.ordenesFiltradas;
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
    // if (this.isRegistrado) {
    //   this.ptoRetiroControl.setValue(this.ptoRetiro[0].id);
    //   this.setShop(this.ptoRetiro[0]);
    //   this.asignarRetrio();
    // }
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

  async cambioTienda(event) {
    const select = event.value;
    if (select === '-1') {
      this.getAllEncomienda();
    } else {
      const cuerpo = {
        servicio: 'postGetEncomiendaByDireccion',
        body: {
          idDireccion: select
        }
      };
      this.ordenes = await this.cliente.callServices(cuerpo)
        .then(v => v)
        .catch(e => console.log(e));
    }
  }

  getEstado(item: any[]) {
    return {
      color: item[item.length - 1].estado.color
    };
  }

  verDetalle(detalle) {
    // this.router.navigate(['encomienda', 'vista', 'detalle-orden', detalle.id_enc]);
    const dialogRef = this.dialog.open(OrdenDetalleComponent, {
      width: '600px',
      data: detalle
    });
  }
  filter(event) {

    // console.log(new RegExp(`${event}.*`))

    this.ordenes = this.ordenesFiltradas.filter(v => v.cod_seguimiento.match(new RegExp(`${event}.*`)));

  }

  verOrden(orden) {
    const dialogRef = this.dialog.open(OrdenDetalleComponent, {
      width: '1000px',
      data: {
        orden,
        comunas: this.comunas
      }
    });
  }

}
