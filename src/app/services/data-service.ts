import {WritableSignal} from '@angular/core';
import { paginatedResult} from '../models/base-model';
import {Observable} from 'rxjs';

export default abstract class DataService {
  abstract itemTypes(): any;
  abstract getCollectionList(): WritableSignal<paginatedResult<any[]>>
  abstract cachedPages: WritableSignal<number[]>
  abstract pageNumber: WritableSignal<number>
  abstract updateItem(item: any): Observable<any>
  abstract createItem(item: any): Observable<any>
  abstract activePage : WritableSignal<number>

}
