import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';

@Injectable({
    providedIn: 'root'
})
export class CanAuthenticationGuard extends KeycloakAuthGuard implements CanActivate {
    constructor(protected router: Router, protected keycloakAngular: KeycloakService) {
        super(router, keycloakAngular);
    }

    isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            if (!this.authenticated) {
                this.keycloakAngular.login();
                resolve(false)
            } else if (this.authenticated) {
            resolve(true)
            }
            console.log('role restriction given at app-routing.module for this route', route.data.roles);
            console.log('User roles coming after login from keycloak :', this.roles);
            const requiredRoles = route.data.roles;
            let granted: boolean = false;
            if (!requiredRoles || requiredRoles.length === 0) {
                granted = true;
            } else {
                for (const requiredRole of requiredRoles) {
                    if (this.roles.indexOf(requiredRole) > -1) {
                        granted = true;
                        break;
                    }
                }
            }

            if (granted === false) {
                this.router.navigate(['/']);
            }
            resolve(granted);

        });
    }
}
