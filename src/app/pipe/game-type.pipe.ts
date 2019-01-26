import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gameType'
})
export class GameTypePipe implements PipeTransform {

  private gameType = [
    "Unknown","All Pick","Captain’s ,Mode","Random Draft","Single Draft","All Random","Intro","Diretide","Reverse Captain’s Mode","The Greeviling","Tutorial","Mid Only","Least Played","New Player Pool",",Compendium Matchmaking","Custom","Captains Draft",",Balanced Draft","Ability Draft","Event","All Random Death Match","Solo Mid 1 vs 1","Ranked All Pick"
  ];

  transform(value: any ): any {
    return this.gameType[value];
  }

}
