import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-label',
  imports: [],
  templateUrl: './label-component.html',
  styleUrl: './label-component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelComponent {
  readonly className: string = '';
  readonly for: string = '';
}
