import { Routes} from '@angular/router';
import { BaseItemResolver } from '../resolvers/baseitem-resolver';

export const goodsRoutes: Routes = [
  {
    path: "good_types", loadComponent: () => import('../pages/goods/good-types/good-types').then(m => m.GoodTypes),
  },
  {
    path: "base_types",loadComponent: () => import('../pages/goods/base-types/base-types-component').then(m => m.BaseTypesComponent),
  },
  {
    path: "item_list",loadComponent: () => import('../pages/goods/goods-instances/goods-instances').then(m => m.GoodsInstances),
  }
]
