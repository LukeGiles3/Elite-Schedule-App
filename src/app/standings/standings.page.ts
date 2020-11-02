import { Component, OnInit } from '@angular/core';
import { EliteApiService } from '../shared/elite-api.service';
import * as _ from 'lodash';
import { SelectedTeamService } from '../selected-team-service.service';
import { Team } from '../team';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.page.html',
  styleUrls: ['./standings.page.scss'],
})
export class StandingsPage implements OnInit {
  standings: any;
  allStandings: any[];
  teamStanding: any;
  private team: Team;

  constructor(
      private eliteApi: EliteApiService,
      private selectedTeam: SelectedTeamService
  ) { }

  ngOnInit() {
    this.team = this.selectedTeam.team;
    const tourneyData = this.eliteApi.getCurrentTourney();
    this.standings = tourneyData.standings;
    this.teamStanding = _.find(tourneyData.standings, {teamId: this.team.id});

    this.allStandings = _.chain(this.standings)
        .groupBy('division')
        .toPairs()
        .map(item => _.zipObject(['divisionName', 'divisionStandings'], item))
        .value();

    console.log('standings:', this.standings);
    console.log('division standings', this.allStandings);
  }
}
