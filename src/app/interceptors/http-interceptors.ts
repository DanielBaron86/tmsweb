import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable, switchMap, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { inject } from '@angular/core';
import { AuthServices } from '../services/auth/auth.services';
import { ToastData, ToastService } from '../services/toast.service';
import { Router } from '@angular/router';

export function loggingInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  const toast = inject(ToastService);
  return next(req).pipe(
    catchError((error: unknown) => {
      if (error instanceof HttpErrorResponse && error.status !== 401) {
        console.error('HTTP Error:', req.method, req.url, 'Error:', error);
        if (error.error?.detail) {
          toast.show(error.error);
        }
        if (error.error?.message) {
          console.error('Error message:', error.error.message);
          const toastData: ToastData = {
            title: error.name,
            status: error.status,
            detail: error.error.errorMessage,
          };
          toast.show(toastData);
        }
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
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const isAuthRequest =
        error.url?.includes('users/login') || error.url?.includes('users/refreshToken');
      if (error.status === 401 && !isAuthRequest) {
        return authToken.refreshToken().pipe(
          switchMap((res) => {
            authToken.setToken(res);
            const newReq = req.clone({
              headers: req.headers.set('Authorization', 'Bearer ' + res),
            });
            return next(newReq);
          }),
          catchError((refreshErr) => {
            authToken.clearToken();
            router.navigate(['/login']);
            return throwError(() => refreshErr);
          }),
        );
      }

      return throwError(() => error);
    }),
  );
}
