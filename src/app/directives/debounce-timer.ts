import {Directive, input, model, numberAttribute} from '@angular/core';



@Directive({
  selector: '[appDebounceTimer]',
  host: {
    '[value]' : 'value()',
    '(input)': 'handleInput($event.target.value)',

  }
})
export class DebounceTimer {

  #debounceTimer?: ReturnType<typeof setTimeout>;
  readonly debounceTime = input(200, { transform: numberAttribute });
  readonly value = model<string>();
  handleInput(value: string): void {
    clearTimeout(this.#debounceTimer);

    if (!value || !this.debounceTime()) {
      this.value.set(value);
    } else {
      this.#debounceTimer = setTimeout(
        () => this.value.set(value),
        this.debounceTime()
      );
    }
  }


}
