import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsCreate } from './clients-create';

describe('ClientsCreate', () => {
  let component: ClientsCreate;
  let fixture: ComponentFixture<ClientsCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientsCreate],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientsCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
