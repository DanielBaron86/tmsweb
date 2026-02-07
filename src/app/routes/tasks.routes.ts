import { Routes} from '@angular/router';

export const tasksRoutes: Routes  =[
  {
    path: "users", loadComponent: () => import('../pages/users/users-component/users-component').then(m => m.UsersComponent),
  },
]
