import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'my-teams',
    pathMatch: 'full'
  },
  {
    path: 'game',
    loadChildren: () => import('./game/game.module').then( m => m.GamePageModule)
  },
  {
    path: 'my-teams',
    loadChildren: () => import('./my-teams/my-teams.module').then( m => m.MyTeamsPageModule)
  },
  {
    path: 'teams',
    loadChildren: () => import('./teams/teams.module').then( m => m.TeamsPageModule)
  },
  {
    path: 'tournaments',
    loadChildren: () => import('./tournaments/tournaments.module').then( m => m.TournamentsPageModule)
  },
  {
    path: 'team-home',
    loadChildren: () => import('./team-home/team-home.module').then( m => m.TeamHomePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
