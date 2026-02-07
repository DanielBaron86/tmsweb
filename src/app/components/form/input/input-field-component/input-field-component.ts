import { ChangeDetectionStrategy, Component, computed, input, model, output, signal } from '@angular/core';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';
import {readonly} from '@angular/forms/signals';

@Component({
  selector: 'app-input-field',
  imports: [],
  providers: [ {
    provide: NG_VALUE_ACCESSOR,
    useExisting: InputFieldComponent,
    multi: true
  }],
  templateUrl: './input-field-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputFieldComponent implements ControlValueAccessor {
  writeValue(val: string): void {
    this.value.set(val);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  onInputEntered($event: Event): void {
    const input = $event.target as HTMLInputElement;
    this.value.set(input.value);
    this.onChange(this.value);
  }
  onChange: any = () => {};
  onTouched: any = () => {};

  value = model<number | string>('');
  type = model('');
  id =input.required<string>();
  name = input.required<string>();
  placeholder = input<string>('');
  min =input<string>('')
  max =input<string>('');
  step = input<number>();
  disabled = signal(false);
  success = input(false);
  error: boolean = false;
  hint = input<string>('');
  className = input<string>('');
  inputReadonly = input(false);
  readonly inputValueChange =  output<Event>();

   get inputClasses(): string {
    let inputClasses = `h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 ${this.className()}`;

    if (this.disabled()) {
      inputClasses += ` text-gray-500 border-gray-300 opacity-40 bg-gray-100 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700 opacity-40`;
    } else if (this.error) {
      inputClasses += ` border-error-500 focus:border-error-300 focus:ring-error-500/20 dark:text-error-400 dark:border-error-500 dark:focus:border-error-800`;
    } else if (this.success()) {
      inputClasses += ` border-success-500 focus:border-success-300 focus:ring-success-500/20 dark:text-success-400 dark:border-success-500 dark:focus:border-success-800`;
    } else {
      inputClasses += ` bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90  dark:focus:border-brand-800`;
    }
    return inputClasses;
  }

  protected readonly readonly = readonly;
}
