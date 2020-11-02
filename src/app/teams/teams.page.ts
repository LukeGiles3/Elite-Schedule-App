import { EliteApiService } from './../shared/elite-api.service';
import { ActivatedRoute } from '@angular/router';
import { SelectedTeamService } from './../selected-team-service.service';
import { Team } from './../team';
import { LoadingController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.page.html',
  styleUrls: ['./teams.page.scss'],
})
export class TeamsPage implements OnInit {

  teams: Team[] = [
    { id: 1, name: 'HC Elite' },
    { id: 2, name: 'Team Takeover' },
    { id: 3, name: 'DC Thunder' }
];

  allTeams: any;
  allTeamDivisions: any;

  constructor(
    public navCtrl: NavController,
    private selectedTeam: SelectedTeamService,
    private route: ActivatedRoute,
    private eliteApi: EliteApiService,
    private loader: LoadingController
    ) { }

    async ngOnInit() {
      const selectedTourney = this.route.snapshot.paramMap.get('id');
      const loading = await this.loader.create({
        message: 'Getting data...'
    });

      loading.present().then(() => {
        this.eliteApi.getTournamentData(selectedTourney).subscribe(data => {
            this.allTeams = data.teams;
            this.allTeamDivisions = _
                .chain(data.teams)
                .groupBy('division')
                .toPairs()
                .map(item => _.zipObject(['divisionName', 'divisionTeams'], item))
                .value();
            this.teams = this.allTeamDivisions;
            console.log('division teams', this.teams);
            loading.dismiss();
        });
    });
  }

  itemTapped(team: Team) {
    this.selectedTeam.team = team;
    this.navCtrl.navigateForward(['team-home']);
}
}
