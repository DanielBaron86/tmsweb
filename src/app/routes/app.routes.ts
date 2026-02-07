import { Routes } from '@angular/router';
import { CanActivateAuthGuard } from '../components/auth/guards/can-activate';
import {goodsRoutes} from './goods.routes';
import {userRoutes} from './user.routes';
import {inventoryRoutes} from './inventory.routes';
import {locationRoutes} from './location.routes';
import {clientsRoutes} from './clients.routes';
import { tasksRoutes} from './tasks.routes';
import {storesRoutes} from './stores.routes';
import {reportsRoutes} from './reports.routes';


export const routes: Routes = [
   {
      path: '', redirectTo: '/login', pathMatch: 'full'
   },
   {
    path: 'login', loadComponent: () => import('../components/auth/sign-in-component/sign-in-component').then(m => m.SignInComponent),
   },
   {
      path: 'users', loadComponent: () => import('../components/main-page/main-page').then(m => m.MainPage),
      canActivate: [CanActivateAuthGuard],
     children: [
       ...userRoutes
     ]
   },
  {
    path: 'inventory', loadComponent: () => import('../components/main-page/main-page').then(m => m.MainPage),
    canActivate: [CanActivateAuthGuard],
    children: [
      ...inventoryRoutes,
    ]
  },
  {
    path: 'locations', loadComponent: () => import('../components/main-page/main-page').then(m => m.MainPage),
    canActivate: [CanActivateAuthGuard],
    children: [
      ...locationRoutes,
    ]
  },
  {
    path: 'clients', loadComponent: () => import('../components/main-page/main-page').then(m => m.MainPage),
    canActivate: [CanActivateAuthGuard],
    children: [
      ...clientsRoutes,
    ]
  },
  {
    path: 'tasks', loadComponent: () => import('../components/main-page/main-page').then(m => m.MainPage),
    canActivate: [CanActivateAuthGuard],
    children: [
      ...tasksRoutes,
    ]
  },
  {
    path: 'stores', loadComponent: () => import('../components/main-page/main-page').then(m => m.MainPage),
    canActivate: [CanActivateAuthGuard],
    children: [
      ...storesRoutes,
    ]
  },
  {
    path: 'reports', loadComponent: () => import('../components/main-page/main-page').then(m => m.MainPage),
    canActivate: [CanActivateAuthGuard],
    children: [
      ...reportsRoutes,
    ]
  },
  {
    path: 'goods', loadComponent: () => import('../components/main-page/main-page').then(m => m.MainPage),
    canActivate: [CanActivateAuthGuard],
    children: [
      ...goodsRoutes,
    ]
  },
  {
    path: '404', loadComponent: () => import('../pages/page404/page404').then(m => m.Page404),
  },
  {
    path: '**', redirectTo: '/404'
  },
];
