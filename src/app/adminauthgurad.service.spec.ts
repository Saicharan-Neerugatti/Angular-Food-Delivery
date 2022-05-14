import { TestBed } from '@angular/core/testing';

import { AdminauthguradService } from './adminauthgurad.service';

describe('AdminauthguradService', () => {
  let service: AdminauthguradService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminauthguradService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
