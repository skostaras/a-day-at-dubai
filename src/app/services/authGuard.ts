import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpService } from './http.service';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: HttpService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        //TODO dummy? need to check token status irl   
        const user = this.authenticationService.userValue;
        if (user) {
            return true;
        }

        this.router.navigate(['/']);
        return false;
    }
}