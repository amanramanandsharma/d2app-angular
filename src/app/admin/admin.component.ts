import { Component, OnInit } from '@angular/core';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private bottomSheet: MatBottomSheet) {}

  ngOnInit() {
    this.bottomSheet.open(BottomSheetOverviewExampleSheet);
  }


}


@Component({
  selector: 'bottom-sheet-overview-example-sheet',
  templateUrl: 'bottom-sheet.html',
})
export class BottomSheetOverviewExampleSheet {
  constructor(private bottomSheetRef: MatBottomSheetRef<BottomSheetOverviewExampleSheet>) {
    bottomSheetRef.disableClose = true;
  }
  private email :string;
  private password :string;
  private hideError :boolean = false;

  checkCredentials(): void {
    if(this.email == "admin" && this.password=="secret"){
      this.bottomSheetRef.dismiss();
      event.preventDefault();
    }else{
      this.hideError = true;
    }
  }
}
