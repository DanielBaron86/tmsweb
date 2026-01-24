import {inject, Injectable, signal} from '@angular/core';
import {BaseItem, GoodsModels, GoodsTypesModel} from '../../models/goods-models';
import {HttpClient, httpResource} from '@angular/common/http';
import {AuthServices} from '../auth/auth.services';

@Injectable({
  providedIn: 'root',
})
class GoodsService {

  http = inject(HttpClient);
  AuthServices= inject(AuthServices);
  /*readonly apiUrl = 'https://tmsapi.danielsplaygrounds.com/api';*/
  readonly apiUrl = 'https://tmsapi.danielsplaygrounds.com/api';

  get goodstypes(){
    return this.#goodstypes.asReadonly()
  }

  get baseTypes(){
    return this.#baseTypes.asReadonly()
  }

  get itemList(){
    return this.#itemList.asReadonly()
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

  readonly #baseTypes = httpResource<BaseItem[]>(() => ({
    params: {
      pageNumber: 1,
      pageSize: 10
    },
    url: `${this.apiUrl}/v1/goods/base_goods`,
    method: 'GET',
    defaultValue: signal<BaseItem[]>([])
  }));


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

export default GoodsService
