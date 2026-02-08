import {inject, Injectable, linkedSignal, signal, WritableSignal} from '@angular/core';
import {GoodsModels, GoodsTypesModel, v_GoodsTypesInstances} from '../../models/goods-models';
import {HttpClient, httpResource} from '@angular/common/http';
import {ConfigService} from '../config/config-service';
import {
  ItemInstanceCollectionName,
  paginatedResult,
} from '../../models/base-model';
import DataService from '../data-service';
import {BehaviorSubject, Observable} from "rxjs";


@Injectable({
  providedIn: 'root',
})
export default class GoodsInstancesService extends DataService<ItemInstanceCollectionName> {
  stupid: BehaviorSubject<number> = new BehaviorSubject(0);

  updateItem(item: any): Observable<any> {
      throw new Error("Method not implemented.");
  }
   createItem(item: any): Observable<any> {
      throw new Error("Method not implemented.");
  }
  activePage = signal(1);

  http = inject(HttpClient);
  readonly config = inject(ConfigService);
  readonly apiUrl = this.config.apiUrl;

  itemTypes(){
    return !!this.#itemList.hasValue();
  }

  cachedPages = signal<number[]>([1]);
  #cahedItems : ItemInstanceCollectionName[] =[];
  clearCache(){
    this.#cahedItems=[];
  }

  getCollectionList() {
    return   linkedSignal({
      source: () => this.#itemList.value(),
      computation: () => {
        if (this.#itemList.hasValue()) {
          const headers = JSON.parse(this.#itemList.headers()?.get('X-Pagination') ?? '{}');
          this.#cahedItems[this.pageNumber()]={pageNumber : this.pageNumber(),collectionName : this.#itemList.value()}
          const returnedObject: paginatedResult<ItemInstanceCollectionName[]> = {
            result:  this.#cahedItems,
            paginationHeader: headers
          }

          return returnedObject;
        } else {
          const returnedObject: paginatedResult<ItemInstanceCollectionName[]> = {
            result: [{pageNumber : 0,collectionName : []}],
            paginationHeader: {
              TotalItemCount: 0,
              TotalPageCount: 0,
              PageSize: 0,
              CurrentPage:0
            }
          }
          return returnedObject;
        }
      }
    })
  }

  readonly #itemList = httpResource<v_GoodsTypesInstances[]>(() => ({
    params: {
      pageNumber: this.pageNumber(),
      pageSize: this.pageSize(),
    },
    url: `${this.apiUrl}/v1/goods_instance/view`,
    method: 'GET',
    defaultValue: signal<GoodsModels[]>([])
  }));

  pageNumber =signal<number>(1);
  pageSize =signal<number>(20);
}
