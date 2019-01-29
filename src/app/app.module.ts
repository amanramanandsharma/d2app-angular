import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from  '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgHttpLoaderModule } from 'ng-http-loader'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SteamUserComponent } from './steam-user/steam-user.component';
import { DialogOverviewExampleDialog } from './steam-user/steam-user.component';
import { ChartsModule } from 'ng2-charts';
import { IdHeroPipe } from './pipe/id-hero.pipe';
import { SecondsTimePipe } from './pipe/seconds-time.pipe';
import { GameTypePipe } from './pipe/game-type.pipe';
import { WinLosePipe } from './pipe/win-lose.pipe';
import { AdminComponent } from './admin/admin.component';
import { BottomSheetOverviewExampleSheet } from './admin/admin.component';
import { MatchDetailsComponent } from './match-details/match-details.component';
import { ItemIdPipe } from './pipe/item-id.pipe';
import { FriendStatsComponent } from './friend-stats/friend-stats.component';
import { HeroStatsComponent } from './hero-stats/hero-stats.component';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SteamUserComponent,
    DialogOverviewExampleDialog,
    BottomSheetOverviewExampleSheet,
    IdHeroPipe,
    SecondsTimePipe,
    GameTypePipe,
    WinLosePipe,
    AdminComponent,
    MatchDetailsComponent,
    ItemIdPipe,
    FriendStatsComponent,
    HeroStatsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgHttpLoaderModule.forRoot(),
    BrowserAnimationsModule,
    MaterialModule,
    ChartsModule
  ],
  entryComponents: [
    DialogOverviewExampleDialog,
    BottomSheetOverviewExampleSheet
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
