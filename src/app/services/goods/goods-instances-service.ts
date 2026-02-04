import {inject, Injectable, signal} from '@angular/core';
import {GoodsModels, GoodsTypesModel, v_GoodsTypesInstances} from '../../models/goods-models';
import {HttpClient, httpResource} from '@angular/common/http';
import {ConfigService} from '../config/config-service';


@Injectable({
  providedIn: 'root',
})
export default class GoodsInstancesService {

  http = inject(HttpClient);
  readonly config = inject(ConfigService);
  readonly apiUrl = this.config.apiUrl;

  get itemList(){
    return this.#itemList.asReadonly()
  }
  readonly #itemList = httpResource<v_GoodsTypesInstances[]>(() => ({
    params: {
      pageNumber: 1,
      pageSize: 10
    },
    url: `${this.apiUrl}/v1/goods_instance/view`,
    method: 'GET',
    defaultValue: signal<GoodsModels[]>([])
  }));
}
