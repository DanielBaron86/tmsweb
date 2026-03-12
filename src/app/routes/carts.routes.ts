import { Routes } from '@angular/router';
export const cartsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../pages/stores/carts-component/carts-component').then((m) => m.CartsComponent),
  },
  {
    path: ':cartId/view',
    loadComponent: () =>
      import('../pages/stores/single-cart-component/single-cart-component').then(
        (m) => m.SingleCartComponent,
      ),
  },
];
