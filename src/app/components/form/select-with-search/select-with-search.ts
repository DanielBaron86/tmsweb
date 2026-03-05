import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  output,
  signal,
  viewChildren,
} from '@angular/core';
export interface SelectedOption {
  value: string;
  text: string;
}

@Component({
  selector: 'app-select-with-search',
  imports: [],
  templateUrl: './select-with-search.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectWithSearch {
  emitSelected = output<any>();
  searchItems = viewChildren<ElementRef<HTMLDivElement>>('searchItems');

  placeholder = signal('Search...');
  label = input('');
  options = input<SelectedOption[]>([]);
  defaultSelected = input<string[]>([]);
  disabled = input(false);
  selectionChange = output<string[]>();

  selectedOptions: string[] = [];
  isOpen = false;
  toggleDropdown() {
    if (!this.disabled()) this.isOpen = !this.isOpen;
  }

  handleSelect(options: SelectedOption) {
    this.isOpen = false;
    this.placeholder.set(options.text);
    this.emitSelected.emit(options);
  }

  protected handleSearch($event: any) {
    const filterValue = $event.target.value;
    this.options().forEach((val, index) => {
      const isMatch = val.text.toLowerCase().includes(filterValue.toLowerCase());
      this.searchItems()[index].nativeElement.hidden = !isMatch;
    });
  }
}
