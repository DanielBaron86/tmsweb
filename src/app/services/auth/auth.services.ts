import { HttpClient, httpResource } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { LoginResponse } from '../../models/user-models';
import e from 'express';


@Injectable({
  providedIn: 'root',
})
export class AuthServices {


  private http = inject(HttpClient);
  private router = inject(Router);

  readonly apiUrl = 'https://tmsapi.danielsplaygrounds.com/api/v1/users/login';
  readonly #tokenString = signal<string | null>('');
  keepLoggeddIn= false;
  readonly tokenString = this.#tokenString.asReadonly();

  isAuthenticated = computed(() => this.#tokenString() !== null);

  logout() {
    this.#tokenString.set(null);
    if(!this.keepLoggeddIn){
      localStorage.removeItem('userToken');
    }
    this.router.navigate(['/login']);
  }

  redirectToLogin() {
      this.router.navigate(['/login']);
  }

  login(username: string, password: string, keepLoggeddIn: boolean = false) {
    this.keepLoggeddIn = keepLoggeddIn;
    const body = { username:username, password:password };
    return this.http.post(this.apiUrl,
      body
      )
     .pipe(
      tap( (tokenString) =>{
        const response = tokenString as LoginResponse;
        console.log('response.Token',response.token);
        this.#tokenString.set(response.token);

        if(keepLoggeddIn){
          localStorage.setItem('userToken', response.token);
        }
        this.router.navigate(['/main']);
      }
     )
      ).subscribe();

    }
  }
