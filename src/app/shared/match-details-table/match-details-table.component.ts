import { Component, OnInit , Input } from '@angular/core';
import { isDefined } from '@angular/compiler/src/util';

@Component({
  selector: 'app-match-details-table',
  templateUrl: './match-details-table.component.html',
  styleUrls: ['./match-details-table.component.css']
})
export class MatchDetailsTableComponent implements OnInit {

  @Input() data: any;
  @Input() isFriend: number;

  public showFriend : boolean = false;
  public colXPM : boolean = true;
  public colGPM : boolean = true;
  public KDA : boolean = true;

  constructor() {
   }

    ngOnInit() {
      if(this.isFriend == 0 ){
          this.showFriend = true;
          this.colXPM = false;
          this.colGPM = false;
      }else if(this.isFriend == 1){
          this.showFriend = false;
          this.colXPM = false;
          this.colGPM = false;
      }
    }

  


}
