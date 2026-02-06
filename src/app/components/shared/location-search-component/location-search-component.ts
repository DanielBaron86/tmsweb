import {
  ChangeDetectionStrategy,
  Component, computed,
  contentChild,
  effect,
  ElementRef,
  inject, output,
  signal,
  viewChild
} from '@angular/core';
import {LocationService} from '../../../services/location/location-service';
import {LocationUnitModel} from '../../../models/location-models';
import DataService from '../../../services/data-service';
import GoodsTypesService from '../../../services/goods/goods-types-service';
import {PaginationComponent} from '../pagination-component/pagination-component';

@Component({
  selector: 'app-location-search-component',
  imports: [
    PaginationComponent
  ],
  providers: [
    {provide: DataService, useClass: LocationService}
  ],
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

  dataService = inject(DataService) as LocationService;
  listItems = this.dataService.getCollectionList();
  pageNumbers = computed(() =>
    Array.from({ length: this.listItems().paginationHeader.TotalPageCount }, (_, i) => i + 1)
  );
  isOpen = signal(false)
  toggleText = computed(() => this.isOpen() ? 'Close' : 'Open');
  dropdownMenu = viewChild<ElementRef<HTMLElement>>("dropdownMenu");
  locationEmitter = output<LocationUnitModel>();
  protected Toogle() {
    this.isOpen.set(!this.isOpen());
  }


  protected EmitItem(location: LocationUnitModel) {
    this.locationEmitter.emit(location);
  }
}
