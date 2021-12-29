import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { HttpService } from './http.service';
import { NotificationService } from './notification.service';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: HttpService,
        private notificationService: NotificationService,
        private httpService: HttpService,
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

        return this.httpService.userValue.map((user) => {
            if (user) {
                return true;
            } else {
                this.notificationService.errorNotification("You don't have permissions to access this page.")
                this.router.navigate(['/']);
                return false;
            }
        }, error => {
            this.router.navigate(['/']);
            return false;
        }
        );

    }

}