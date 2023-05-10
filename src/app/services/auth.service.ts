import { Injectable } from '@angular/core';
import { GoogleAuthProvider } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( public afAuth: AngularFireAuth) {
  }

  GoogleAuth() {
    return this.AuthLogin(new GoogleAuthProvider());
  }
  // Auth logic to run auth providers
  AuthLogin(provider: GoogleAuthProvider) {
    return this.afAuth
        .signInWithPopup(provider)
        .then((result) => {

          console.log(result.additionalUserInfo);
          localStorage.setItem('user', JSON.stringify(result.additionalUserInfo))
        })
        .catch((error) => {
          console.log(error);
        });
  }
  emailLogin(email: string, password: string){
      return this.afAuth.signInWithEmailAndPassword(email, password);
  }
}
