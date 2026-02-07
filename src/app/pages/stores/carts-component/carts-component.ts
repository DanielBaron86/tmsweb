import { ChangeDetectionStrategy, Component } from '@angular/core';
import {BlankComponent} from '../../../components/shared/blank-component/blank-component';

@Component({
  selector: 'app-carts-component',
  imports: [
    BlankComponent
  ],
  templateUrl: './carts-component.html',
  styleUrl: './carts-component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartsComponent {

}
