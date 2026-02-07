import { Routes} from '@angular/router';

export const storesRoutes: Routes  =[
  {
    path: "stores", loadComponent: () => import('../pages/stores/stores-component/stores-component').then(m => m.StoresComponent),
  },
  {
    path: "stores_carts", loadComponent: () => import('../pages/stores/carts-component/carts-component').then(m => m.CartsComponent),
  },
]
