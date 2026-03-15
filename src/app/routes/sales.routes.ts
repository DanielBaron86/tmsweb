import { Routes } from '@angular/router';

export const salesRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../pages/stores/sales-component/sales-component').then((m) => m.SalesComponent),
  },
];
