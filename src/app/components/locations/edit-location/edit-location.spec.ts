import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLocation } from './edit-location';

describe('EditLocation', () => {
  let component: EditLocation;
  let fixture: ComponentFixture<EditLocation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditLocation],
    }).compileComponents();

    fixture = TestBed.createComponent(EditLocation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
