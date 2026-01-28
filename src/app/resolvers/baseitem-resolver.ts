import { ResolveFn,ActivatedRouteSnapshot,RouterStateSnapshot } from "@angular/router";
import { BaseItem } from "../models/goods-models";
import { inject } from "@angular/core";
import BaseItemsService from '../services/goods/base-items-service';

// export const BaseItemResolver : ResolveFn<BaseItem> = (
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot,
// ) => {
//     const goodsService = inject(BaseItemsService)
//     const baseId = parseInt(route.paramMap.get('id')!);
//     return goodsService.baseItemById(baseId)
// }
