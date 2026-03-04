import { TestBed } from '@angular/core/testing';

import { RegistersServices } from './registers-services';

describe('RegistersServices', () => {
  let service: RegistersServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistersServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
