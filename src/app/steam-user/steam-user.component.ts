import { Component, OnInit, Inject , Input  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dota2apiService } from '../services/dota2api.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


export interface DialogData {
  name:any;
  image:string;
  win:number;
  total:number;
  friendID:number;
  steamUser:number;
  type:number;
}

@Component({
  selector: 'app-steam-user',
  templateUrl: './steam-user.component.html',
  styleUrls: ['./steam-user.component.css']
})
export class SteamUserComponent implements OnInit {
  userData : any = [];
  peerData :any;
  heroesPlayedData :any;

  @Input() matchDetailsChild :any ;


  constructor(private d2api:Dota2apiService,private route: ActivatedRoute,public dialog: MatDialog) { }

  openDialog(name,image,win,totalGames,steamID,friendID,type): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: {name:name,image:image,win:win,total:totalGames,steamUser:steamID,friendID:friendID,type:type}
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
        this.matchDetailsChild = data;

          for (var i = 0; i < this.matchDetailsChild.length; i++) {
            if(this.matchDetailsChild[i].radiant_win == true && this.matchDetailsChild[i].player_slot < 10){
                this.matchDetailsChild[i].win = true;
                this.matchDetailsChild[i].class = 'table-success';

            }else if(this.matchDetailsChild[i].radiant_win == false && this.matchDetailsChild[i].player_slot> 99){
              this.matchDetailsChild[i].win = true;
              this.matchDetailsChild[i].class = 'table-success';

            }else{
              this.matchDetailsChild[i].win = false;
              this.matchDetailsChild[i].class = 'table-danger';

            }
      }
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
  styleUrls: ['./steam-user.component.css']
})
export class DialogOverviewExampleDialog {

  public extraData :any = [];
  public steamID : any;
  public friendID : any;
  public showHero = false;
  public showFriend = false;

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public passedData: DialogData,
    private d2api:Dota2apiService) {
      this.steamID = this.passedData.steamUser;
      this.friendID = this.passedData.friendID;
   

    }

  // Doughnut
  public doughnutChartLabels:string[] = ['win','loss'];
  public doughnutChartData:number[] = [this.passedData.win,this.passedData.total-this.passedData.win];
  public doughnutChartType:string = 'doughnut';

  onNoClick(): void {
    this.dialogRef.close();
  }

    // events
    public chartClicked(e:any):void {
      console.log(e);
    }
   
    public chartHovered(e:any):void {
      console.log(e);
    }
 


}
