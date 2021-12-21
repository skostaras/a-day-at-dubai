import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    private loginUrl = 'https://frontend-5325.instashop.ae/api/users/login';
    private logoutUrl = 'https://frontend-5325.instashop.ae/api/users/logout';

    constructor(
        private router: Router,
        private http: HttpClient,
    ) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): User {
        return this.userSubject.value;
    }

    loginRequest(data: any) {
        return this.http.post<any>(this.loginUrl, data).pipe(
            map(
                user => {
                    localStorage.setItem('user', JSON.stringify(user));
                    this.userSubject.next(user);
                    return user;
                }
            )
        )
    }

    logoutRequest() {
        return this.http.get<any>(this.logoutUrl, {}).pipe(
            map(
                message => {
                    localStorage.removeItem('user');
                    localStorage.removeItem('username');
                    this.userSubject.next(null);
                    this.router.navigate(['/']);
                    return message;
                }
            )
        )
    }

}

export class User {
    userId: string;
    sessionToken: string;
}