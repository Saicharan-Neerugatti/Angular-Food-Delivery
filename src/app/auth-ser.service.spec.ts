import { TestBed } from '@angular/core/testing';

import { AuthSerService } from './auth-ser.service';

describe('AuthSerService', () => {
  let service: AuthSerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthSerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
