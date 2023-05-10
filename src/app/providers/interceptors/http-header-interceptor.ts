import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { switchMap } from 'rxjs/operators';
import { LocalStorageService } from '../utils/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class HeadersInterceptorService implements HttpInterceptor{

  private publicEndpoints = environment.publicEndpoints;

  constructor(
    private localStorage:LocalStorageService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('assets')) {
      return next.handle(req)
    }
  
  // const headers= new HttpHeaders()
  //   .set('content-type', 'application/json')
  //   .set('Access-Control-Allow-Origin', '*');
    
    const languageCode = this.getLangCode()
   /*  convierte la respuesta promise a observable y cancela el ultimo observable con switchMap
    y maneja el siguiente clonando los headers */
    return from(this.setHeaders(req, languageCode))
      .pipe(
        switchMap(headers => next.handle(req.clone({headers}))) // 
      )
  }
  //utiliza un behaviour subject para obtener el idioma (this.localStorage.language.value)
  // al hacer setLanguage (LocalStorageService) hace un next(idioma_actual)
  private getLangCode(): string {
    const language = this.localStorage.language.value
    let code = 'es-ES'
    switch (language) {
      case 'es':
        code = 'es-ES'
        break;
      case 'en':
        code = 'en-US'
        break;
      case 'ca':
        code = 'ca-ES'
        break;   
    }
    return code
  }
  
  private async setHeaders(request: HttpRequest<any>, languageCode: string): Promise<HttpHeaders>  {
    let { headers } = request
    //set de header si es un endpoint publico o no
    if (!this.isPublicEndPoint(request)) {
      const authInfo = await localStorage.getItem("AuthInfo");
      if (authInfo) {                    
        headers = headers.set("Authorization", `Bearer ${JSON.parse(authInfo).access_token}`);
      }
    } else {
      headers = headers.delete("Authorization");
    }
    // headers = headers.set('LanguageCode', languageCode)
    return Promise.resolve(headers)
  }

  private isPublicEndPoint(request: HttpRequest<any>) {
    return this.publicEndpoints.find((ep) => {
        return request.method === ep.method && request.url.includes(ep.endpoint);
    });
  }

}
