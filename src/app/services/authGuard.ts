import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpService } from './http.service';
import { NotificationService } from './notification.service';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: HttpService,
        private notificationService: NotificationService,
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        const user = this.authenticationService.userValue;
        if (user) {
            return true;
        }

        this.notificationService.errorNotification("You don't have permissions to access this page.")
        this.router.navigate(['/']);
        return false;
    }
}