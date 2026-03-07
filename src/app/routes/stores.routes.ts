import { Routes } from '@angular/router';

export const storesRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../pages/stores/stores-component/stores-component').then((m) => m.StoresComponent),
  },
  {
    path: 'view_register',
    loadComponent: () =>
      import('../pages/stores/view-register-component/view-register-component').then(
        (m) => m.ViewRegisterComponent,
      ),
  },
  {
    path: 'carts',
    loadComponent: () =>
      import('../pages/stores/carts-component/carts-component').then((m) => m.CartsComponent),
  },
];
