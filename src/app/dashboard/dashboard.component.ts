import { Component, OnInit, Input } from '@angular/core';
import { Dota2apiService } from '../services/dota2api.service';
import { User, IUserResponse } from '../steamUser';
import { FormBuilder, FormGroup } from '@angular/forms';
import { switchMap, debounceTime, tap, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable } from 'rxjs'



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  steamID: Array<number> = [135515622, 187707802, 271827876, 212929749];
  allSteamData = [];
  filteredUsers: User[] = [];
  usersForm: FormGroup;
  isLoading = false;

  constructor(public router: Router, public d2api: Dota2apiService, private fb: FormBuilder) {
  }

  ngOnInit() {

    this.usersForm = this.fb.group({
      userInput: null
    })


    //Get all Steam User Data
    for (var id in this.steamID) {
      this.d2api.getBySteamId(this.steamID[id]).subscribe((data: {}) => {
        this.allSteamData.push(data);
      });
    }

    this.usersForm.get('userInput').valueChanges.pipe(debounceTime(100), tap(() => this.isLoading = true),
      switchMap(value => this.d2api.search({ name: value }).pipe(
        finalize(() => this.isLoading = false),
      )
      )
    ).subscribe(users => this.filteredUsers = users.results);

  }


  showDetailsUser(user: User) {
    if (user) {
      this.router.navigate(['steamUser', user.account_id]).then(nav => {
        console.log(nav); // true if navigation is successful
      }, err => {
        console.log(err) // when there's an error
      });
    }
  }
}