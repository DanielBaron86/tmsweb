import { Routes} from '@angular/router';

export const reportsRoutes: Routes  =[
  {
    path: "reports", loadComponent: () => import('../pages/reports/reports-component/reports-component').then(m => m.ReportsComponent),
  },

]
