import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dota2apiService } from '../services/dota2api.service';


@Component({
  selector: 'app-hero-stats',
  templateUrl: './hero-stats.component.html',
  styleUrls: ['./hero-stats.component.css']
})
export class HeroStatsComponent implements OnInit {

  private extraData = [];
  private userData = {};
  private heroData :number =0;
  private heroDOMID :number = 0;

  public doughnutChartLabels:string[] = ['win','loss'];
  public doughnutChartData:number[] = [400,300];
  public doughnutChartType:string = 'doughnut';
  public

  constructor(private d2api:Dota2apiService,private route: ActivatedRoute) { }

  ngOnInit() {

    const userId = +this.route.snapshot.paramMap.get('id');
    const heroId = +this.route.snapshot.paramMap.get('id2');
    this.heroDOMID = heroId;

    this.d2api.getBySteamId(userId).subscribe((data: {}) => {
      this.userData = data;
  });

    this.d2api.getHeroMatches(userId,heroId).then((data: any) => {
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

    this.d2api.getWLHero(userId,heroId).subscribe((data: {}) => {
      this.doughnutChartData = [data['win'],data['lose']];
      this.heroData = data['win'] + data['lose'];
    });

  }

}
