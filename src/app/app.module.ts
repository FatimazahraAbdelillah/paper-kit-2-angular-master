import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {Router, RouterLink, RouterModule} from '@angular/router';
import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';

import { ComponentsModule } from './components/components.module';
import { ExamplesModule } from './examples/examples.module';
import {HttpClientModule} from '@angular/common/http';
import {KeycloakAngularModule, KeycloakService} from 'keycloak-angular';
import {OperationsService} from './services/operations.service';
import { AccountComponent } from './components/account/account.component';
import {CompteService} from './services/compte.service';
import {config} from 'rxjs';
import {CanAuthenticationGuard} from './services/CanAuthenticationGuard.service';
import {getToken} from 'codelyzer/angular/styles/cssLexer';
import {error} from 'util';
export function initializer(keycloak: KeycloakService): () => Promise<any> {
  return (): Promise<any> => keycloak.init({
    config: {
      url: 'http://localhost:8080/auth',
      realm: 'Shinrai',
      clientId: 'ShinraiBackend'
    },
    initOptions: {
      onLoad: 'check-sso',
      checkLoginIframe: false,
    },
    enableBearerInterceptor: true,
    bearerExcludedUrls: ['/assets', '/clients/public']
  })
     .then((authenticated) => {
      if (keycloak.getUserRoles()[0] === 'admin') {
        console.log('addmiiiiinnn')
        location.replace('http://localhost:4200/#/account')

      } else {
        console.log('useeeeer')
      location.replace('http://localhost:4200/#/client')
      }
      }
  );
}
@NgModule({
  declarations: [
    AppComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    FormsModule,
    RouterModule,
    ComponentsModule,
    ExamplesModule,
    AppRoutingModule,
    HttpClientModule,
    KeycloakAngularModule
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: initializer,
    deps: [KeycloakService],
    multi: true
  }, OperationsService, CompteService, CanAuthenticationGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
