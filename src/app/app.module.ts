import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuardService } from './providers/guards/auth-guard.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptorProvider } from './providers/interceptors/http-error-interceptor';
import { HeadersInterceptorService } from './providers/interceptors/http-header-interceptor';
import { RefreshSessionInterceptorService } from './providers/interceptors/refresh-session-interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// import ngx-translate and the http loader
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';

export function HttpLoaderFactory(http: HttpClient){
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

import {NgOptimizedImage, registerLocaleData} from '@angular/common';
import es from '@angular/common/locales/es';
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../environments/environment";
import { UserInfoDialogComponent } from './components/user-info-dialog/user-info-dialog.component';
registerLocaleData(es);

@NgModule({
  declarations: [
    AppComponent,
    UserInfoDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    }),
    NgOptimizedImage,
  ],
  providers: [
    AuthGuardService,
    {provide: HTTP_INTERCEPTORS,useClass: HttpErrorInterceptorProvider,multi: true},
    {provide: HTTP_INTERCEPTORS,useClass: HeadersInterceptorService,multi: true},
    {provide: HTTP_INTERCEPTORS,useClass: RefreshSessionInterceptorService,multi: true},
    { provide: LOCALE_ID, useValue: "es-*" },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
