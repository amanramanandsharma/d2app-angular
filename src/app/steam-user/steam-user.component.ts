import { Component, OnInit, Inject } from '@angular/core';
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
  userData = [];
  extraMatchData :any;
  peerData :any;
  heroesPlayedData :any;


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
        this.extraMatchData = data;

          for (var i = 0; i < this.extraMatchData.length; i++) {
            if(this.extraMatchData[i].radiant_win == true && this.extraMatchData[i].player_slot < 10){
                this.extraMatchData[i].win = true;
                this.extraMatchData[i].class = 'table-success';

            }else if(this.extraMatchData[i].radiant_win == false && this.extraMatchData[i].player_slot> 99){
              this.extraMatchData[i].win = true;
              this.extraMatchData[i].class = 'table-success';

            }else{
              this.extraMatchData[i].win = false;
              this.extraMatchData[i].class = 'table-danger';

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

  private extraData = [];
  private steamID : any;
  private friendID : any;
  private showHero = false;
  private showFriend = false;

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public passedData: DialogData,
    private d2api:Dota2apiService) {
      this.steamID = this.passedData.steamUser;
      this.friendID = this.passedData.friendID;

      if(this.passedData.type == 0){

            this.showFriend = true;
            this.showHero = false;

         // --------------------------------- If Type is Friend ---------------------------------------------
      this.d2api.getFriendsMatches(this.passedData.steamUser,this.passedData.friendID).then((data: any) => {
        for (var i = 0; i < 20; i++) {
         this.extraData.push(data[i]);
      }

      for(var i = 0; i < this.extraData.length; i++){
          for(var eachHero in this.extraData[i]['heroes']){
                if( this.friendID == this.extraData[i]['heroes'][eachHero].account_id){
                  this.extraData[i].friend_hero =  this.extraData[i]['heroes'][eachHero].hero_id;
                }
              }

                  if(this.extraData[i].radiant_win == true && this.extraData[i].player_slot < 10){
                      this.extraData[i].win = true;
                      this.extraData[i].class = 'table-success';

                  }else if(this.extraData[i].radiant_win == false && this.extraData[i].player_slot> 99){
                    this.extraData[i].win = true;
                    this.extraData[i].class = 'table-success';

                  }else{
                    this.extraData[i].win = false;
                    this.extraData[i].class = 'table-danger';
                  }

            }
      });

      // --------------------------------- If Type is Hero  -------------------------------------------------
      }else if(this.passedData.type == 1){

              this.showFriend = false;
              this.showHero = true;

            this.d2api.getHeroMatches(this.passedData.steamUser,this.passedData.name).then((data: any) => {
              for (var i = 0; i < 20; i++) {
                this.extraData.push(data[i]);
            }
            for(var i = 0; i < this.extraData.length; i++){   
                    if(this.extraData[i].radiant_win == true && this.extraData[i].player_slot < 10){
                        this.extraData[i].win = true;
                        this.extraData[i].class = 'table-success';
  
                    }else if(this.extraData[i].radiant_win == false && this.extraData[i].player_slot> 99){
                      this.extraData[i].win = true;
                      this.extraData[i].class = 'table-success';
  
                    }else{
                      this.extraData[i].win = false;
                      this.extraData[i].class = 'table-danger';
                    }
                }
          });
      }

   

    }

  // Doughnut
  public doughnutChartLabels:string[] = ['win','loss'];
  public doughnutChartData:number[] = [this.passedData.win,this.passedData.total-this.passedData.win];
  public doughnutChartType:string = 'doughnut';

  onNoClick(): void {
    this.dialogRef.close();
  }
 


}
