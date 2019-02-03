import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import {User} from '../steamUser';

@Injectable({
  providedIn: 'root'
})
export class Dota2apiService {

  constructor(public http: HttpClient) { 
  }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  public search(filter: {name: string} = {name: ''}): Observable<any> {
      return this.http.get('https://api.opendota.com/api/search?q='+filter.name)
      .pipe(
          tap((response) => {
            response.results = response
              .map(user => new User(user.account_id, user.personaname , user.avatarfull, user.similarity,))
              .filter(user => user.personaname.includes(filter.name))
            return response;
          })
        );
  }

  public getBySteamId(steamID:any): Observable<any> {
    return this.http.get('https://api.opendota.com/api/players/'+steamID).pipe(
      map(this.extractData));
  }

  public getWinLoss(steamID:any) : Observable<any> {
    return this.http.get('https://api.opendota.com/api/players/'+steamID+'/wl').pipe(
      map(this.extractData));
  }

  public getRecentMatches(steamID:any): Observable<any> {
    return this.http.get('https://api.opendota.com/api/players/'+steamID+'/recentMatches').pipe(
      map(this.extractData));
  }


  public getHeroes(steamID:any) : Observable<any> {
    return this.http.get('https://api.opendota.com/api/players/'+steamID+'/heroes?sort=desc').pipe(
      map(this.extractData));
  }

  public getFriends(steamID:any) : Observable<any> {
    return this.http.get('https://api.opendota.com/api/players/'+steamID+'/peers ').pipe(
      map(this.extractData));
  }
  
  public getFriendsMatches(steamID:any, friendID:any) : Observable<any>  {
    return this.http.get('https://api.opendota.com/api/players/'+steamID+'/matches?included_account_id='+friendID).pipe(
      map(this.extractData));
  }
  
  public getHeroMatches(steamID:any, heroID:any) {
    return this.http.get('https://api.opendota.com/api/players/'+steamID+'/matches?hero_id='+heroID).toPromise().then(function(result){
      return result;
    });
  }
  
  public getMatchID(matchID:any) : Observable<any> {
    return this.http.get(' https://api.opendota.com/api/matches/'+matchID).pipe(
      map(this.extractData));
  }

  public getWLFriend(steamID:any,friendID:any) : Observable<any> {
    return this.http.get(' https://api.opendota.com/api/players/'+steamID+'/wl?included_account_id='+friendID).pipe(
      map(this.extractData));
  }
  
  public getWLHero(steamID:any,heroID:any) : Observable<any> {
    return this.http.get('https://api.opendota.com/api/players/'+steamID+'/wl?hero_id='+heroID).pipe(
      map(this.extractData));
  }


}
