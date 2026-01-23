import {inject, Injectable, signal} from '@angular/core';
import {GoodsTypesModel} from '../../models/goods-models';
import {HttpClient} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {AuthServices} from '../auth/auth.services';
import { error } from 'console';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GoodsService {

  http = inject(HttpClient);
  AuthServices= inject(AuthServices);

  readonly #goodstypes = signal<GoodsTypesModel[]>([]);
  get goodstypesList(){
    return this.#goodstypes.asReadonly();
  } 

  getGoodTypes() {
    return this.http.get<GoodsTypesModel[]>('https://tmsapi.danielsplaygrounds.com/api/v1/goods/goodtypes',{
      headers: {'Authorization': 'Bearer ' + this.AuthServices.tokenString()}
    })
      .pipe(
        catchError( (error) => {
          return throwError(error)
        } )
      ).subscribe(
        (goodstypes) => {
        this.#goodstypes.set(goodstypes)
        }
      );
  }
}
