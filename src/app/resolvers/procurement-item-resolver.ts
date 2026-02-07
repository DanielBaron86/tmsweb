import { ResolveFn,ActivatedRouteSnapshot,RouterStateSnapshot } from "@angular/router";
import { inject } from "@angular/core";
import {InventoryService} from '../services/inventory/inventory.service';
import {toObservable} from '@angular/core/rxjs-interop';
import {filter, first} from 'rxjs';
import {ProcurementsModel} from '../models/tasks-models';

 export const procurementTaskResolver : ResolveFn<ProcurementsModel> = (
     route: ActivatedRouteSnapshot,
     state: RouterStateSnapshot,
 ) => {
     const goodsService = inject(InventoryService)
     const baseId = parseInt(route.paramMap.get('id')!);
     return toObservable(goodsService.getProcurementTaskById(baseId).value).pipe(
     filter(val => val !== undefined),
     first()
   );
 }
