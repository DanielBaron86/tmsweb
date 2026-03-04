import { Routes } from '@angular/router';

export const clientsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../pages/clients/clients-component/clients-component').then(
        (m) => m.ClientsComponent,
      ),
  },
  {
    path: 'profile/:userid',
    loadComponent: () =>
      import('../pages/clients/clients-profile/clients-profile').then((m) => m.ClientsProfile),
  },
  {
    path: `new`,
    loadComponent: () => import('../pages/clients/clients-create/clients-create').then((m) => m.ClientsCreate),
  },
];
