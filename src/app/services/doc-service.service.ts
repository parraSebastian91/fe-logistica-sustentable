import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import * as XlsxPopulate from 'xlsx-populate/browser/xlsx-populate';
import * as FileSaver from 'file-saver';
import { HttpClient } from '@angular/common/http';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

export interface ReturnEncomienda {
  cod: string;
  msj: string;
  data: EncomiendaRow[];
}

export interface EncomiendaRow {
  id: number;
  Contacto: string;
  Direccion: string;
  Comuna: string;
  Telefono: number;
  Descripcion: string;
  Alto: number;
  Ancho: number;
  Largo: number;
  Peso: number;
  Valor: number;
}

@Injectable({
  providedIn: 'root'
})
export class DocService {

  constructor(
    private http: HttpClient,
  ) { }

  readSheet(documento): ReturnEncomienda {
    const docBase64 = documento.file;
    const workbook: XLSX.WorkBook = XLSX.read(docBase64, { type: 'base64' });
    const sheetNameArray: string[] = workbook.SheetNames;
    const sheet: XLSX.Sheet = workbook.Sheets[sheetNameArray[0]];
    delete sheet['A1'];
    delete sheet['E1'];
    delete sheet['!merges'];
    const jsonSheet = XLSX.utils.sheet_to_json(sheet, { header: 'A' });
    const rowDiccionario = {
      A: 'Contacto',
      B: 'Direccion',
      C: 'Comuna',
      D: 'Telefono',
      E: 'Descripcion',
      F: 'Alto',
      G: 'Ancho',
      H: 'Largo',
      I: 'Peso'
    };
    let row: EncomiendaRow;
    const dataSheet: EncomiendaRow[] = [];
    const keys = Object.keys(jsonSheet[0]);
    if (keys.length === Object.keys(rowDiccionario).length) {
      for (let index = 1; index < jsonSheet.length; index++) {
        row = {
          id: index,
          Contacto: '',
          Direccion: '',
          Comuna: '',
          Alto: 0,
          Ancho: 0,
          Largo: 0,
          Peso: 0,
          Descripcion: '',
          Telefono: 0,
          Valor: 0
        };
        keys.forEach(dato => {
          const element = jsonSheet[index];
          row[rowDiccionario[dato]] = element[dato];
        });
        dataSheet.push(row);
      }
      return {
        cod: 'ok',
        msj: 'VALID',
        data: dataSheet
      };
    } else {
      return {
        cod: 'error',
        msj: 'Existen columnas inválidas',
        data: []
      };
    }
  }

  downloadExcelSample() {
    const excel = this.http.get('assets/excel-ejemplo.xlsx').toPromise().then(v => v);
    return this.http.get('assets/excel-ejemplo.xlsx', { responseType: 'blob' })
      .subscribe((resp: any) => {
        FileSaver.saveAs(resp, `excel-ejemplo.xlsx`);
      });
  }

  private readFile(file: File): Promise<string | ArrayBuffer> {
    return new Promise<string | ArrayBuffer>((resolve, reject) => {
      const reader = new FileReader();
      const ext = file.name.split('.')[1];
      reader.onload = e => {
        return resolve((e.target as FileReader).result);
      };
      reader.onerror = e => {
        console.error(`FileReader failed on file ${file.name}.`);
        return reject(null);
      };
      if (!file) {
        console.error('No file to read.');
        return reject(null);
      }
      reader.readAsDataURL(file);
    });
  }

  public exportAsExcelFile(jsonOrigin: any) {
    const json = this.formatDataEncominda(jsonOrigin);
    const wb = new Promise((resolve, reject) => {
      XlsxPopulate.fromBlankAsync()
        .then((workbook) => {
          const nombreHoja = 'Listado Encomiendas';
          workbook.addSheet(nombreHoja);
          const ws = workbook.sheet(nombreHoja);
          if (json.length === 0) {
            ws.cell('A3').value('No Existen Datos Asociados');
          } else {
            const columnas = Object.keys(json[0]).filter(val => !val.includes('id'));
            ws.cell('A2').value([columnas]);
            let fila = 3;
            json.forEach((v: any) => {
              let col = 1;
              columnas.forEach((e1: any, i) => {
                // tslint:disable-next-line: forin
                ws.row(fila).cell(col).value(v[e1]);
                // console.log(fila,col)
                col++;
              });
              fila++;
            });
          }
          workbook.deleteSheet('Sheet1');
          resolve(workbook.outputAsync());
        });
    });
    return wb;
  }

  formatDataEncominda(json: any[]) {
    const aux = [];
    json.forEach((e: any) => {
      // console.log(e)
      e.asignacion = ((e.asignacion !== null) ? `${e.asignacion.nombre} ${e.asignacion.apellido_pa}` : 'NO ASIGNADO');
      e.estado = e.estado[e.estado.length - 1].estado.codigo;
      aux.push(e);
    });
    return aux;
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

}
