import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodTypes } from './good-types';

describe('GoodTypes', () => {
  let component: GoodTypes;
  let fixture: ComponentFixture<GoodTypes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoodTypes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoodTypes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
