import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dota2apiService } from '../services/dota2api.service';

@Component({
  selector: 'app-friend-stats',
  templateUrl: './friend-stats.component.html',
  styleUrls: ['./friend-stats.component.css']
})
export class FriendStatsComponent implements OnInit {

  private extraData = [];
  private userData = {};
  private friendData = {};
  private totalGames : number = 0;

  public doughnutChartLabels:string[] = ['win','loss'];
  public doughnutChartData:number[] = [400,300];
  public doughnutChartType:string = 'doughnut';

  constructor(private d2api:Dota2apiService,private route: ActivatedRoute) { }

  ngOnInit() {
      const userId = +this.route.snapshot.paramMap.get('id');
      const friendId = +this.route.snapshot.paramMap.get('id2');

      this.d2api.getBySteamId(userId).subscribe((data: {}) => {
          this.userData = data;
      });

      this.d2api.getBySteamId(friendId).subscribe((data: {}) => {
          this.friendData = data;
      });

      this.d2api.getFriendsMatches(userId,friendId).then((data: any) => {
        for (var i = 0; i < 20; i++) {
         this.extraData.push(data[i]);
      }

      for(var i = 0; i < this.extraData.length; i++){
          for(var eachHero in this.extraData[i]['heroes']){
                if( friendId == this.extraData[i]['heroes'][eachHero].account_id){
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

      this.d2api.getWLFriend(userId,friendId).subscribe((data: {}) => {
            this.doughnutChartData = [data['win'],data['lose']];
            this.totalGames = data['win'] + data['lose'];
      });

  }

}
