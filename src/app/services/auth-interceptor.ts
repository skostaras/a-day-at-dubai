import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication-service';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    private baseUrl = 'https://frontend-5325.instashop.ae/api/';

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        console.log("here");

        // add header with basic auth credentials if user is logged in and request is to the api url
        const user = this.authenticationService.userValue;
        console.log(user);
        
        const isLoggedIn = user !== null && user.userId !== null && user.sessionToken != null;
        const isApiUrl = request.url.startsWith(this.baseUrl);
        if (isLoggedIn && isApiUrl) {
            request = request.clone({
                setHeaders: {
                    'x-sessionToken': user.sessionToken
                }
            });
        } else {
            //TODO delete
            console.log("Not logged in or different api url");

        }

        return next.handle(request);
    }
}