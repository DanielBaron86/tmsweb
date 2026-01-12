import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownItemTwoComponent } from './dropdown-item-two-component';

describe('DropdownItemTwoComponent', () => {
  let component: DropdownItemTwoComponent;
  let fixture: ComponentFixture<DropdownItemTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownItemTwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropdownItemTwoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
