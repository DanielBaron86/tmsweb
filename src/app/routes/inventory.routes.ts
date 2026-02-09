import { Routes} from '@angular/router';
import DataService from '../services/data-service';
import GoodsTypesService from '../services/goods/goods-types-service';
import {InventoryService} from '../services/inventory/inventory.service';
import {procurementTaskResolver} from '../resolvers/procurement-item-resolver';
import {LocationService} from '../services/location/location-service';


export const inventoryRoutes: Routes  =[
  {
    path: 'tasks', loadComponent: () =>  import('../pages/inventory/tasks-list-component/tasks-list-component').then(m => m.TasksListComponent),
    providers: [
      {provide: DataService, useClass: InventoryService}
    ],
  },
  {
    path: 'view_task/procurement/:id', loadComponent: () => import('../pages/inventory/view-task-procurement/view-task-procurement').then(m => m.ViewTaskProcurement),
    resolve: { task: procurementTaskResolver },
  },
  {
    path: 'view_task/transfer/:id', loadComponent: () => import('../pages/inventory/view-task-transfer/view-task-transfer').then(m => m.ViewTaskTransfer),
  },
  {
    path: 'add_procurement' , loadComponent: () => import('../pages/inventory/procurement-add-component/procurement-add-component').then(m => m.ProcurementAddComponent),
  },
  {
    path: 'add_transfer', loadComponent: () => import('../pages/inventory/transfer-add-component/transfer-add-component').then(m => m.TransferAddComponent)
  }
]

