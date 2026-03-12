import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ButtonComponent } from '../../../components/ui/button-component/button-component';
import { SpinnerComponent } from '../../../components/ui/spinner-component/spinner-component';
import { CartsServices } from '../../../services/stores/carts-services';
import { DatePipe } from '@angular/common';
import { DropdownDirective } from '../../../directives/dropdown-directive';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carts-component',
  imports: [ButtonComponent, SpinnerComponent, DatePipe, DropdownDirective],
  templateUrl: './carts-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartsComponent {
  readonly dataService = inject(CartsServices);
  readonly router = inject(Router);
  protected RefreshList() {
    // TODO document why this method 'RefreshList' is empty
  }

  protected Export() {
    // TODO document why this method 'Export' is empty
  }

  protected onSearchInput($event: Event) {
    /* empty */
  }

  protected ViewCart(cartId: number) {
    this.router.navigate([`/carts/${cartId}/view`]);
  }
}
