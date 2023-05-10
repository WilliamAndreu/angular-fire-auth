import {Injectable, Injector} from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
//import { ConnectivityChecker } from './connectivity.service';
import { TranslateService } from '@ngx-translate/core';
import { LoadingStateService } from '../utils/loading-state.service';
import { Router } from '@angular/router';

@Injectable()
export class HttpErrorInterceptorProvider implements HttpInterceptor {

    constructor(private injector: Injector,
        private translate:TranslateService,
        private loadingState:LoadingStateService,
        private router:Router
        ) {}

    // hace un handle en handleHttpError y da feedback segun codigo de error
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.includes('assets')) {
            return next.handle(req)
          }
        return next.handle(req).pipe(catchError((err, caught) => this.handleHttpError(err)));
    }

    private handleHttpError(error: HttpErrorResponse): Observable<any> {
        console.error('RAW HTTP ERROR | ', error);
     
        const errorCode = error.status;
        let causa;
        if (error.error !== undefined && error.error.causa) {
            causa = error.error.causa;
        }
        switch (errorCode) {
            case 400:
                break;
            case 401:
                break;
            case 403:
                break;
            case 404:
                break;
            case 409:
                break;
            case 412:
              
                break;
            case 422:
              
                break;
            case 500:
         
            default:
                
                break;
        }

        this.loadingState.loadingOff();
        throw error;
    }

}
