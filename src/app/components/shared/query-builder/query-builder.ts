import {
  ChangeDetectionStrategy,
  Component,
  computed, effect,
  ElementRef,
  inject,
  input,
  output, signal,
  viewChild
} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {toSignal} from '@angular/core/rxjs-interop';
import {QueryFilters} from '../../../models/query-models';
import {DropdownDirective} from '../../../directives/dropdown-directive';


@Component({
  selector: 'app-query-builder',
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './query-builder.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QueryBuilder {
  constructor() {
    effect(() => {
      const menuEl = this.dropdownMenu()?.nativeElement;
      if (menuEl) {
        menuEl.style.display = this.isOpen() ? 'block' : 'none';
      }
    });
  }
  emitQueryFilter = output<QueryFilters>();
  dropdownMenu = viewChild<ElementRef<HTMLElement>>("dropdownMenu");
  isOpen = signal(false)
  protected Toogle() {
    this.isOpen.set(!this.isOpen());
  }
  queryTitle = input<string>('Location Query Filters');
  readonly fb = inject(FormBuilder);

  queryFilterForm = this.fb.group({
    pageNumber: [1, [Validators.min(1)]],
    pageSize: [100, [Validators.min(1), Validators.max(100)]],
    queryFields: this.fb.array([])
  });

  formValue = toSignal(this.queryFilterForm.valueChanges, {
    initialValue: this.queryFilterForm.value
  });
   formStatus = toSignal(this.queryFilterForm.statusChanges, {
    initialValue: this.queryFilterForm.status
  });
  isSubmitDisabled = computed(() => this.formStatus() !== 'VALID');

  createQueryFilter() {
    return this.fb.group({
      method: [['where', 'or'], Validators.required],
      keyField: ['', [Validators.required, Validators.minLength(2)]],
      keyValue: ['', Validators.required],
    });
  }

  get queryFields(): FormArray<FormGroup> {
    return this.queryFilterForm.get('queryFields') as FormArray<FormGroup>;
  }
  addQueryFilter() {
    this.queryFields.push(this.createQueryFilter());
  }

  removeQueryFilter(index: number) {
    this.queryFields.removeAt(index);
  }
  protected onSubmit() {
    this.emitQueryFilter.emit(this.formValue() as QueryFilters);
    this.Toogle();
  }

}
