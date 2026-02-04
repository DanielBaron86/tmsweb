import {
  ChangeDetectionStrategy,
  Component,
  contentChild,
  effect,
  ElementRef,
  inject, output,
  signal,
  viewChild
} from '@angular/core';
import {LocationService} from '../../../services/location/location-service';
import {LocationUnitModel} from '../../../models/location-models';

@Component({
  selector: 'app-location-search-component',
  imports: [],
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

  locationService = inject(LocationService);

  isOpen = signal(false)
  dropdownMenu = viewChild<ElementRef<HTMLElement>>("dropdownMenu");
  locationEmitter = output<LocationUnitModel>();
  protected Toogle() {
    this.isOpen.set(!this.isOpen());
  }


  protected EmitItem(location: LocationUnitModel) {
    this.locationEmitter.emit(location);
  }
}
