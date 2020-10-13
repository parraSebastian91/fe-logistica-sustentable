import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DocService } from 'src/app/services/doc-service.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  files: File[] = [];
  mensajeEspera = '';
  mensajeError = '';
  mensajeOk = '';
  archivoBase64;
  cargarDisable = false;
  msjUpload = 'Arrastra tus Archivos o haz click aquí';

  constructor(
    private dialogRef: MatDialogRef<UploadComponent>,
    private docService: DocService
  ) { }

  ngOnInit(): void {
  }

  onSelect(event) {
    if (this.files.length === 1) {
      this.mensajeError = 'Solo se puede ingresar 1 archivo a la vez';
      setTimeout(() => {
        this.mensajeError = '';
      }, 3000);
      return;
    }
    this.files.push(...event.addedFiles);
    const aux: any[] = [];
    this.files.forEach((element, i) => {
      this.readFile(element, i)
        .then((fileContents: string) => {
          this.mensajeError = '';
          const body = {
            file_name: element.name,
            file_ext: element.name.split('.')[1],
            file: fileContents.split(',')[1]
          };
          // return body;
          aux.push(body);
        }).catch((err) => {
          this.mensajeError = err;
        });
    });
    this.archivoBase64 = aux;
    this.dialogRef.close(this.archivoBase64);
  }

  private readFile(file: File, indice: number): Promise<string | ArrayBuffer> {
    // tslint:disable-next-line: no-shadowed-variable
    return new Promise<string | ArrayBuffer>((resolve, reject) => {
      const reader = new FileReader();
      const ext = file.name.split('.')[1];
      if (this.files.length > 1) {
        this.cargarDisable = true;
        this.files.splice(this.files.indexOf(file), 1);
        this.mensajeError = 'Solo se puede ingresar 1 archivo a la vez';
        return reject(this.mensajeError);
      }
      reader.onload = e => {
        this.cargarDisable = false;
        return resolve((e.target as FileReader).result);
      };
      reader.onerror = e => {
        this.cargarDisable = true;
        console.error(`FileReader failed on file ${file.name}.`);
        return reject(null);
      };
      if (!file) {
        this.cargarDisable = true;
        console.error('No file to read.');
        return reject(null);
      }
      reader.readAsDataURL(file);
    });
  }

  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  descargarExcel(){
    // const f = new Blob();
    this.docService.downloadExcelSample();
  }

}
