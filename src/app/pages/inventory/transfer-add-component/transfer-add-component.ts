import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {AuthServices} from '../../../services/auth/auth.services';
import GoodsTypesService from '../../../services/goods/goods-types-service';
import {BlankComponent} from "../../../components/shared/blank-component/blank-component";

@Component({
  selector: 'app-transfer-add-component',
    imports: [
        BlankComponent
    ],
  templateUrl: './transfer-add-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransferAddComponent {

  readonly auth = inject(AuthServices)

  readonly userProfile = this.auth.userProfile();



}
