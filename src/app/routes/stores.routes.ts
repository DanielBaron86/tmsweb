import { Routes} from '@angular/router';

export const storesRoutes: Routes  =[
  {
    path: "", loadComponent: () => import('../pages/stores/stores-component/stores-component').then(m => m.StoresComponent),
  },
  {
    path: "carts", loadComponent: () => import('../pages/stores/carts-component/carts-component').then(m => m.CartsComponent),
  },
]
