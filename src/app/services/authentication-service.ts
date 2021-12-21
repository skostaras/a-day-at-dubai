import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { NotificationService } from './notification.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    private loginUrl = 'https://frontend-5325.instashop.ae/api/users/login';
    private logoutUrl = 'https://frontend-5325.instashop.ae/api/users/logout';

    constructor(
        private router: Router,
        private http: HttpClient,
        private notificationService: NotificationService
    ) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): User {
        return this.userSubject.value;
    }

    // login(username: string, password: string) {
    //     return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { username, password })
    //         .pipe(map(user => {
    //             // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
    //             user.authdata = window.btoa(username + ':' + password);
    //             localStorage.setItem('user', JSON.stringify(user));
    //             this.userSubject.next(user);
    //             return user;
    //         }));
    // }

    postLogin(data: any) {
        console.log("postLogin");

        return this.http.post<any>(this.loginUrl, data).pipe(
            map(
                user => {
                    localStorage.setItem('user', JSON.stringify(user));
                    this.userSubject.next(user);
                    return user;
                }


            )
            // catchError(error => {
            //     console.log(error);

            //     console.log(error.errorMessage.message);
            //     return of(false);
            // })
        )

    }

    logout() {
        console.log("logout");

        let token = '';

        const activeUser = JSON.parse(localStorage.getItem("user"));
        if (activeUser) {
            token = activeUser.sessionToken;
        }

        console.log(token);

        console.log(this.userValue);
        console.log(this.userSubject.value);
        

        return this.http.get<any>(this.logoutUrl, {}).pipe(
            map(
                message => {
                    this.notificationService.infoNotification(message.message);

                    // remove user from local storage to log user out
                    localStorage.removeItem('user');
                    localStorage.removeItem('username');
                    this.userSubject.next(null);
                    this.router.navigate(['/']);
                }


            )
        )

    }
}

export class User {
    userId: string;
    sessionToken: string;
}