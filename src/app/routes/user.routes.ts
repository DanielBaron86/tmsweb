import {Route} from '@angular/router';
import {CanActivateAuthGuard} from '../components/auth/guards/can-activate';

export const userRoutes: Route  =
  {
    path: 'goods', loadComponent: () =>  import('../components/main-page/main-page').then(m => m.MainPage),
    canActivate: [CanActivateAuthGuard],
    children: [
      {
        path: "good_types", loadComponent: () => import('../pages/goods/good-types/good-types').then(m => m.GoodTypes),
      },
      {
        path: "base_types",loadComponent: () => import('../pages/goods/base-types-component/base-types-component').then(m => m.BaseTypesComponent),
      },
      {
        path: "item_list",loadComponent: () => import('../pages/goods/goods-instances/goods-instances').then(m => m.GoodsInstances),
      }
    ]
  }
