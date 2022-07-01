import { TestBed } from '@angular/core/testing';

import { CacheInterceptorService } from './cache.service';

describe('CacheInterceptorService', () => {
  let service: CacheInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CacheInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
