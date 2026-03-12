import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { LocationService } from '../../../services/location/location-service';
import { LocationUnitModel } from '../../../models/location-models';
import GenericDataService from '../../../services/data-service';
import { PaginationComponent } from '../pagination-component/pagination-component';
import { QueryBuilder } from '../query-builder/query-builder';
import { SelectedOption } from '../../form/select-with-search/select-with-search';
import { QueryFilters } from '../../../models/query-models';

@Component({
  selector: 'app-location-search-component',
  imports: [PaginationComponent, QueryBuilder],
  providers: [{ provide: GenericDataService, useExisting: LocationService }],
  templateUrl: './location-search-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationSearchComponent {
  constructor() {
    effect(() => {
      const menuEl = this.dropdownMenu()?.nativeElement;
      if (menuEl) {
        menuEl.style.display = this.isOpen() ? 'block' : 'none';
      }
    });
  }
  availableOptions: SelectedOption[] = [
    { value: 'Address', text: 'Address' },
    { value: 'Description', text: 'Description' },
    { value: 'locationTypeId', text: 'Location Type' },
  ];
  dataService = inject(GenericDataService) as LocationService;
  headerInfo = this.dataService.header;
  pageNumbers = computed(() =>
    Array.from({ length: this.headerInfo().TotalPageCount }, (_, i) => i + 1),
  );
  isOpen = signal(false);
  toggleText = computed(() => (this.isOpen() ? 'Close' : 'Open'));
  dropdownMenu = viewChild<ElementRef<HTMLElement>>('dropdownMenu');
  locationEmitter = output<LocationUnitModel>();
  protected Toogle() {
    this.isOpen.set(!this.isOpen());
  }

  protected EmitItem(location: LocationUnitModel) {
    this.locationEmitter.emit(location);
  }

  protected ReceiveFilters($event: QueryFilters) {
    this.dataService.search($event);
  }
}
