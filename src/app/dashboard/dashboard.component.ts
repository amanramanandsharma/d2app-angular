import {Component, OnInit, Input } from '@angular/core';
import { Dota2apiService } from '../services/dota2api.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  steamID : Array<number> = [135515622,187707802,271827876,212929749];
  allSteamData= [];

  constructor(public d2api:Dota2apiService) {
   }

  ngOnInit() {

    //Get all Steam User Data
    for (var id in this.steamID){
        this.d2api.getBySteamId(this.steamID[id]).subscribe((data: {}) => {
          this.allSteamData.push(data);
        });
    }

  }



}


