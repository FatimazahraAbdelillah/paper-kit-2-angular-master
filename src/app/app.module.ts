import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';

import { ComponentsModule } from './components/components.module';
import { ExamplesModule } from './examples/examples.module';
import {HttpClientModule} from '@angular/common/http';
import {KeycloakAngularModule} from 'keycloak-angular';
import {OperationsService} from './services/operations.service';
import { AccountComponent } from './components/account/account.component';
import {CompteService} from './services/compte.service';
/*export function kcFactory(keycloakService: KeycloakService) {
  return () => keycloakService.init();
}*/
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
  providers: [/*{
    provide: APP_INITIALIZER,
    useFactory: kcFactory,
    deps: [KeycloakService],
    multi: true
  }*/, OperationsService, CompteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
