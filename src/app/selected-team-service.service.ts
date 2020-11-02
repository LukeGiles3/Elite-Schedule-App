import { Injectable } from '@angular/core';
import { Team } from './team';

@Injectable({
  providedIn: 'root'
})
export class SelectedTeamService {

  team: Team;

  constructor() {
  }
}
