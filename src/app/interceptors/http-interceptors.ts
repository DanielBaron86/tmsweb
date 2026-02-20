import {HttpErrorResponse, HttpEvent, HttpEventType, HttpHandlerFn, HttpRequest} from '@angular/common/http';
import {Observable, switchMap, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {inject} from '@angular/core';
import {AuthServices} from '../services/auth/auth.services';
import { ToastService} from '../services/toast.service';



export function loggingInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  const toast = inject(ToastService);
  return next(req).pipe(
    catchError((error: unknown) => {
      if (error instanceof HttpErrorResponse) {

        if( error.error?.detail){
          toast.show(error.error);
        }
        console.error(
          'HTTP Error:',
          req.method,
          req.url,
          'Error:',
          error.error,
        );
      }
      return throwError(() => error);
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
    catchError((error: HttpErrorResponse) => {
      const isAuthRequest = error.url?.includes('users/login') || error.url?.includes('users/refreshToken');
      if (error.status === 401 && !isAuthRequest) {
        return authToken.refreshToken().pipe(
          switchMap(res => {
            authToken.setToken(res);
            const newReq = req.clone({
              headers: req.headers.set('Authorization', 'Bearer ' + res),
            });
            return next(newReq);
          }),
          catchError((refreshErr) => {
            return throwError(() => refreshErr);
          })
        );
      }
      return throwError(() => error);
    })
  );
}
