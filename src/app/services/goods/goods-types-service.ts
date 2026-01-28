import {inject, Injectable, signal} from '@angular/core';
import {GoodsModels, GoodsTypesModel} from '../../models/goods-models';
import {HttpClient, httpResource} from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export default class GoodsTypesService {

  http = inject(HttpClient);
  readonly apiUrl = 'https://tmsapi.danielsplaygrounds.com/api';

  get goodstypes(){
    return this.#goodstypes.asReadonly()
  }

  readonly #goodstypes = httpResource<GoodsTypesModel[]>(() => ({
    params: {
      pageNumber: 1,
      pageSize: 10
    },
    url: `${this.apiUrl}/v1/goods/goodtypes`,
    method: 'GET',
    defaultValue:  signal<GoodsTypesModel[]>([])
  }));
}
