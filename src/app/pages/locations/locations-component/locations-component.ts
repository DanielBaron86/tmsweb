import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ButtonComponent } from '../../../components/ui/button-component/button-component';
import { DatePipe } from '@angular/common';
import { EnumToStringPipe } from '../../../pipes/enum-to-string-pipe';
import { PaginationComponent } from '../../../components/shared/pagination-component/pagination-component';
import { SpinnerComponent } from '../../../components/ui/spinner-component/spinner-component';
import DataService from '../../../services/data-service';
import { LocationService } from '../../../services/location/location-service';
import { LocationTypesList } from '../../../models/status-enums';


@Component({
  selector: 'app-locations-component',
  imports: [
    ButtonComponent,
    DatePipe,
    EnumToStringPipe,
    PaginationComponent,
    SpinnerComponent,
  ],


  templateUrl: './locations-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocationsComponent {
  dataService = inject(DataService) as unknown as LocationService;
  headerInfo = this.dataService.header;
  pageNumbers = computed(() =>
    Array.from({ length: this.headerInfo().TotalPageCount }, (_, i) => i + 1),
  );

  protected Export() { /* empty */ }

  protected readonly LocationTypesList = LocationTypesList;
}
