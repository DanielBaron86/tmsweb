import { Routes} from '@angular/router';
import * as path from 'node:path';


export const inventoryRoutes: Routes  =[
  {
    path: 'itasks', loadComponent: () =>  import('../pages/inventory/tasks-list-component/tasks-list-component').then(m => m.TasksListComponent),
  },
  {
    path: 'add_procurement' , loadComponent: () => import('../pages/inventory/procurement-add-component/procurement-add-component').then(m => m.ProcurementAddComponent)
  },
  {
    path: 'add_transfer', loadComponent: () => import('../pages/inventory/transfer-add-component/transfer-add-component').then(m => m.TransferAddComponent)
  }
]

