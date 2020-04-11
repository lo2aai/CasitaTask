import { TestBed } from '@angular/core/testing';

import { MainPageServiceService } from './main-page-service.service';

describe('MainPageServiceService', () => {
  let service: MainPageServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainPageServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
