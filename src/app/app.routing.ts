import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { ComponentsComponent } from './components/components.component';
import { ProfileComponent } from './examples/profile/profile.component';
import { SignupComponent } from './components/signup/signup.component';
import { LandingComponent } from './examples/landing/landing.component';
import { NucleoiconsComponent } from './components/nucleoicons/nucleoicons.component';
import {LoginComponent} from './components/login/login.component';
import {AccountComponent} from './components/account/account.component';
import {CanAuthenticationGuard} from './services/CanAuthenticationGuard.service';
import {ClientComponent} from './components/client/client.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home',             component: ComponentsComponent, canActivate: [CanAuthenticationGuard]},
    { path: 'user-profile',     component: ProfileComponent , canActivate: [CanAuthenticationGuard]},
    { path: 'client',           component: ClientComponent, canActivate: [CanAuthenticationGuard], data: { roles: ['user']}},
    { path: 'login',           component: LoginComponent , canActivate: [CanAuthenticationGuard]},
    { path: 'landing',          component: LandingComponent, canActivate: [CanAuthenticationGuard]},
    { path: 'nucleoicons',      component: NucleoiconsComponent, canActivate: [CanAuthenticationGuard]},
    { path: 'account',      component: AccountComponent, canActivate: [CanAuthenticationGuard],
        data: { roles: ['admin']}},
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
