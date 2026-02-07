import { Routes} from '@angular/router';

export const clientsRoutes: Routes  =[
  {
    path: "", loadComponent: () => import('../pages/clients/clients-component/clients-component').then(m => m.ClientsComponent),
  },
]
