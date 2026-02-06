import {ChangeDetectionStrategy, Component, inject, input, model, OnInit, output, signal} from '@angular/core';
import DataService from '../../../services/data-service';

@Component({
  selector: 'app-pagination-component',
  imports: [],
  templateUrl: './pagination-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent implements OnInit {
  ngOnInit(): void {
      console.log(this.pageNumbers());
    console.log(this.TotalPageCount());
  }
  dataService = inject(DataService);

  pageNumbers =input<number[]>([1]);
  disabled = input(false);
  TotalPageCount = input(0);

  activePage = signal<number>(1);
  protected changePage(pageNumber: number) {
    this.dataService.activePage.set(pageNumber);
    if (!this.dataService.cachedPages().includes(this.dataService.activePage())) {
      this.dataService.cachedPages().push(this.dataService.activePage()) ;
      this.dataService.pageNumber.set(pageNumber);
    }

  }

  protected decreasePage() {
    this.dataService.activePage() < 2 ? this.dataService.activePage.set(this.TotalPageCount()) : this.dataService.activePage.set(this.dataService.activePage() - 1);
    if (!this.dataService.cachedPages().includes(this.dataService.activePage())) {
      this.dataService.pageNumber.set(this.dataService.activePage());
      this.dataService.cachedPages().push(this.dataService.activePage()) ;
    }
  }

  protected increasePage(){
    this.dataService.activePage() > this.TotalPageCount()-1 ? this.dataService.activePage.set(1) : this.dataService.activePage.set(this.dataService.activePage() + 1);
    if (!this.dataService.cachedPages().includes(this.dataService.activePage())) {
      this.dataService.pageNumber.set(this.dataService.activePage());
      this.dataService.cachedPages().push(this.dataService.activePage()) ;
    }

  }
}
