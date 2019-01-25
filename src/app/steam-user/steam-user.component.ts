import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dota2apiService } from '../services/dota2api.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData {
  name:string;
  image:string;
  win:number;
  total:number;
}

@Component({
  selector: 'app-steam-user',
  templateUrl: './steam-user.component.html',
  styleUrls: ['./steam-user.component.css']
})
export class SteamUserComponent implements OnInit {
  userData = [];
  extraMatchData :any;
  peerData :any;
  heroesPlayedData :any;


  constructor(private d2api:Dota2apiService,private route: ActivatedRoute,public dialog: MatDialog) { }

  openDialog(name,image,win,totalGames): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: {name:name,image:image,win:win,total:totalGames}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  
  ngOnInit() {
    const steamId = +this.route.snapshot.paramMap.get('id');

    this.d2api.getBySteamId(steamId).subscribe((data: {}) => {
          this.userData['name'] = data['profile'].personaname;
          this.userData['account_id'] = data['profile'].account_id;
          this.userData['avatarfull'] = data['profile'].avatarfull;
          this.userData['mmr'] = data['profile'].solo_competitive_rank ? data['profile'].solo_competitive_rank : data['mmr_estimate'].estimate;
          this.userData['rank_tier'] = data['rank_tier'];
    });

    this.d2api.getWinLoss(steamId).subscribe((data: {}) => {
          this.userData['wins'] = data['win'];
          this.userData['loss'] = data['lose'];
    });

    this.d2api.getRecentMatches(steamId).subscribe((data: {}) => {
          this.extraMatchData = data;
    });

    this.d2api.getFriends(steamId).subscribe((data: {}) => {
          this.peerData = data;
    });

    this.d2api.getHeroes(steamId).subscribe((data: {}) => {
          this.heroesPlayedData = data;
    });

  }
}


//Open Dialog Function
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public passedData: DialogData) {}

  // Doughnut
  public doughnutChartLabels:string[] = ['win','loss'];
  public doughnutChartData:number[] = [this.passedData.win,this.passedData.total-this.passedData.win];
  public doughnutChartType:string = 'doughnut';

  onNoClick(): void {
    this.dialogRef.close();
  }

}
