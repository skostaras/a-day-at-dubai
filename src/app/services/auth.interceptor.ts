import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authenticationService: HttpService) { }

    private baseUrl = 'https://frontend-5325.instashop.ae/api/';

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // add header with basic auth credentials if user is logged in and request is to the api url
        const user = this.authenticationService.userValue;
        const isLoggedIn = user !== null && user.userId !== null && user.sessionToken != null;
        const isApiUrl = request.url.startsWith(this.baseUrl);

        if (isLoggedIn && isApiUrl) {
            request = request.clone({
                setHeaders: {
                    'x-sessionToken': user.sessionToken
                }
            });
        }

        return next.handle(request);
    }
}