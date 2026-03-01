import { Routes } from '@angular/router';
import { LocationService } from '../services/location/location-service';
import DataService from '../services/data-service';
import { LocationTypesService } from '../services/location/location-types-service';

export const locationRoutes: Routes = [
  {
    path: 'types',
    loadComponent: () =>
      import('../pages/locations/location-types-component/location-types-component').then(
        (m) => m.LocationTypesComponent,
      ),
    providers: [{ provide: DataService, useClass: LocationTypesService }],
  },
  {
    path: 'list',
    loadComponent: () =>
      import('../pages/locations/locations-component/locations-component').then(
        (m) => m.LocationsComponent,
      ),
    providers: [{ provide: DataService, useClass: LocationService }],
  },
];
