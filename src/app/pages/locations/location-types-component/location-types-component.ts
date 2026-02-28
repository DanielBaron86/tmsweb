import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { LocationTypesService } from '../../../services/location/location-types-service';
import { ButtonComponent } from '../../../components/ui/button-component/button-component';
import { DatePipe } from '@angular/common';
import { InputFieldComponent } from '../../../components/form/input/input-field-component/input-field-component';
import { PaginationComponent } from '../../../components/shared/pagination-component/pagination-component';
import { SpinnerComponent } from '../../../components/ui/spinner-component/spinner-component';
import DataService from '../../../services/data-service';
import { EnumToStringPipe } from '../../../pipes/enum-to-string-pipe';
import { LocationTypesList } from '../../../models/status-enums';

@Component({
  selector: 'app-location-types-component',
  imports: [
    ButtonComponent,
    DatePipe,
    PaginationComponent,
    SpinnerComponent,
    EnumToStringPipe,
  ],
  templateUrl: './location-types-component.html',
  providers: [{ provide: DataService, useClass: LocationTypesService }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationTypesComponent {
  dataService = inject(DataService) as unknown as LocationTypesService;
  protected readonly LocationTypesList = LocationTypesList;
  headerInfo = this.dataService.header;
  pageNumbers = computed(() =>
    Array.from({ length: this.headerInfo().TotalPageCount }, (_, i) => i + 1),
  );
  protected Export() {}
}
