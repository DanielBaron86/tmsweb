import {inject, Injectable, signal} from '@angular/core';
import {GoodsTypesModel} from '../../models/goods-models';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {AuthServices} from '../auth/auth.services';

@Injectable({
  providedIn: 'root',
})
export class GoodsService {

  http = inject(HttpClient);
  AuthServices= inject(AuthServices);

  readonly #goodstypes = signal<GoodsTypesModel[]>([]);
  goodstypesList = this.#goodstypes.asReadonly();

  getGoodTypes() {
    return this.http.get<GoodsTypesModel[]>('https://tmsapi.danielsplaygrounds.com/api/v1/goods/goodtypes',{
      headers: {'Authorization': 'Bearer ' + this.AuthServices.tokenString()}
    })
      .pipe(tap( goodstypes =>
          {
            console.log(goodstypes);
            this.#goodstypes.set(goodstypes)
          }
        )
      ).subscribe();
  }
}
