import {HttpErrorResponse, HttpEvent, HttpEventType, HttpHandlerFn, HttpRequest} from '@angular/common/http';
import {Observable, switchMap, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {inject} from '@angular/core';
import {AuthServices} from '../services/auth/auth.services';



export function loggingInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  return next(req).pipe(
    tap((event) => {
      if (event.type === HttpEventType.Response) {
        console.log(req.url, 'returned a response with status', event.status);
      }
    }),
  );
}

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const authToken = inject(AuthServices);
  const newReq = req.clone({
    headers: req.headers.append('Authorization', 'Bearer ' + authToken.tokenString()),
  });
  return next(newReq);
}

export function refreshTokenInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const authToken = inject(AuthServices);
  return next(req).pipe(
    catchError( (error: HttpErrorResponse) => {
      if(error.status == 401 && !(error.url?.includes('users/login') || error.url?.includes('users/refreshToken') )){
        return authToken.refreshToken().pipe(
          switchMap(res => {
            authToken.setToken(res);
            const newReq = req.clone({
              headers: req.headers.set('Authorization', 'Bearer ' + res),
            });
            return next(newReq);
          }),
          catchError( (err) => {
            return  throwError(() => new Error(err.error.message))
          })
        );
      }else{
        return  throwError(() => new Error(error.error.message))
      }
    })
  );
}
