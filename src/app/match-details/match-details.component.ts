import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dota2apiService } from '../services/dota2api.service';

@Component({
  selector: 'app-match-details',
  templateUrl: './match-details.component.html',
  styleUrls: ['./match-details.component.css']
})
export class MatchDetailsComponent implements OnInit {

  matchData = {};

  constructor(private d2api:Dota2apiService,private route: ActivatedRoute) { }

  ngOnInit() {
    const matchId = +this.route.snapshot.paramMap.get('id');

    this.d2api.getMatchID(matchId).subscribe((data: {}) => {
      this.matchData = data;
    });

  }

}
