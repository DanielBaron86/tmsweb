import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGoodTypes } from './add-good-types';

describe('AddGoodTypes', () => {
  let component: AddGoodTypes;
  let fixture: ComponentFixture<AddGoodTypes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddGoodTypes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddGoodTypes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
