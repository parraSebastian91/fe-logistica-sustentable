import { Component, OnInit, EventEmitter, Input, Output, ViewChild, OnChanges, ViewEncapsulation } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { faSearch, faFilter, faPenSquare, faArrowDown, faArrowUp, faMinus } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { FiltroComponent } from './filtro/filtro.component';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class DynamicTableComponent implements OnInit, OnChanges {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  // @Input() data;

  @Input() data;
  @Input() estado;
  @Input() quitarColumna;
  @Input() checkRow;
  @Input() accionCol: string[];
  @Input() pageSize;
  @Input() signal: string[] = [];
  @Input() aliniacionColumnas = {};
  @Input() AnchoColumnas;
  @Input() buscable = true;

  @Output() selectedRow = new EventEmitter();
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onClickRow = new EventEmitter();
  @Output() editRow = new EventEmitter();
  @Output() seeRow = new EventEmitter();

  accionOpcion = {
    edit: 'edit',
    see: 'see',
    del: 'del'
  };

  faMinus = faMinus;
  faAngleDown = faArrowDown;
  faAngleUp = faArrowUp;
  faPenSquare = faPenSquare;
  faSearch = faSearch;
  tipoColumna;
  dataSource;
  filterValues = {};
  columnsToDisplay: string[] = [];
  noData = false;
  selection = new SelectionModel(true, []);
  paginacionVer;
  paginacionSize;
  isEdit = false;
  isSee = false;
  isDel = false;
  moreLess = false;

  constructor(public dialog: MatDialog) {
  }

  mensaje = 'No existen registros visibles';

  ngOnChanges(changes: import('@angular/core').SimpleChanges): void {
    this.setDataset();
  }

  styleHeader() {

  }

  ngOnInit() {
    if (!this.data) {
      this.data = [
        {
          name: 'foo',
          data: [{}]
        }
      ];
    }
    this.mensaje = ((this.estado === 'cargando') ? 'Descargando Datos' : 'No existen registros visibles');
    this.paginacionSize = ((!this.pageSize) ? [10, 15, 20] : this.pageSize);
    this.setDataset();
  }

  showSignalColumns(col) {
    return this.signal.includes(col);
  }

  showIconSignal(valor) {
    const dato = Number(valor.replace('%', ''));
    if (dato > 0) {
      return {
        style: {
          color: 'green'
        },
        icon: this.faAngleUp
      };
    }
    if (dato === 0) {
      return {
        style: {
          color: 'black'
        },
        icon: this.faMinus
      };
    }
    if (dato < 0) {
      return {
        style: {
          color: 'red'
        },
        icon: this.faAngleDown
      };
    }
  }




  /**
   * Seteo Variables, filtros, etc
   */

  setDataset() {
    this.mensaje = ((this.estado === 'cargando') ? 'Descargando Datos' : 'No existen registros visibles');
    this.dataSource = new MatTableDataSource(this.data);
    this.setColumnas();
    this.setFiltros();
    this.dataSource.filterPredicate = this.setFiltrosFN();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if (this.checkRow) {
      this.columnsToDisplay.splice(0, 0, 'select');
      this.selection.clear();
    }
    if (this.accionCol) {
      if (this.accionCol.includes(this.accionOpcion.edit)) {
        this.isEdit = true;
      }
      if (this.accionCol.includes(this.accionOpcion.see)) {
        this.isSee = true;
      }
      if (this.accionCol.includes(this.accionOpcion.del)) {
        this.isDel = true;
      }
      this.columnsToDisplay.push('accion');
    }
  }

  setColumnas() {
    if (this.data.length !== 0) {
      const columnas = Object.keys(this.data[0]);
      this.columnsToDisplay = ((this.quitarColumna) ? columnas.filter(v => !this.quitarColumna.includes(v)) : columnas);
    }
  }

  setFiltros() {
    this.columnsToDisplay.forEach(v => {
      this.filterValues[v] = '';
    });
  }

  setFiltro(filtro) {
    if (filtro.accion === 'resetear') { return ''; }
    return filtro;
  }

  setFiltrosFN(): (data: any, filter: string) => boolean {
    const filterFunction = (data: any, filter): boolean => {
      const searchTerms = JSON.parse(filter);
      return this.filtroGenerico(data, searchTerms);
    };
    return filterFunction;
  }

  setStyleHeader(item) {
    const style: any = {
      'text-align': 'center',
      width: ''
    };
    switch (item) {
      case 'select':
        style.width = '65px';
        break;
      case 'accion':
        style.right = '-15px';
        style.width = `${this.accionCol.length * 80}px`;
        break;
      default:
        if (this.AnchoColumnas && this.AnchoColumnas[item]) {
          style.width = `${this.AnchoColumnas[item]}px`;
        } else {
          style.width = `${Number((item.length * 3) + 250)}px`;
        }
        break;
    }
    return style;
  }

  setStyleContent(item) {
    const style: any = {
    };
    switch (item) {
      case 'select':
        // style.width = '65px';
        break;
      case 'accion':
        style.right = '-15px';
        // style.width = `${this.accionCol.length * 80}px`;
        break;
      default:
        if (this.AnchoColumnas && this.AnchoColumnas[item]) {
          // style.width = `${this.AnchoColumnas[item]}px`;
        } else {
          // style.width = `${Number((item.length * 3) + 250)}px`;
        }
        break;
    }
    return style;
  }

  /**
   *
   * Get
   */
  // obtiene los datos de una columna
  getColumna(columna) {
    return this.dataSource.filteredData.map((r) => {
      return r[columna];
    });
  }

  getTipoVariable(columna) {
    const r = this.dataSource.data[0];
    return typeof r[columna];
  }

  getFilter(columna) {
    if (this.filterValues[columna] !== '') {
      return faFilter;
    }
    return faSearch;
  }

  /**
   *
   * Funciones
   */

  alignTextTo(valor) {
    const aliniacion = this.aliniacionColumnas[valor];
    if (aliniacion) {
      return {
        'text-align': aliniacion,
        'padding-right': '10px',
        'padding-left': '10px',
        // 'border-right': '1px solid gray'
      };
    } else {
      return {
        'text-align': 'start',
        'padding-right': '10px',
        'padding-left': '10px',
        // 'border-right': '1px solid gray'
      };
    }
  }

  filtroGenerico(data, filtro): boolean {
    const filtrosNoVacios = Object.keys(filtro).filter(v => filtro[v] !== '');
    let isValid = true;
    if (filtrosNoVacios.length === 0) { return true; }
    filtrosNoVacios.forEach(e => {
      const valor = data[e];
      const filtroUnico = filtro[e];
      if (isNaN(valor) || valor === '' || typeof valor === 'string') {
        isValid = isValid && (filtroUnico.filtro.includes(valor));
      } else {
        switch (filtroUnico.filtro) {
          case 'Mayor que': isValid = isValid && (valor > Number(filtroUnico.filtroText)); break;
          case 'Igual que': isValid = isValid && (valor === Number(filtroUnico.filtroText)); break;
          case 'Distinto de': isValid = isValid && (valor !== Number(filtroUnico.filtroText)); break;
          case 'Menor que': isValid = isValid && (valor < Number(filtroUnico.filtroText)); break;
          default: isValid = isValid && true; break;
        }
      }
    });
    return isValid;
  }

  FiltrarBy(columna) {
    this.tipoColumna = this.getTipoVariable(columna);
    let maping;
    // obtengo los valores de la columna que quiero filtrar
    if (this.tipoColumna === 'string') {
      maping = this.getColumna(columna);
    }
    /**
     * mando los datos de la columna filtrados de manera unica
     * al modal que mostrara al usuario las opciones de filtro
     * ej: [1,1,2,3,4,4,5,6,7,7,8,9] -> [1,2,3,4,5,6,7,8,9]
     */

    const modalFiltro = this.dialog.open(FiltroComponent, {
      data: {
        process: columna,
        data: ((this.tipoColumna === 'string') ? maping.filter((v, i, a) => a.indexOf(v) === i) : ['Mayor que',
          'Igual que', 'Distinto de', 'Menor que']),
        tipo: this.tipoColumna,
        filtro: this.filterValues[columna]
      },
      panelClass: ['filtro-container', 'filtro-content']
    });

    /**
     * al cerrar el modal obtendremos el filtro que quiera el usuario y lo aplicará.
     */
    modalFiltro.afterClosed().subscribe(result => {
      this.filterValues[result.columna] = this.setFiltro(result);
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });
  }

  /**
   * Metodos checkRow
   */


  masterSelect() {
    this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach(row => this.selection.select(row));
    this.selectedRow.emit(this.selection.selected);

  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  checkboxLabel(row?): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1} `;
  }

  checked(fila) {
    // (selectedRow)="checked($event)" <-- asi se obtiene del padre
    this.selection.toggle(fila);
    this.selectedRow.emit(this.selection.selected);
  }

  clickRow(fila) {
    this.onClickRow.emit(fila);
  }

  /**
   * metodos botones acciones
   */

  editarFila(fila) {
    this.editRow.emit(fila);
  }

  verFila(fila) {
    this.seeRow.emit(fila);
  }

}
