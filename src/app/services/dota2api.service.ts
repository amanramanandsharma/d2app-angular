import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

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



}
