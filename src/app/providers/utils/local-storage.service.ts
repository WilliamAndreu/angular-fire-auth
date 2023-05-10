import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  language = new BehaviorSubject<string>('es-ES');

  constructor() { }

  set(key:string,value:any){
    return localStorage.setItem(key, value);
  }
  get(key:string){
    return localStorage.getItem(key);
  }

  setLanguage(language: string) {
    this.language.next(language)
    return localStorage.setItem("language", language);
  }

  getAuthInfo(): any {
    return localStorage.getItem("authInfo");
  }

  setAuthInfo(auth: any) {
    return localStorage.setItem("authInfo", auth);
  }

  getLanguage() {
    return localStorage.getItem("language");
  }

  logout() {
    return localStorage.clear();
  }

}
