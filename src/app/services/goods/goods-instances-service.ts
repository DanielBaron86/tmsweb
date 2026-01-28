import {inject, Injectable, signal} from '@angular/core';
import {GoodsModels, GoodsTypesModel} from '../../models/goods-models';
import {HttpClient, httpResource} from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export default class GoodsInstancesService {

  http = inject(HttpClient);
  readonly apiUrl = 'https://tmsapi.danielsplaygrounds.com/api';

  get itemList(){
    return this.#itemList.asReadonly()
  }
  readonly #itemList = httpResource<GoodsModels[]>(() => ({
    params: {
      pageNumber: 1,
      pageSize: 10
    },
    url: `${this.apiUrl}/v1/goods`,
    method: 'GET',
    defaultValue: signal<GoodsModels[]>([])
  }));
}
