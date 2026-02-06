import {
  ChangeDetectionStrategy,
  Component, computed, DestroyRef, effect,
  ElementRef,
  inject,
  signal,
  viewChildren, WritableSignal
} from '@angular/core';
import {ButtonComponent} from '../../../components/ui/button-component/button-component';
import {DatePipe, LocationStrategy} from '@angular/common';
import {BaseItem} from '../../../models/goods-models';
import {InputFieldComponent} from '../../../components/form/input/input-field-component/input-field-component';

import {HttpClient} from '@angular/common/http';
import BaseItemsService from '../../../services/goods/base-items-service';
import {SpinnerComponent} from '../../../components/ui/spinner-component/spinner-component';
import {PaginationComponent} from '../../../components/shared/pagination-component/pagination-component';
import DataService from '../../../services/data-service';
import {BaseCollectionName, paginatedResult} from '../../../models/base-model';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';



@Component({
  selector: 'app-base-types',
  imports: [ButtonComponent, DatePipe, InputFieldComponent, SpinnerComponent, PaginationComponent],
  templateUrl: './base-types-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseTypesComponent {
  dataService = inject(DataService);
  location = inject(LocationStrategy);
  http = inject(HttpClient)
  private destroyRef = inject(DestroyRef);
  constructor() {
    effect( () =>{
      this.location.replaceState(null, '','main/base_types/',`pageNumber=${this.dataService.activePage()}&pageSize=${this.baseTypesList().paginationHeader.PageSize}`);
    } )
  }
  readonly tableList = viewChildren<ElementRef<HTMLTableRowElement>>('baseList');
  baseTypesList : WritableSignal<paginatedResult<BaseCollectionName[]>> =this.dataService.getCollectionList();
  operation =signal<string>('edit');
  disabled = signal<boolean>(false);
  baseId = signal<number>(0);
  pageNumbers = computed(() =>
    Array.from({ length: this.baseTypesList().paginationHeader.TotalPageCount }, (_, i) => i + 1)
  );
  editableItem =computed( ()=> {
    if(this.baseId() != 0){
      return this.baseTypesList().result[this.dataService.activePage()].collectionName.filter(b => b.id == this.baseId())[0]
    }
    let obj: BaseItem= {  id :0 ,description:'' , manufacturer: ''}
    return obj;
  })

  protected EditBase(baseItem: BaseItem) {
    this.operation.set('edit')
    this.filterTableById(baseItem.id);
    this.disabled.set(true);
    this.baseId.set(baseItem.id)
  }
  protected NewBase() {
    this.operation.set('new')
    this.baseId.set(0);
    this.disabled.set(true);
  }


  protected Save() {
    const operation = this.operation() === 'new'
      ? this.dataService.createItem(this.editableItem())
      : this.dataService.updateItem(this.editableItem());

    operation.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (data) => {
        if (this.operation() === 'new') {
          this.baseTypesList().result[this.dataService.activePage()].collectionName.push(data);
        }
        this.disabled.set(false);
        this.filterTableByString('');
      },
      error: (err) => console.error('Save failed', err)
    });
  }

  protected onSearchInput($event: any) {
    this.filterTableByString($event.target.value);
  }
  protected filterTableByString(filterValue: string) {
    this.baseTypesList().result[this.dataService.activePage()]?.collectionName.forEach( (val, index) => {
      const isMatch =val.description.toLowerCase().includes(filterValue.toLowerCase()) || val.manufacturer.toLowerCase().includes(filterValue.toLowerCase())
      this.tableList()[index].nativeElement.hidden = !isMatch
    })
  }

  protected filterTableById(filterValue: number) {
    this.baseTypesList().result[this.dataService.activePage()]?.collectionName.forEach( (val, index) => {
      const isMatch =val.id == filterValue
      this.tableList()[index].nativeElement.hidden = !isMatch
    })
  }

  protected Cancel() {
    this.disabled.set(false);
    this.filterTableByString('');
  }

  protected Export() {
     console.log(this.dataService.cachedPages());
     console.log(this.baseTypesList());
  }
}
