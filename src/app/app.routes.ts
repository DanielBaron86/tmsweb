import { Routes } from '@angular/router';
import { CanActivateAuthGuard } from './components/auth/guards/can-activate';

export const routes: Routes = [
   {
      path: '', redirectTo: '/login', pathMatch: 'full'
   },
   {
    path: 'login', loadComponent: () => import('./components/auth/sign-in-component/sign-in-component').then(m => m.SignInComponent),
   },
   {
      path: 'main', loadComponent: () => import('./components/main-page/main-page').then(m => m.MainPage),
      canActivate: [CanActivateAuthGuard],
   },
   {
    path: 'users', loadComponent: () =>  import('./components/main-page/main-page').then(m => m.MainPage),
    canActivate: [CanActivateAuthGuard],
    children: [
      {
         path: 'profile', loadComponent: () => import('./pages/user/profile-component/profile-component').then(m => m.ProfileComponent),
      }
    ]
   },
   {
    path: 'goods', loadComponent: () =>  import('./components/main-page/main-page').then(m => m.MainPage),
    canActivate: [CanActivateAuthGuard],
     children: [
       {
         path: "good_types", loadComponent: () => import('./pages/goods/good-types/good-types').then(m => m.GoodTypes),
       },
       {
         path: "good_types/add",loadComponent: () => import('./pages/goods/good-types/good-types').then(m => m.GoodTypes),
       }
     ]
   },
   {
      path: '404', loadComponent: () => import('./pages/page404/page404').then(m => m.Page404),
   },
   {
      path: '**', redirectTo: '/404'
   },
];
