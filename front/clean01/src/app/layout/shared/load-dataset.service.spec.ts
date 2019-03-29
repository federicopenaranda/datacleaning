import { TestBed } from '@angular/core/testing';

import { LoadDatasetService } from './load-dataset.service';

describe('LoadDatasetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoadDatasetService = TestBed.get(LoadDatasetService);
    expect(service).toBeTruthy();
  });
});
