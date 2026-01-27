import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAddBaseComponent } from './edit-add-base-component';

describe('EditAddBaseComponent', () => {
  let component: EditAddBaseComponent;
  let fixture: ComponentFixture<EditAddBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditAddBaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAddBaseComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
