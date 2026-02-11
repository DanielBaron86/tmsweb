import {
  ChangeDetectionStrategy,
  Component,
  contentChildren,
  ElementRef,
  input,
  model,
  output,
  signal, viewChildren
} from '@angular/core';
export interface Option {
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

placeholder = input('Search...')
label = input('')
options = input<Option[]>([]);
defaultSelected = input<string[]>([]);
disabled =input(false);
selectionChange =output<string[]>();

  selectedOptions: string[] = [];
  isOpen = false;

  ngOnInit() {

    this.selectedOptions = [...this.defaultSelected()];
  }

  toggleDropdown() {
    if (!this.disabled()) this.isOpen = !this.isOpen;
  }

  handleSelect(optionValue: string) {
    this.isOpen = false;
    this.emitSelected.emit(optionValue);
  }

  protected handleSearch($event: any) {
    let filterValue = $event.target.value;
    this.options().forEach( (val, index) => {
      console.log(val.text.toLowerCase())
      const isMatch =val.text.toLowerCase().includes(filterValue.toLowerCase())
      this.searchItems()[index].nativeElement.hidden = !isMatch
    })

  }
}
