import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'idHero'
})
export class IdHeroPipe implements PipeTransform {

  private heroIdName = ["GG WP","Anti-Mage","Axe","Bane","Bloodseeker","Crystal Maiden","Drow Ranger","Earthshaker","Juggernaut","Mirana","Morphling","Shadow Fiend","Phantom Lancer","Puck","Pudge","Razor","Sand King","Storm Spirit","Sven","Tiny","Vengeful Spirit","Windranger","Zeus","Kunkka","GG WP","Lina","Lion","Shadow Shaman","Slardar","Tidehunter","Witch Doctor","Lich","Riki","Enigma","Tinker","Sniper","Necrophos","Warlock","Beastmaster","Queen of Pain","Venomancer","Faceless Void","Wraith King","Death Prophet","Phantom Assassin","Pugna","Templar Assassin","Viper","Luna","Dragon Knight","Dazzle","Clockwerk","Leshrac","Nature's Prophet","Lifestealer","Dark Seer","Clinkz","Omniknight","Enchantress","Huskar","Night Stalker","Broodmother","Bounty Hunter","Weaver","Jakiro","Batrider","Chen","Spectre","Ancient Apparition","Doom","Ursa","Spirit Breaker","Gyrocopter","Alchemist","Invoker","Silencer","Outworld Devourer","Lycan","Brewmaster","Shadow Demon","Lone Druid","Chaos Knight","Meepo","Treant Protector","Ogre Magi","Undying","Rubick","Disruptor","Nyx Assassin","Naga Siren","Keeper of the Light","Io","Visage","Slark","Medusa","Troll Warlord","Centaur Warrunner","Magnus","Timbersaw","Bristleback","Tusk","Skywrath Mage","Abaddon","Elder Titan","Legion Commander","Techies","Ember Spirit","Earth Spirit","Underlord","Terrorblade","Phoenix","Oracle","Winter Wyvern","Arc Warden","Monkey King","GG WP","GG WP","GG WP","GG WP","Dark Willow","Pangolier","Grimstroke"];
  

constructor(){}

  transform(value: any): any {
     if(this.heroIdName[value]){
      return this.heroIdName[value];
     }
     else{
       return value;
     }
  }





}
