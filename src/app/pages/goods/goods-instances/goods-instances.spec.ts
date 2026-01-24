import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsInstances } from './goods-instances';

describe('GoodsInstances', () => {
  let component: GoodsInstances;
  let fixture: ComponentFixture<GoodsInstances>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoodsInstances]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoodsInstances);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
