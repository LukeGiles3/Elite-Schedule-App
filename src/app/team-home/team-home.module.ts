import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeamHomePageRoutingModule } from './team-home-routing.module';

import { TeamHomePage } from './team-home.page';

const routes: Routes = [
    {
        path: '',
        component: TeamHomePage,
        children: [
            {
                path: 'team-detail',
                children: [
                    {
                        path: '',
                        loadChildren: () => import('../team-detail/team-detail.module').then(m => m.TeamDetailPageModule)
                    }
                ]
            },
            {
                path: 'standings',
                children: [
                    {
                        path: '',
                        loadChildren: () => import('../standings/standings.module').then(m => m.StandingsPageModule)
                    }
                ]
            },
            {
                path: '',
                redirectTo: '/team-home/team-detail',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/team-home/team-detail',
        pathMatch: 'full'
    }
  ];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeamHomePageRoutingModule
  ],
  declarations: [TeamHomePage]
})

export class TeamHomePageModule {}
