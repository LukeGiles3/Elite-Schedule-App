import { Router } from '@angular/router';
import { EliteApiService } from './../shared/elite-api.service';
import { LoadingController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { SelectedTeamService } from '../selected-team-service.service';

@Component({
  selector: 'app-my-teams',
  templateUrl: './my-teams.page.html',
  styleUrls: ['./my-teams.page.scss'],
})
export class MyTeamsPage implements OnInit {

  favorites = [
    {
        team: { id: 6182, name: 'HC Elite 7th', coach: 'Michelotti' },
        tournamentId: '89e13aa2-ba6d-4f55-9cc2-61eba6172c63',
        tournamentName: 'March Madness Tournament'
    },
    {
        team: { id: 805, name: 'HC Elite', coach: 'Michelotti' },
        tournamentId: '98c6857e-b0d1-4295-b89e-2d95a45437f2',
        tournamentName: 'Holiday Hoops Challenge'
    }
];

  constructor(
    public navCtrl: NavController,
    private loader: LoadingController,
    private eliteApi: EliteApiService,
    public router: Router,
    private selectedTeam: SelectedTeamService) { }

  ngOnInit() {
  }

  async goToTournaments() {
    const loading = await this.loader.create({
        message: 'Getting tournaments...'
    });
    loading.present().then(_ => {
        this.navCtrl.navigateForward('tournaments');
    });
}

async favoriteTapped(favorite) {
  const loading = await this.loader.create({ message: 'Getting data...' });
  loading.present().then(() => {
      this.selectedTeam.team = favorite.team;
      this.eliteApi.getTournamentData(favorite.tournamentId).subscribe(() => {
          this.router.navigate(['team-home', { id: favorite.tournamentId }]);
      });
  });
}
}
