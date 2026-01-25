import { Routes} from '@angular/router';


export const inventoryRoutes: Routes  =[
  {
    path: 'itasks', loadComponent: () =>  import('../pages/inventory/tasks-list-component/tasks-list-component').then(m => m.TasksListComponent),
  }
]

