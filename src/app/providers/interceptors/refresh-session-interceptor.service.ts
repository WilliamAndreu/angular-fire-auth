import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { filter, switchMap, take, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import * as moment from 'moment';


@Injectable({
  providedIn: 'root'
})
export class RefreshSessionInterceptorService implements HttpInterceptor {

  // var con los endpoints publicos, los cuales no necesitan un token
  private publicEndpoints = environment.publicEndpoints;

  private isRefreshing = false
  private refreshTokenSubject = new BehaviorSubject<string|any>(null)

  constructor(
    private http:HttpClient
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // si es una llamada de assets se hace un handle y se omite 
    if (req.url.includes('assets')) {
      return next.handle(req)
    }
    return from(this.isRefreshNeeded(req))
    .pipe(
      switchMap(isRefreshNeeded => isRefreshNeeded ? from(this.refreshSession(isRefreshNeeded)) : of(null)),
      switchMap(_ => next.handle(req))
    )
  }

  // comprueba si el token ha expirado y si ha expirado hace la llamda de refresh token
  private async isRefreshNeeded(request: HttpRequest<any>): Promise<any> {
    if (this.isPublicEndPoint(request)) {
        return null;
    }
    const tokenExpired = await this.isTokenExpired();

    return tokenExpired;
  }

  // comprueba si es un endpoint publico 
  private isPublicEndPoint(request: HttpRequest<any>) {
    return this.publicEndpoints.find((ep) => {
        return request.method === ep.method && request.url.includes(ep.endpoint);
    });
  }

  // comprobar si el token ha expirado
  private async isTokenExpired(): Promise<any> {
    const authInfo = {expires_in:10000}//await this.localStorage.getAuthInfo();
    console.warn("date now",moment().local().diff(moment().startOf('day'), 'seconds'));
    console.warn("expire in",authInfo?.expires_in);
    
    if (authInfo && moment().local().diff(moment().startOf('day'), 'seconds') >= authInfo?.expires_in) {
      return Promise.resolve(authInfo);
    }
    return Promise.resolve(null);
  }

  // llamad al metodo para hacer el refresh del token
  private refreshSession(directAuthInfo: any): Promise<any> {
    if (this.isRefreshing) {
      return this.awaitToken()
    } else {
      this.resetRefreshing()
      return this.fetchAuthRefresh(directAuthInfo)
    }
  }

  private awaitToken(): Promise<string> {
    return this.refreshTokenSubject.pipe(
      filter(token => token != null),
      take(1),
    ).toPromise()
  }

  // metodo de llamada de refresh token
  private async fetchAuthRefresh(directAuthInfo: any): Promise<void> {

    const endpoint = `${environment.baseUrl.DEV}/auth/token`

    const body = {
      refresh_token: directAuthInfo.refresh_token,
      grant_type: 'refresh_token',
      client_id: environment.appData.client_id,
      client_secret:  environment.appData.client_secret
    }
    console.log('~ bodyForRefreshToken', body)

    try {

      this.refreshCall(body,endpoint).then(res=>{
        this.refreshTokenSubject.next(res.access_token)
        this.isRefreshing = false
        console.log('~ dataRefeshToken http angular', res)
        // guardamos el objeto auth en localstorage (contiene los datos de acceso ==> access_token etc...)
        return localStorage.setItem("AuthInfo",res)
      }).catch(err=>{
        console.log("error refreshing token");
      })
      
    } catch (error) {
      console.log('~ responseErrorRefreshToken', error)
      this.resetRefreshing()
      return Promise.reject()
    }
  }
  
  resetRefreshing() {
    this.isRefreshing = false
    this.refreshTokenSubject.next(null)
  }

  refreshCall(body:any,endpoint:string): Promise<any>{
    return new Promise((resolve, reject) => {
      this.http.post<any>(endpoint,body)
      .pipe(
        tap(res=> console.log("res",res)
        )
      )
      .subscribe(response => {
        resolve(response)
      }, err => {
        reject(err)
      })
    });
  }

}
