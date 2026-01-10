import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class AuthServices {
  private http = inject(HttpClient);
  private router = inject(Router);
 
  readonly apiUrl = 'https://tmsapi.local/api/v1/users/login';
  readonly #tokenString = signal<string | null>(null);

  login(username: string, password: string, keepLoggeddIn: boolean = false) {
    const body = { username:"supervisor", password:"supervisor" };
    return this.http.post(this.apiUrl,
      body
      ,{    
      responseType: 'text'
     })
     .pipe(
      tap( (tokenString) =>{
        this.#tokenString.set(tokenString);
        
        if(keepLoggeddIn){
          localStorage.setItem('userToken', tokenString);
        }
        this.router.navigate(['/main']);
      }
     )
      ).subscribe();

    }
}