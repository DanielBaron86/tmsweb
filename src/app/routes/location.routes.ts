import { Routes} from '@angular/router';

export const locationRoutes: Routes  =[
  {
    path: "locations_types", loadComponent: () => import('../pages/locations/location-types-component/location-types-component').then(m => m.LocationTypesComponent),
  },
  {
    path: "locations_list", loadComponent: () => import('../pages/locations/locations-component/locations-component').then(m => m.LocationsComponent),
  },
]
