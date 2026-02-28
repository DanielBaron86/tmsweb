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
    path: `:userid`,
    loadComponent: () =>
      import('../pages/users/edit-users-component/edit-users-component').then(
        (m) => m.EditUsersComponent,
      ),
  },
];
