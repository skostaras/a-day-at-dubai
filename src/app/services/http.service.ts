import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from 'app/models/user';
import { LandmarkWithPhotos } from '../models/landmark-with-photos';
import { LandmarkWithPhotosAndDescription } from 'app/models/landmark-with-photos-and-description';
import { LandmarkWithDescription } from 'app/models/landmark-with-description';

@Injectable({ providedIn: 'root' })
export class HttpService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    private loginUrl = 'https://frontend-5325.instashop.ae/api/users/login';
    private logoutUrl = 'https://frontend-5325.instashop.ae/api/users/logout';
    private landmarksUrl = 'https://frontend-5325.instashop.ae/api/landmarks';

    constructor(
        private router: Router,
        private http: HttpClient,
    ) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): Observable<User> {
        return this.userSubject.asObservable();
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

                    if (this.router.url.includes('dashboard')) {
                        this.router.navigate(['/']);
                    }

                    return message;
                }
            )
        )
    }

    editLandmarkRequest(objectId: string, body: LandmarkWithDescription) {
        return this.http.put<LandmarkWithDescription>(this.landmarksUrl + '/' + objectId, body);
    }

    getAllLandmarks(): Observable<LandmarkWithPhotos[]> {
        return this.http.get<LandmarkWithPhotos[]>(this.landmarksUrl, {});
    }

    getLandmarkById(objectId: string): Observable<LandmarkWithPhotosAndDescription> {
        return this.http.get<LandmarkWithPhotosAndDescription>(this.landmarksUrl + '/' + objectId, {});
    }

}