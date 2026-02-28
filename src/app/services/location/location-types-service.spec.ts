import { TestBed } from '@angular/core/testing';

import { LocationTypesService } from './location-types-service';

describe('LocationTypesService', () => {
  let service: LocationTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocationTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
