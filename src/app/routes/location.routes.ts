import { Routes} from '@angular/router';

export const locationRoutes: Routes  =[
  {
    path: "types", loadComponent: () => import('../pages/locations/location-types-component/location-types-component').then(m => m.LocationTypesComponent),
  },
  {
    path: "list", loadComponent: () => import('../pages/locations/locations-component/locations-component').then(m => m.LocationsComponent),
  },
]
