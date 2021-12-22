import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from 'app/models/user';
import { Landmark } from '../models/landmark';
import { LandmarkWithDescription } from 'app/models/landmark-with-description';

@Injectable({ providedIn: 'root' })
export class HttpService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    private loginUrl = 'https://frontend-5325.instashop.ae/api/users/login';
    private logoutUrl = 'https://frontend-5325.instashop.ae/api/users/logout';
    private allLandmarksUrl = 'https://frontend-5325.instashop.ae/api/landmarks';

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
        return this.http.post<User>(this.loginUrl, data).pipe(
            tap(
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
            tap(
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

    getAllLandmarks(): Observable<Landmark[]> {
        return this.http.get<Landmark[]>(this.allLandmarksUrl, {});
    }

    getLandmarkById(objectId): Observable<LandmarkWithDescription> {
        return this.http.get<LandmarkWithDescription>(this.allLandmarksUrl + '/' + objectId, {});
    }

}