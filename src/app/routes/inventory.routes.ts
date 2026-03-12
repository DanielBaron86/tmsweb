import { Routes } from '@angular/router';
import GenericDataService from '../services/data-service';
import { InventoryService } from '../services/inventory/inventory.service';

export const inventoryRoutes: Routes = [
  {
    path: 'tasks',
    loadComponent: () =>
      import('../pages/inventory/tasks-list-component/tasks-list-component').then(
        (m) => m.TasksListComponent,
      ),
    providers: [{ provide: GenericDataService, useClass: InventoryService }],
  },
  {
    path: 'view_task/procurement/:id',
    loadComponent: () =>
      import('../pages/inventory/view-task-procurement/view-task-procurement').then(
        (m) => m.ViewTaskProcurement,
      ),
  },
  {
    path: 'view_task/transfer/:id',
    loadComponent: () =>
      import('../pages/inventory/view-task-transfer/view-task-transfer').then(
        (m) => m.ViewTaskTransfer,
      ),
  },
  {
    path: 'add_procurement',
    loadComponent: () =>
      import('../pages/inventory/procurement-add-component/procurement-add-component').then(
        (m) => m.ProcurementAddComponent,
      ),
  },
  {
    path: 'add_transfer',
    loadComponent: () =>
      import('../pages/inventory/transfer-add-component/transfer-add-component').then(
        (m) => m.TransferAddComponent,
      ),
  },
];
