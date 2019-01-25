import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Import Components here
import { DashboardComponent } from './dashboard/dashboard.component';
import { SteamUserComponent } from './steam-user/steam-user.component';

const routes: Routes = [ 
        { path: '',                   component: DashboardComponent },
        { path: 'steamUser/:id',      component: SteamUserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
