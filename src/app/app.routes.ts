import { Routes } from '@angular/router';

export const routes: Routes = [
   {
      path: '', loadComponent: () => import('./components/main-page/main-page').then(m => m.MainPage),
   },
   {
      path: 'main', loadComponent: () => import('./components/main-page/main-page').then(m => m.MainPage),
   },
   {
    path: 'login', loadComponent: () => import('./components/auth/sign-in-component/sign-in-component').then(m => m.SignInComponent),
   },
   {
    path: 'users', loadComponent: () => import('./pages/users-component/users-component').then(m => m.UsersComponent),
    children: [
      {
         path: 'profile', loadComponent: () => import('./pages/profile-component/profile-component').then(m => m.ProfileComponent),
      }
    ]
   }

   
   
   
];
