import { Routes} from '@angular/router';

export const goodsRoutes: Routes = [
  {
    path: "good_types", loadComponent: () => import('../pages/goods/good-types/good-types').then(m => m.GoodTypes),
  },
  {
    path: "base_types",loadComponent: () => import('../pages/goods/base-types/base-types-component').then(m => m.BaseTypesComponent),
    children: [
      {path: 'edit/:baseId',loadComponent: () => import('../components/goods/base/edit-add-base-component/edit-add-base-component').then(m => m.EditAddBaseComponent)},
      {path: 'add',loadComponent: () => import('../components/goods/base/edit-add-base-component/edit-add-base-component').then(m => m.EditAddBaseComponent)}
    ]
  },
  {
    path: "item_list",loadComponent: () => import('../pages/goods/goods-instances/goods-instances').then(m => m.GoodsInstances),
  }
]
