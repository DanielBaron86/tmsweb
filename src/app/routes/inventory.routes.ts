import {Route} from '@angular/router';
import {CanActivateAuthGuard} from '../components/auth/guards/can-activate';

export const inventoryRoutes: Route  =
  {
    path: 'itasks', loadComponent: () =>  import('../pages/inventory/tasks-list-component/tasks-list-component').then(m => m.TasksListComponent),
    canActivate: [CanActivateAuthGuard]
  }
