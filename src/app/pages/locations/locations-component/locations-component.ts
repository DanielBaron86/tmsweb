import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ButtonComponent } from '../../../components/ui/button-component/button-component';
import { DatePipe } from '@angular/common';
import { EnumToStringPipe } from '../../../pipes/enum-to-string-pipe';
import { PaginationComponent } from '../../../components/shared/pagination-component/pagination-component';
import { SpinnerComponent } from '../../../components/ui/spinner-component/spinner-component';
import GenericDataService from '../../../services/data-service';
import { LocationService } from '../../../services/location/location-service';
import { LocationTypesList } from '../../../models/status-enums';
import { CreateLocationUnitModel, LocationUnitModel } from '../../../models/location-models';
import { Router } from '@angular/router';
import { EditLocation } from '../../../components/locations/edit-location/edit-location';

@Component({
  selector: 'app-locations-component',
  imports: [
    ButtonComponent,
    DatePipe,
    EnumToStringPipe,
    PaginationComponent,
    SpinnerComponent,
    EditLocation,
  ],

  templateUrl: './locations-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationsComponent {
  readonly dataService = inject(GenericDataService) as unknown as LocationService;
  readonly router = inject(Router);
  showEditLocation = signal<boolean>(false);
  selectLocation = signal<LocationUnitModel | null>(null);
  headerInfo = this.dataService.header;
  pageNumbers = computed(() =>
    Array.from({ length: this.headerInfo().TotalPageCount }, (_, i) => i + 1),
  );

  protected Export() {
    /* empty */
  }

  protected readonly LocationTypesList = LocationTypesList;

  protected RefreshList() {
    this.dataService.refresh();
  }

  protected NewLocation() {
    this.showEditLocation.set(true);
    this.selectLocation.set(null);
  }

  protected onSearchInput($event: Event) {}

  protected Edit(instanceLocation: LocationUnitModel) {
    this.showEditLocation.set(true);
    this.selectLocation.set(instanceLocation);
  }

  protected SaveLocation($event: CreateLocationUnitModel | null) {
    this.showEditLocation.set(false);
    if ($event == null) {
      return;
    }
    const request =
      $event.id == 0
        ? this.dataService.createNewLocation($event)
        : this.dataService.updateLocationItem($event);
    return request.subscribe(() => this.dataService.refresh());
  }
}
