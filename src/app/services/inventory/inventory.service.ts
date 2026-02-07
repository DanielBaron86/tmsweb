import {inject, Injectable, linkedSignal, signal, WritableSignal} from '@angular/core';
import {HttpClient, httpResource} from '@angular/common/http';
import {TaskModels} from '../../models/tasks-models';
import {ConfigService} from '../config/config-service';
import {CreateProcurement} from '../../models/inventory-model';
import {catchError} from 'rxjs/operators';
import DataService from '../data-service';
import {BaseCollectionName, paginatedResult, TaskModelsCollectionName} from '../../models/base-model';
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root',
})
export class InventoryService extends DataService<TaskModelsCollectionName> {

  readonly http = inject(HttpClient);
  readonly config = inject(ConfigService);
  readonly apiUrl = this.config.apiUrl;
  pageNumber =signal<number>(1);
  pageSize =signal<number>(20);
  activePage = signal(1);
  #cahedItems : TaskModelsCollectionName[] =[];
  itemTypes() {
    return !!this.#taskList.hasValue();
  }
  cachedPages = signal<number[]>([1]);
  clearCache(){
    this.#cahedItems=[];
    this.#taskList.reload();
  }
  override updateItem(item: any): Observable<any> {
      throw new Error("Method not implemented.");
  }
  override createItem(item: any): Observable<any> {
      throw new Error("Method not implemented.");
  }




  getCollectionList() {
    return   linkedSignal({
      source: () => this.#taskList.value(),
      computation: () => {
        if (this.#taskList.hasValue()) {
          const headers = JSON.parse(this.#taskList.headers()?.get('X-Pagination') ?? '{}');
          this.#cahedItems[this.pageNumber()]={pageNumber : this.pageNumber(),collectionName : this.#taskList.value()}
          const returnedObject: paginatedResult<TaskModelsCollectionName[]> = {
            result:  this.#cahedItems,
            paginationHeader: headers
          }

          return returnedObject;
        } else {
          const returnedObject: paginatedResult<TaskModelsCollectionName[]> = {
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

  #taskList = httpResource<TaskModels[]>( () => ({
    url: `${this.apiUrl}/v1/tasks`,
    params: {
      pageNumber: this.pageNumber(),
      pageSize: this.pageSize(),
    },
    method: 'GET',
    defaultValue:signal<TaskModels[]>([])
  }))

  createProcurementTask(task : CreateProcurement){
    return this.http.post(`${this.apiUrl}/v1/tasks/procurement`,task).pipe(
      catchError((error) => {
        console.error('Error creating procurement task:', error);
        throw error;
      })
    );
  }

}
