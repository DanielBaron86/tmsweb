// import {computed, Directive, effect, ElementRef, inject, Signal} from '@angular/core';
// import DataService from '../../services/data-service';
// import {LocationStrategy} from '@angular/common';
// import {paginatedResult} from '../../models/base-model';
//
// @Directive()
// export abstract class BaseDataComponent<S extends DataService, T> {
//   protected readonly dataService = inject(DataService) as S;
//   protected readonly location = inject(LocationStrategy);
//   abstract tableList: Signal<readonly ElementRef<HTMLTableRowElement>[]>;
//
//   // Shared state derived from the service
//   // Use a computed so it updates automatically when getCollectionList changes
//   abstract list: Signal<paginatedResult<T[]>>;
//
//   pageNumbers = computed(() => {
//     const total = this.list().paginationHeader?.TotalPageCount || 0;
//     return Array.from({ length: total }, (_, i) => i + 1);
//   });
//
//   protected applyFilter(filterValue: string, matcher: (item: T) => boolean) {
//     const search = filterValue.toLowerCase();
//     const currentPageItems = this.list().result[this.dataService.activePage()]?.collectionName || [];
//
//     currentPageItems.forEach((item, index) => {
//       const isMatch = matcher(item);
//       const row = this.tableList()[index];
//       if (row) {
//         row.nativeElement.hidden = !isMatch;
//       }
//     });
//   }
//
//   // Abstract property for the URL path so each component defines its own
//   protected abstract readonly routePath: string;
//
//   constructor() {
//     // Shared URL synchronization logic
//     effect(() => {
//       const active = this.dataService.activePage();
//       const size = this.list().paginationHeader?.PageSize || 20;
//       this.location.replaceState(null, '', this.routePath, `pageNumber=${active}&pageSize=${size}`);
//     });
//   }
// }
