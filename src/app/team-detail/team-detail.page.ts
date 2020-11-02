import { Component, OnInit } from '@angular/core';
import { SelectedTeamService } from '../selected-team-service.service';
import { Team } from '../team';
import { EliteApiService } from '../shared/elite-api.service';
import * as _ from 'lodash';
import * as moment from 'moment';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
    selector: 'app-team-detail',
    templateUrl: './team-detail.page.html',
    styleUrls: ['./team-detail.page.scss'],
})
export class TeamDetailPage implements OnInit {

    tourneyData: any;
    games: any[];
    dateFilter: string;
    allGames: any[];
    useDateFilter = false;
    isFollowing = false;


    get team(): Team {
        return this.selectedTeam.team;
    }

    constructor(
        private selectedTeam: SelectedTeamService,
        public eliteApi: EliteApiService,
        public alertController: AlertController,
        public toastController: ToastController
    ) {
        console.log('**nav params:', this.team.id);
    }

    ngOnInit() {
        this.tourneyData = this.eliteApi.getCurrentTourney();

        this.games = _.chain(this.tourneyData.games)
            .filter(g => g.teamId === this.team.id || g.team2Id === this.team.id)
            .map(g => {
                const isTeam1 = (g.teamId === this.team.id);
                const opponentName = isTeam1 ? g.team2 : g.team1;
                const scoreDisplay = this.getScoreDisplay(isTeam1, g.team1Score, g.team2Score);
                return {
                    gameId: g.id,
                    opponent: opponentName,
                    time: Date.parse(g.time),
                    location: g.location,
                    locationUrl: g.locationUrl,
                    scoreDisplay: scoreDisplay,
                    homeAway: (isTeam1 ? 'vs.' : 'at')
                };
            })
            .value();

        this.allGames = this.games;

    }

    getScoreDisplay(isTeam1, team1Score, team2Score) {
        if (team1Score && team2Score) {
            const teamScore = (isTeam1 ? team1Score : team2Score);
            const opponentScore = (isTeam1 ? team2Score : team1Score);
            const winIndicator = teamScore > opponentScore ? 'W: ' : 'L: ';
            return winIndicator + teamScore + '-' + opponentScore;
        } else {
            return '';
        }
    }

    dateChanged() {
        if (this.useDateFilter) {
          this.games = _.filter(this.allGames, g => moment(g.time).isSame(this.dateFilter, 'day'))
        } else {
          this.games = this.allGames;
        }
      }
    getScoreWorL(game) {
        return game.scoreDisplay ? game.scoreDisplay[0] : '';
    }

    getScoreDisplayBadgeClass(game) {
        return game.scoreDisplay.indexOf('W:') === 0 ? 'primary' : 'danger';
    }

    async toggleFollow() {
        if (this.isFollowing) {
            const confirm = await this.alertController.create({
                header: 'Unfollow?',
                message: 'Are you sure you want to unfollow?',
                buttons: [
                    {
                        text: 'Yes',
                        handler: () => {
                            this.isFollowing = false;
                        }
                    },
                    {
                        text: 'No'
                    }
                ]
            });
            confirm.present();
        } else {
            this.isFollowing = true;
            const toast = await this.toastController.create({
                message: 'You now follow this team',
                position: 'bottom',
                duration: 3000,
                color: 'success'
            });
            toast.present();
        }

        if (this.isFollowing) {
            const toast = await this.toastController.create({
                message: 'You have unfollowed this team',
                position: 'bottom',
                duration: 3000,
                color: 'warning'
            });
            const confirm = await this.alertController.create({
                header: 'Unfollow?',
                message: 'Are you sure you want to unfollow?',
                buttons: [
                    {
                        text: 'Yes',
                        handler: () => {
                            this.isFollowing = false;
                            toast.present();
                        }
                    },
                    {
                        text: 'No'
                    }
                ]
            });
            confirm.present();
        } else {
    }
}}
