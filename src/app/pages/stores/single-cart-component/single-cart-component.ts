import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { CartsServices } from '../../../services/stores/carts-services';
import { DatePipe } from '@angular/common';
import { EnumToStringPipe } from '../../../pipes/enum-to-string-pipe';
import { PaymentStatusEnum, StoreOperationType, UserTypeEnum } from '../../../models/status-enums';

@Component({
  selector: 'app-single-cart-component',
  imports: [DatePipe, EnumToStringPipe],
  templateUrl: './single-cart-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingleCartComponent {
  readonly cartServices = inject(CartsServices);
  protected readonly PaymentStatusEnum = PaymentStatusEnum;
  cartId = input.required<number>();
  selectedCart = this.cartServices.GetCartById(() => this.cartId());
  protected readonly UserTypeEnum = UserTypeEnum;
  protected readonly StoreOperationType = StoreOperationType;
}
