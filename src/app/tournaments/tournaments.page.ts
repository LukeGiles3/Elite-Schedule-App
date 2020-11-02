import { Tournament, EliteApiService } from './../shared/elite-api.service';
import { LoadingController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.page.html',
  styleUrls: ['./tournaments.page.scss'],
})

export class TournamentsPage implements OnInit {

  tournaments: Tournament[];

  constructor(
    public navCtrl: NavController,
    public eliteApi: EliteApiService,
    public loader: LoadingController) { }

    async ngOnInit() {
      this.eliteApi.getTournaments().subscribe(data => {
          this.tournaments = data;
          this.loader.dismiss();
      });
  }

  goBack() {
    this.navCtrl.back();
  }

  itemTapped(tournaments: Tournament) {
    this.navCtrl.navigateForward(['teams', { id: tournaments.id}]);
  }
}
