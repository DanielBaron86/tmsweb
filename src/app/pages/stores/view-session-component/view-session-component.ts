import { ChangeDetectionStrategy, Component, inject, linkedSignal, OnInit } from '@angular/core';
import { SessionService } from '../../../services/stores/session-service';
import { DatePipe } from '@angular/common';
import { EnumToStringPipe } from '../../../pipes/enum-to-string-pipe';
import { SessionStatusEnum } from '../../../models/status-enums';
import { CartsServices } from '../../../services/stores/carts-services';
import { SpinnerComponent } from '../../../components/ui/spinner-component/spinner-component';
import { ButtonComponent } from '../../../components/ui/button-component/button-component';
import { DropdownDirective } from '../../../directives/dropdown-directive';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-session-component',
  imports: [DatePipe, EnumToStringPipe, SpinnerComponent, ButtonComponent, DropdownDirective],
  templateUrl: './view-session-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewSessionComponent implements OnInit {
  ngOnInit(): void {
    this.cartService.search(this.sessionQueryFilters());
  }
  readonly sessionService = inject(SessionService);
  readonly cartService = inject(CartsServices);
  readonly router = inject(Router);
  sessionEntity = this.sessionService.selectedSession;
  protected readonly SessionStatusEnum = SessionStatusEnum;

  sessionQueryFilters = linkedSignal({
    source: () => this.sessionEntity(),
    computation: () => {
      const sessionId = this.sessionEntity()?.id;
      return {
        version: 1,
        pageNumber: 1,
        pageSize: 100,
        queryFields: [
          {
            method: 'where',
            keyField: 'sessionId',
            keyValue: sessionId!.toString(),
          },
        ],
      };
    },
  });
  protected readonly SessionStatus = SessionStatusEnum;

  protected RefreshList() {

  }

  protected Export() {

  }

  protected onSearchInput($event: Event) {

  }

  protected ViewCart(id: number) {
    this.cartService.selectCartId.set(id);
    this.router.navigate([`/carts/${id}/view`]);
  }
}
