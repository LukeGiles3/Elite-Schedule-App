import { TestBed } from '@angular/core/testing';

import { SelectedTeamServiceService } from './selected-team-service.service';

describe('SelectedTeamServiceService', () => {
  let service: SelectedTeamServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectedTeamServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
