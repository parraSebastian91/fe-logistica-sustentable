import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { path } from './path';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  url;
  constructor(
    private http: HttpClient
  ) {
    this.url = environment.endPoint;
  }

  async getPathList() {
    const data = new Promise((resolve, reject) => {
      resolve(path);
    });
    return data;
  }

  async callServices(request) {
    const servicio = await this.getPathList().then(v => {
      return v[request.servicio];
    });
    let ruta = `${this.url}${servicio.rutaRemota}`;
    let data;
    switch (servicio.tipo) {
      case 'post':
        if (request.bindPath) {
          Object.keys(request.bindPath).forEach(e => {
            ruta = ruta.replace(`:${e}:`, request.bindPath[e]);
          });
        }
        data = await this.http.post(ruta, request.body).toPromise();
        break;
      case 'patch':
        if (request.bindPath) {
          Object.keys(request.bindPath).forEach(e => {
            ruta = ruta.replace(`:${e}:`, request.bindPath[e]);
          });
        }
        data = await this.http.patch(ruta, request.body).toPromise();
        break;
      case 'get':
        if (request.body) {
          Object.keys(request.body).forEach(e => {
            ruta = ruta.replace(`:${e}:`, request.body[e]);
          });
        }
        data = await this.http.get(ruta).toPromise();
        break;
      case 'put':
        if (request.bindPath) {
          Object.keys(request.bindPath).forEach(e => {
            ruta = ruta.replace(`:${e}:`, request.bindPath[e]);
          });
        }
        data = await this.http.put(ruta, request.body).toPromise();
        break;
      case 'json':
        data = await this.http.get(servicio.rutaLocal).toPromise();
        break;
    }
    return data;
  }

  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  getDistancia(origen, destino) {
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origen}&destinations=${destino}&key=${environment.firebaseConfig.apiKey}`;
    return this.http.get(url).toPromise();
  }

}
