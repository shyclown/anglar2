import { TestBed, async, inject } from '@angular/core/testing';

import { ResolveInitGuard } from './resolve-init.guard';

describe('ResolveInitGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResolveInitGuard]
    });
  });

  it('should ...', inject([ResolveInitGuard], (guard: ResolveInitGuard) => {
    expect(guard).toBeTruthy();
  }));
});
