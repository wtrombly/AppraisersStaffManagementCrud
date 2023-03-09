import { TestBed } from '@angular/core/testing';

import { AppraiserService } from './appraiser.service';

describe('AppraiserService', () => {
  let service: AppraiserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppraiserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
