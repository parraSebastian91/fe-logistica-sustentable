import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

export interface DataProfile {
  email: string;
  family_name: string;
  given_name: string;
  granted_scopes: string;
  id: string;
  locale: string;
  name: string;
  picture: string;
  verified_email: true;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private afAuth: AngularFireAuth,
    private http: HttpClient,
    private router: Router,
  ) { }

  isAutenticated() {
    const request = this.validateTokenGoogle();
    const isValid = request
      .then((resp: any) => {
        return ((resp.access_type === 'online') ? true : false);
      })
      .catch(err => {
        return true;
      });
    return isValid;
  }

  async loginGoogle() {
    // tslint:disable-next-line: no-shadowed-variable
    return new Promise((resolve, rejects) => {
      try {
        // tslint:disable-next-line: new-parens
        resolve(this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider));
      }
      catch (error) {
        rejects(error);
      }
    });
  }

  async logOutGoogle() {
    this.afAuth.auth.signOut().then(() => {
      sessionStorage.clear();
      this.router.navigate(['auth', 'login']);
    });
  }

  async validateTokenGoogle() {
    const pathValidation = `https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${this.getAccessToken()}`;
    const request = await this.http.get(pathValidation).toPromise();
    return request;
  }

  setSessionAwkn(session) {
    sessionStorage.setItem('awknSession', JSON.stringify(session));
  }

  getAwknToken() {
    let sessionVar = sessionStorage.getItem('awknSession');
    if (sessionVar === null) {
      sessionVar = '{"accessToken":"INVALID"}';
    }
    return JSON.parse(sessionVar).token;
  }

  getAwknSession() {
    let sessionVar = sessionStorage.getItem('awknSession');
    if (sessionVar === null) {
      sessionVar = '{"accessToken":"INVALID"}';
    }
    return JSON.parse(sessionVar);
  }

  setSessionActive(session) {
    sessionStorage.setItem('userInfo', JSON.stringify(session.additionalUserInfo));
    sessionStorage.setItem('credentials', JSON.stringify(session.credential));
  }

  getDataProfile(): DataProfile {
    let sessionVar: any = sessionStorage.getItem('userInfo');
    if (sessionVar === null) {
      sessionVar = JSON.parse(sessionStorage.getItem('awknSession'));
      return {
        email: sessionVar,
        family_name: sessionVar.apellido_paterno,
        given_name: sessionVar.nombre,
        granted_scopes: '',
        id: sessionVar.id,
        locale: 'es',
        name: `${sessionVar.nombre} ${sessionVar.apellido_paterno} ${sessionVar.apellido_materno}`,
        picture: 'assets/shop.png',
        verified_email: true,
      };
    }
    return JSON.parse(sessionVar).profile;
  }

  getNameUser() {
    const sessionVar = sessionStorage.getItem('userInfo');
    return JSON.parse(sessionVar).profile.email;
  }

  getAccessToken() {
    let sessionVar: any = sessionStorage.getItem('credentials');
    if (sessionVar === null) {
      sessionVar = '{}';
    }
    return JSON.parse(sessionVar).oauthAccessToken;
  }

  validarSessionRedirect(ruta) {
    if (this.getAwknSession().googleLog) {
      this.validateTokenGoogle()
        .then((resp: any) => {
          if (resp.access_type === 'online') {
            this.router.navigate([ruta]);
          } else {
            this.router.navigate(['auth', 'login']);
          }
        }).catch(err => {
          this.router.navigate(['auth', 'login']);
        });
    } else {
      this.router.navigate([ruta]);
    }
  }

}
