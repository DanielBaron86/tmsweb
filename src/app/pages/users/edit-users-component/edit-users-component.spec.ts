import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUsersComponent } from './edit-users-component';

describe('EditUsersComponent', () => {
  let component: EditUsersComponent;
  let fixture: ComponentFixture<EditUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditUsersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditUsersComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
