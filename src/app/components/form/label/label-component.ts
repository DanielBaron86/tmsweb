import {ChangeDetectionStrategy, Component, input} from '@angular/core';

@Component({
  selector: 'app-label',
  imports: [],
  templateUrl: './label-component.html',
  styleUrl: './label-component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelComponent {
  readonly className= input('')
  readonly for = input('')
}
