import {
  ChangeDetectionStrategy,
  Component, computed, effect,
  ElementRef,
  inject,
  signal,
  viewChildren
} from '@angular/core';
import {ButtonComponent} from '../../../components/ui/button-component/button-component';
import {DatePipe, LocationStrategy} from '@angular/common';
import {BaseItem} from '../../../models/goods-models';
import {InputFieldComponent} from '../../../components/form/input/input-field-component/input-field-component';

import {HttpClient} from '@angular/common/http';
import BaseItemsService from '../../../services/goods/base-items-service';
import {SpinnerComponent} from '../../../components/ui/spinner-component/spinner-component';



@Component({
  selector: 'app-base-types',
  imports: [ButtonComponent, DatePipe, InputFieldComponent, SpinnerComponent],
  templateUrl: './base-types-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseTypesComponent {
  goodService = inject(BaseItemsService);
  location = inject(LocationStrategy);
  http = inject(HttpClient)
  constructor() {
    effect( () =>{
      this.location.replaceState(null, '','main/base_types/',`pageNumber=${this.activePage()}&pageSize=${this.baseTypesList().paginationHeader.PageSize}`);
    } )
  }





  operation =signal<string>('edit');


  readonly tableList = viewChildren<ElementRef<HTMLTableRowElement>>('baseList');

  baseTypesList =this.goodService.getbaseTypesList();


  disabled = signal<boolean>(false);
  baseId = signal<number>(0);
  activePage = signal<number>(1);

  pageNumbers = computed(() =>
    Array.from({ length: this.baseTypesList().paginationHeader.TotalPageCount }, (_, i) => i + 1)
  );
  editableItem =computed( ()=> {
    if(this.baseId() != 0){
      return this.baseTypesList().result[this.activePage()].collectionName.filter(b => b.id == this.baseId())[0]
    }
    let obj: BaseItem= {  id :0 ,description:'' , manufacturer: ''}
    return obj;
  })


  protected changePage(pageNumber: number) {
    this.activePage.set(pageNumber);
    if (!this.goodService.cachedPages().includes(this.activePage())) {
      this.goodService.cachedPages().push(this.activePage()) ;
      this.goodService.baseTypesPageNumber.set(pageNumber);
    }

  }

  protected decreasePage() {

    this.activePage() < 2 ? this.activePage.set(this.baseTypesList().paginationHeader.TotalPageCount) : this.activePage.set(this.activePage() - 1);
    if (!this.goodService.cachedPages().includes(this.activePage())) {
      this.goodService.baseTypesPageNumber.set(this.activePage());
      this.goodService.cachedPages().push(this.activePage()) ;
    }
   console.log(this.goodService.cachedPages());
  }

  protected increasePage(){
    this.activePage() > this.baseTypesList().paginationHeader.TotalPageCount-1 ? this.activePage.set(1) : this.activePage.set(this.activePage() + 1);
    if (!this.goodService.cachedPages().includes(this.activePage())) {
      this.goodService.baseTypesPageNumber.set(this.activePage());
      this.goodService.cachedPages().push(this.activePage()) ;
    }
    console.log(this.goodService.cachedPages());
  }

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
    let results;
    if(this.operation() == 'new'){

      results= this.goodService.createBaseItem(this.editableItem())
      results.subscribe( (data) => {
        this.baseTypesList().result[this.activePage()].collectionName.push(data);
        this.disabled.set(false);
      })

    }else{
      results= this.goodService.updateBaseItem(this.editableItem())
      results.subscribe( (data) => {
        this.disabled.set(false);
      })
    }

    this.filterTableByString('');
  }

  protected onSearchInput($event: any) {
    this.filterTableByString($event.target.value);
  }
  protected filterTableByString(filterValue: string) {
    this.baseTypesList().result[this.activePage()]?.collectionName.forEach( (val,index) => {
      const isMatch =val.description.toLowerCase().includes(filterValue.toLowerCase()) || val.manufacturer.toLowerCase().includes(filterValue.toLowerCase())
      this.tableList()[index].nativeElement.hidden = !isMatch
    })
  }

  protected filterTableById(filterValue: number) {
    this.baseTypesList().result[this.activePage()]?.collectionName.forEach( (val,index) => {
      const isMatch =val.id == filterValue
      this.tableList()[index].nativeElement.hidden = !isMatch
    })
  }

  protected Cancel() {
    this.disabled.set(false);
    this.filterTableByString('');
  }

  protected Export() {
    console.log(this.goodService.cachedPages());
    console.log(this.baseTypesList());
  }
}
