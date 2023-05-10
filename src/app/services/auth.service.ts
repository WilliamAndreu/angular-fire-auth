import { Injectable } from '@angular/core';
import { GoogleAuthProvider } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {catchError, finalize, map} from 'rxjs/operators';
import { from, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private afAuth: AngularFireAuth) {}

    GoogleAuth(): Observable<any> {
        const provider = new GoogleAuthProvider();
        return from(this.afAuth.signInWithPopup(provider)).pipe(
           map(async (data) => {
               await localStorage.setItem('user', JSON.stringify(data.additionalUserInfo))
               return data;
           }),
            catchError((error) => {
                console.log(error);
                return error;
            })
        );
    }

    emailLogin(email: string, password: string): Observable<any> {
        return from(this.afAuth.signInWithEmailAndPassword(email, password)).pipe(
            catchError((error) => {
                console.log(error);
                return error;
            })
        );
    }
}