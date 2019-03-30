import { TestBed } from '@angular/core/testing';

import { DndaService } from './dnda.service';

describe('DndaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DndaService = TestBed.get(DndaService);
    expect(service).toBeTruthy();
  });
});
