import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';
import { Router } from '@angular/router';
import { tap, catchError, retry } from 'rxjs/operators';

@Injectable()
export class HeaderInterceptorInterceptor implements HttpInterceptor {

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) { }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let request = req;
    const token = this.usuarioService.getAwknToken();
    if (token === 'INVALID') {
      this.router.navigate(['auth', 'login']);
    }
    if (!request.url.includes('www.googleapis.com') && !request.url.includes('/auth/login') && !request.url.includes('/auth/registro')) {
      request = req.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(request).pipe(
      // retry(2),
      catchError((error: HttpErrorResponse) => {
        if (error.error.status === 401) {
          // 401 handled in auth.interceptor
          this.router.navigate(['auth', 'login']);
        }
        return throwError(error);
      }));
  }
}
