import { Directive, input, model, numberAttribute} from '@angular/core';

@Directive({
  selector: 'input[appDebounceTimer]',
  standalone: true,
  host: {
    '[value]': 'value()',
    '(input)': 'handleInput($event)'
  }
})
export class DebounceTimer {
  #debounceTimer?: any;
  readonly debounceTime = input(200, { transform: numberAttribute });
  readonly value = model<string>('');

  handleInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const newValue = inputElement.value;

    clearTimeout(this.#debounceTimer);

    if (!newValue || !this.debounceTime()) {
      this.value.set(newValue);
    } else {
      this.#debounceTimer = setTimeout(() => {
        this.value.set(newValue);
      }, this.debounceTime());
    }
  }
}
