import {inject, Injectable, linkedSignal, signal, WritableSignal} from '@angular/core';
import {HttpClient, httpResource} from '@angular/common/http';
import {ConfigService} from '../config/config-service';
import {LocationCollectionName, LocationUnitModel} from '../../models/location-models';
import DataService from '../data-service';
import {BaseCollectionName, paginatedResult, TypesCollectionName} from '../../models/base-model';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class LocationService extends DataService<LocationCollectionName> {

  readonly  http = inject(HttpClient);
  readonly config = inject(ConfigService);
  readonly apiUrl = this.config.apiUrl;

  pageNumber =signal<number>(1);
  pageSize =signal<number>(20);
  cachedPages = signal<number[]>([1]);
  activePage = signal(1);
  #cahedItems : LocationCollectionName[] =[];

  itemTypes(){
    return !!this.#location.hasValue();
  }


  getCollectionList() {
    return   linkedSignal({
      source: () => this.#location.value(),
      computation: () => {
        if (this.#location.hasValue()) {
          const headers = JSON.parse(this.#location.headers()?.get('X-Pagination') ?? '{}');
          this.#cahedItems[this.pageNumber()]={pageNumber : this.pageNumber(),collectionName : this.#location.value()}
          const returnedObject: paginatedResult<LocationCollectionName[]> = {
            result:  this.#cahedItems,
            paginationHeader: headers
          }

          return returnedObject;
        } else {
          const returnedObject: paginatedResult<LocationCollectionName[]> = {
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


  override updateItem(item: any): Observable<any> {
      throw new Error("Method not implemented.");
  }
  override createItem(item: any): Observable<any> {
      throw new Error("Method not implemented.");
  }



  get locations(){
    return this.#location.asReadonly()
  }

  #location = httpResource<LocationUnitModel[]>(() => ({
    url: `${this.apiUrl}/v1/locations`,
    method: 'GET',
    defaultValue: signal<Location[]>([])
  }));
}
