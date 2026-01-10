import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { SafeHtmlPipe } from '../../../pipes/safe-html-pipe';

@Component({
  selector: 'app-button',
  imports: [SafeHtmlPipe],
  templateUrl: './button-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {

  size = input('md');
  variant = input.required<'primary' | 'outline'>();
  disabled = input(false,{ transform: booleanAttribute });
  className = input('');
  startIcon = input<string>('');
  endIcon = input<string>('');

  readonly btnClick = output<Event>();

  readonly variantClasses = computed(() => {
    return this.variant() === 'primary'
      ? 'bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300'
      : 'bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300'; 
  })

  readonly disabledClasses = computed(() => {
    return this.disabled() ? 'cursor-not-allowed opacity-50' : '';
  })

  readonly sizeClasses = computed(() => {
    return this.size() === 'sm'
      ? 'px-4 py-3 text-sm'
      : 'px-5 py-3.5 text-sm';
  })

onClick(event: Event) {
    if (!this.disabled()) {
      this.btnClick.emit(event);
    }
  }

 

}
