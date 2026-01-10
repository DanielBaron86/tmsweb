import { Routes } from '@angular/router';

export const routes: Routes = [
   {
    path: 'login', loadComponent: () => import('./components/auth/sign-in-component/sign-in-component').then(m => m.SignInComponent),
   },
   {
      path: 'main', loadComponent: () => import('./components/main-page/main-page').then(m => m.MainPage),
   },
   { path: '',   redirectTo: '/login', pathMatch: 'full' }
];
