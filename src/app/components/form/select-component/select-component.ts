import {ChangeDetectionStrategy, Component, input, Input, output} from '@angular/core';
export interface Option {
  value: string;
  label: string;
}
@Component({
  selector: 'app-select',
  imports: [],
  templateUrl: './select-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent {

  options = input.required<Option[]>();
  placeholder = input('Select an option');
  className = input('');
  disabled = input(false);
  defaultValue = input('');
  value = input('');

  valueChange= output<string>();

  protected onChange($event: Event) {

  }
}
