import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    private loginUrl = 'https://frontend-5325.instashop.ae/api/users/login';

    constructor(
        private router: Router,
        private http: HttpClient
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
        return this.http.post<any>(this.loginUrl, data).pipe(
            map(
                user => {
                    localStorage.setItem('user', JSON.stringify(user));
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
        // remove user from local storage to log user out
        localStorage.removeItem('user');
        localStorage.removeItem('username');
        this.userSubject.next(null);
        this.router.navigate(['/']);
    }
}

export class User {
    userId: string;
    sessionToken: string;
}