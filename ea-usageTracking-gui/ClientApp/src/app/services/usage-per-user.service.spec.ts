import { TestBed } from '@angular/core/testing';

import { UsagePerUserService } from './usage-per-user.service';

describe('UsagePerUserService', () => {
  let service: UsagePerUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsagePerUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
