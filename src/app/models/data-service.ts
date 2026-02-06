import {WritableSignal} from '@angular/core';
import {paginatedResult} from './base-model';

export default interface DataService {
  pageNumber: WritableSignal<number>
  pageSize: WritableSignal<number>
  cachedPages: WritableSignal<number[]>

  getCollectionList(): WritableSignal<paginatedResult<any[]>>
}

