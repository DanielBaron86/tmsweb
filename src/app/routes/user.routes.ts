import { Routes} from '@angular/router';

export const userRoutes: Routes  =[
  {
    path: "", loadComponent: () => import('../pages/users/users-component/users-component').then(m => m.UsersComponent),
  },
  {
    path: "profile", loadComponent: () => import('../pages/users/profile-component/profile-component').then(m => m.ProfileComponent),
  },
]
