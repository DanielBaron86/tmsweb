import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsPage } from './goods-page';

describe('GoodsPage', () => {
  let component: GoodsPage;
  let fixture: ComponentFixture<GoodsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoodsPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoodsPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
