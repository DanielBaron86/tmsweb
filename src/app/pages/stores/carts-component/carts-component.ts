import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ButtonComponent } from '../../../components/ui/button-component/button-component';
import { SpinnerComponent } from '../../../components/ui/spinner-component/spinner-component';
import { CartsServices } from '../../../services/stores/carts-services';
import { DatePipe } from '@angular/common';
import { DropdownDirective } from '../../../directives/dropdown-directive';
import { Router } from '@angular/router';
import { PaginationComponent } from '../../../components/shared/pagination-component/pagination-component';
import { SessionStatusEnum } from '../../../models/status-enums';
import { ClientService } from '../../../services/clients/client-service';

@Component({
  selector: 'app-carts-component',
  imports: [ButtonComponent, SpinnerComponent, DatePipe, DropdownDirective, PaginationComponent],
  templateUrl: './carts-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartsComponent {
  readonly dataService = inject(CartsServices);
  readonly clientService = inject(ClientService);
  readonly router = inject(Router);
  readonly headerInfo = this.dataService.header;
  pageNumbers = computed(() =>
    Array.from({ length: this.headerInfo().TotalPageCount }, (_, i) => i + 1),
  );
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

  protected readonly SessionStatusEnum = SessionStatusEnum;

  protected EditCart(id: number, clientId: number) {
    this.dataService.selectCartId.set(id);
    this.clientService.selectClientId.set(clientId);
    this.router.navigate([`/sales`]);
  }
}
