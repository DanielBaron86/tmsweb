import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input
} from '@angular/core';
import DataService from '../../../services/data-service';

@Component({
  selector: 'app-pagination-component',
  imports: [],
  templateUrl: './pagination-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
  dataService = inject(DataService);

  pageNumbers =input<number[]>([1]);
  disabled = input(false);
  totalPageCount = input(0);
  isFirstPage = computed(() => this.dataService.activePage() === 1);
  isLastPage = computed(() => this.dataService.activePage() === this.totalPageCount());
  hasFilers = input(false);
  protected changePage(pageNumber: number) {

    this.dataService.setActivePage(pageNumber,this.hasFilers());
    if (!this.dataService.cachedPages.includes(pageNumber)) {
      this.dataService.pageNumber.set(pageNumber);
    }

  }

  protected decreasePage() {
    const prev = this.isFirstPage() ? this.totalPageCount() : this.dataService.activePage() - 1;
    this.changePage(prev);
  }

  protected increasePage(){
    const next = this.isLastPage() ? 1 : this.dataService.activePage() + 1;
    this.changePage(next);
  }
}
