import {inject, Injectable, signal} from '@angular/core';
import {GoodsModels, GoodsTypesModel} from '../../models/goods-models';
import {HttpClient, httpResource} from '@angular/common/http';
import {ConfigService} from '../config/config-service';


@Injectable({
  providedIn: 'root',
})
export default class GoodsTypesService {

  http = inject(HttpClient);
  readonly config = inject(ConfigService);
  readonly apiUrl = this.config.apiUrl;

  get goodstypes(){
    return this.#goodstypes.asReadonly()
  }

  readonly #goodstypes = httpResource<GoodsTypesModel[]>(() => ({
    params: {
      pageNumber: 1,
      pageSize: 10
    },
    url: `${this.apiUrl}/v1/goods_type`,
    method: 'GET',
    defaultValue:  signal<GoodsTypesModel[]>([])
  }));
}
