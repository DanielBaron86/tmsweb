import { Routes} from '@angular/router';
import DataService from '../services/data-service';
import BaseItemsService from '../services/goods/base-items-service';
import GoodsTypesService from '../services/goods/goods-types-service';
import GoodsInstancesService from '../services/goods/goods-instances-service';

export const goodsRoutes: Routes = [
  {
    path: "good_types", loadComponent: () => import('../pages/goods/good-types/good-types').then(m => m.GoodTypes),
    providers: [{provide: DataService, useClass: GoodsTypesService}]
  },
  {
    path: "base_types",loadComponent: () => import('../pages/goods/base-types/base-types-component').then(m => m.BaseTypesComponent),
    providers: [{ provide: DataService, useClass: BaseItemsService }]
  },
  {
    path: "item_list",loadComponent: () => import('../pages/goods/goods-instances/goods-instances').then(m => m.GoodsInstances),
    providers: [{ provide: DataService, useClass: GoodsInstancesService }]
  }
]
