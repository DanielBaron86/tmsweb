import { HttpClient } from '@angular/common/http';
import {computed, inject, Injectable, Signal, signal} from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import {LoginResponse, UserResource} from '../../models/user-models';
import { throwError } from 'rxjs';
import {ConfigService} from '../config/config-service';


@Injectable({
  providedIn: 'root',
})
export class AuthServices {
  readonly config = inject(ConfigService);
  readonly apiUrl = this.config.apiUrl;
  readonly http = inject(HttpClient);
  readonly router = inject(Router);
  readonly #tokenString = signal<string | null>(null);
  readonly #reshTokenString = signal<string | null>(null);
  readonly #userProfile = signal<UserResource>({
    email: '',
    firstName: '',
    lastName: '',
    userTypeId: 0,
    username: '',
    id: 0,
    createdDate: null,
    updatedDate: null,
  });

  keepLoggeddIn= false;
  get tokenString() {
    return this.#tokenString.asReadonly()
  }

  get userProfile() {
    return this.#userProfile.asReadonly()
  }

  isAuthenticated = computed(() => this.#tokenString() !== null);

  logout() {
    this.#tokenString.set(null);
    if(!this.keepLoggeddIn){
      localStorage.removeItem('userToken');
    }
    this.router.navigate(['/login']);
  }

  setToken(token: string){
    this.#tokenString.set(token);
  }

  redirectToLogin() {
      this.router.navigate(['/login']);
  }

  login(username: string, password: string, keepLoggeddIn: boolean = false) {
    this.keepLoggeddIn = keepLoggeddIn;
    const body = { username:username, password:password };
    return this.http.post(`${this.apiUrl}/v1/users/login`,
      body
      )
     .pipe(
      catchError( (error) => {
        return   throwError(() => new Error(error.error.message))
      } )
      ).subscribe( (tokenString) => {
        const response = tokenString as LoginResponse;
        this.setLoginResponce(response)
        this.router.navigate(['/main/add_procurement']);
      });
    }

  refreshToken(){

    let apiURl =`${this.apiUrl}/v1/users/refreshToken`;
    return this.http.post<string>(apiURl,
      {
        oldToken: this.#tokenString(),
        refreshToken: this.#reshTokenString(),
        userId: this.#userProfile()?.id
      },
      {responseType: 'text' as 'json'}
      )
      .pipe(
        catchError( (error) => {
          return   throwError(() => new Error(error.error.message))
        } )
      )
  }

  setLoginResponce(response: LoginResponse){
    this.#tokenString.set(response.token);
    this.#reshTokenString.set(response.refreshToken);
    this.#userProfile.set(response.userProfile);

    if(this.keepLoggeddIn){
      localStorage.setItem('userToken', response.token);
      localStorage.setItem('refreshToken', response.refreshToken);
    }
  }
  }
