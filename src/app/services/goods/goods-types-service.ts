import {inject, Injectable, linkedSignal, signal, WritableSignal} from '@angular/core';
import { GoodsTypesModel} from '../../models/goods-models';
import {HttpClient, httpResource} from '@angular/common/http';
import {ConfigService} from '../config/config-service';
import { paginatedResult, TypesCollectionName} from '../../models/base-model';
import DataService from '../data-service';
import {BehaviorSubject, Observable} from "rxjs";


@Injectable({
  providedIn: 'root',
})
export default class GoodsTypesService extends DataService<TypesCollectionName> {
  stupid: BehaviorSubject<number> = new BehaviorSubject(0);
  testCaheP: number[]=[];
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

  cachedPages: number[]=[];
  #cahedItems : TypesCollectionName[] =[];
  clearCache(){
    this.#cahedItems=[];
  }

  getCollectionList() {
    return   linkedSignal({
      source: () => this.#goodstypes.value(),
      computation: () => {
        if (this.#goodstypes.hasValue()) {
          const headers = JSON.parse(this.#goodstypes.headers()?.get('X-Pagination') ?? '{}');
          this.#cahedItems[this.pageNumber()]={pageNumber : this.pageNumber(),collectionName : this.#goodstypes.value()}
          const returnedObject: paginatedResult<TypesCollectionName[]> = {
            result:  this.#cahedItems,
            paginationHeader: headers
          }

          return returnedObject;
        } else {
          const returnedObject: paginatedResult<TypesCollectionName[]> = {
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




  itemTypes(){
    return !!this.#goodstypes.hasValue();
  }

  readonly #goodstypes = httpResource<GoodsTypesModel[]>(() => ({
    params: {
      pageNumber: this.pageNumber(),
      pageSize: this.pageSize()
    },
    url: `${this.apiUrl}/v1/goods_type`,
    method: 'GET',
    defaultValue:  signal<GoodsTypesModel[]>([])
  }));

  pageNumber =signal<number>(1);
  pageSize =signal<number>(20);
}
