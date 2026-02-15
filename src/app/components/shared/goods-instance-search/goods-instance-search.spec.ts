import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsInstanceSearch } from './goods-instance-search';

describe('GoodsInstanceSearch', () => {
  let component: GoodsInstanceSearch;
  let fixture: ComponentFixture<GoodsInstanceSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoodsInstanceSearch]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoodsInstanceSearch);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
