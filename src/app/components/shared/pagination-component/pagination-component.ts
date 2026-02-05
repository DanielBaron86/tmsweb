import {ChangeDetectionStrategy, Component, input, model, output, signal} from '@angular/core';

@Component({
  selector: 'app-pagination-component',
  imports: [],
  templateUrl: './pagination-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
  pageNumbers =input<number[]>([1]);
  disabled = input(false);
  pageLength = model<number | null>(0);
  totalItemCount = input(9);
  activePage = input<number>(1);

  decrease = output<void>();
  increase = output<void>();
  chagePage = output<number>();
  protected decreasePage() {
    this.decrease.emit();
  }

  protected changePage(pageNumber: number) {
    this.chagePage.emit(pageNumber);
  }

  protected increasePage() {
    this.increase.emit();
  }
}
