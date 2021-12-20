import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EndpointService {
  constructor(private http: HttpClient) { }

  private loginUrl = 'https://frontend-5325.instashop.ae/api/users/login';

  sendJsonPlaceholder(data: any): Observable<boolean> {
    console.info('JSON Placeholder sent');
    return this.http.post('https://jsonplaceholder.typicode.com/posts', { data }).pipe(
      map(_ => true),
      catchError(error => of(false))
    );
  }

  postLogin(data: any): Observable<boolean> {

    return this.http.post(this.loginUrl, data).pipe(
      map(_ => true),
      catchError(error => {
        console.log(error.error.errorMessage.message);
        return of(false);
      })
    )

  }

  //   getJokesByCategory(category = 'Any', flags = ''): Observable<JokeApi> {
  //     const requestUrl = 'https://v2.jokeapi.dev/joke/' + category;
  //     return this.http.get<JokeApi>(requestUrl, {
  //       params: new HttpParams()
  //         .set('format', 'json')
  //         .set('type', 'single')
  //         .set('lang', 'en')
  //         .set('amount', 10)
  //         .set('blacklistFlags', flags)
  //     }
  //     );
  //   }

}
