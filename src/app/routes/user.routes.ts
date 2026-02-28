import { Routes } from '@angular/router';

export const userRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../pages/users/users-component/users-component').then((m) => m.UsersComponent),
  },
  {
    path: 'profile/:userid',
    loadComponent: () =>
      import('../pages/users/profile-component/profile-component').then((m) => m.ProfileComponent),
  },
  {
    path: `new`,
    loadComponent: () =>
      import('../pages/users/create-users-component/create-users.component').then(
        (m) => m.CreateUsersComponent,
      ),
  },
];
