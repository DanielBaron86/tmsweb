import {computed, inject, Injectable, linkedSignal, signal, WritableSignal} from '@angular/core';
import {HttpClient, httpResource} from '@angular/common/http';
import {ConfigService} from '../config/config-service';
import {LocationCollectionName, LocationUnitModel} from '../../models/location-models';
import DataService from '../data-service';
import {BaseCollectionName, paginatedResult, PaginationHeader, TypesCollectionName} from '../../models/base-model';
import {BehaviorSubject, Observable} from "rxjs";
import {QueryFilters} from '../../models/query-models';
import {BaseItem} from '../../models/goods-models';

@Injectable({
  providedIn: 'root',
})
export class LocationService extends DataService<LocationCollectionName> {
  cachedPages: number[]=[];


  readonly  http = inject(HttpClient);
  readonly config = inject(ConfigService);
  readonly apiUrl = this.config.apiUrl;

  pageNumber =signal<number>(1);
  pageSize =signal<number>(20);
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

  getLocationsWithFilters(queryFilters:QueryFilters){
    const locations= httpResource<LocationUnitModel[]>( () => ({
      url: `${this.apiUrl}/v1/locations/query`,
      method: 'POST',
      body: this.queryFilters(),
    }))
    const header = computed<PaginationHeader>(
      () => locations.hasValue() ? JSON.parse(locations.headers()?.get('X-Pagination') ?? '{}'): {}
    )
    const displayItems = computed(() => {
      const pagedData = locations.value() as LocationUnitModel[];
      if (pagedData) {
        return pagedData;
      }
      return locations.value() ?? [];
    });

    return {header,displayItems}
  }
  queryFilters =signal<QueryFilters>(
    {
      pageNumber: 1,
      pageSize: 100,
      queryFields: []
    }
  )

}
