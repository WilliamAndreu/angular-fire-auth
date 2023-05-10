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

    /**
     * Returns an Observable that authenticates a user with Google OAuth.
     * @returns Observable<any>
     */
    GoogleAuth(): Observable<any> {
        // Create a new GoogleAuthProvider instance
        const provider = new GoogleAuthProvider();
        // Sign in with Google OAuth using AngularFireAuth and return an Observable
        return from(this.afAuth.signInWithPopup(provider)).pipe(
            // Map the response data and store the user data in local storage
            map(async (data) => {
                await localStorage.setItem('user', JSON.stringify(data.additionalUserInfo))
                return data;
            }),
            // Catch any errors and log them to the console
            catchError((error) => {
                console.log(error);
                return error;
            })
        );
    }

    /**
     * Returns an Observable that authenticates a user with email and password.
     * @param email - The user's email address
     * @param password - The user's password
     * @returns Observable<any>
     */
    emailLogin(email: string, password: string): Observable<any> {
        // Sign in with email and password using AngularFireAuth and return an Observable
        return from(this.afAuth.signInWithEmailAndPassword(email, password)).pipe(
            // Catch any errors and log them to the console
            catchError((error) => {
                console.log(error);
                return error;
            })
        );
    }
}