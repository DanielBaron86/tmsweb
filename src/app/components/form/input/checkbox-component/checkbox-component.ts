import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  imports: [],
  templateUrl: './checkbox-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxComponent {

  
  readonly label = input.required<string>(); 
  readonly checked = input(false);
  readonly className = input('');
  readonly id = input<string | undefined>(undefined);
  readonly disabled = input(false);

  checkedChange= output<boolean>();

  onChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.checkedChange.emit(input.checked);
  }

}
