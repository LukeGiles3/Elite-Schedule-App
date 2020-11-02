import { SelectedTeamService } from './../selected-team-service.service';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-team-home',
  templateUrl: './team-home.page.html',
  styleUrls: ['./team-home.page.scss'],
})
export class TeamHomePage implements OnInit {

  get name(): string {
    return this.selectedTeam.team.name;
}

  constructor(
    public navCtrl: NavController,
    private selectedTeam: SelectedTeamService
    ) { }

  ngOnInit() {
  }
}
