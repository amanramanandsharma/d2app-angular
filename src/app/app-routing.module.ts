import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Import Components here
import { DashboardComponent } from './dashboard/dashboard.component';
import { SteamUserComponent } from './steam-user/steam-user.component';
import { AdminComponent } from './admin/admin.component';
import { MatchDetailsComponent } from './match-details/match-details.component';

const routes: Routes = [ 
        { path: '',                   component: DashboardComponent },
        { path: 'steamUser/:id',      component: SteamUserComponent },
        { path: 'matchId/:id',      component: MatchDetailsComponent },
        { path: 'admin',              component: AdminComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
