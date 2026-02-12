import {ChangeDetectionStrategy, Component, computed, inject} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {toSignal} from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-query-builder',
    imports: [
        ReactiveFormsModule
    ],
  templateUrl: './query-builder.html',
  styleUrl: './query-builder.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QueryBuilder {
  readonly fb = inject(FormBuilder);

  queryFilterForm = this.fb.group({
    pageNumber: [1, [Validators.min(1)]],
    pageSize: [10, [Validators.min(1), Validators.max(100)]],
    queryFields: this.fb.array([this.createQueryFilter()])
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

  get queryFields() {
    return this.queryFilterForm.controls.queryFields;
  }

  addQueryFilter() {
    this.queryFields.push(this.createQueryFilter());
  }

  removeQueryFilter(index: number) {
    this.queryFields.removeAt(index);
    if (this.queryFields.length === 0) this.addQueryFilter();
  }
  protected onSubmit() {
    console.log(this.formValue());
  }

}
