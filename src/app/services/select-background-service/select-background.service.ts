import { Injectable } from '@angular/core';

export interface IBackground {
  background: string;
  colorClass: string;
}

@Injectable({
  providedIn: 'root'
})
export class SelectBackgroundService {
  backgrounds: IBackground[];

  constructor() {
    this.backgrounds = [
      { background: 'linear-gradient(90deg, #b9deed, #efefef)', colorClass: 'light-blue'},
      { background: 'linear-gradient(90deg, rgb(245, 152, 168, 70%), rgb(246, 237, 178, 70%))', colorClass: 'pink-yellow'},
      { background: 'linear-gradient(90deg, rgb(207, 236, 208, 60%), rgb(160, 206, 167, 60%), rgb(158, 192, 219, 60%))', colorClass: 'green-blue'},
      { background: 'linear-gradient(90deg, rgb(174, 164, 227, 60%), rgb(211, 255, 232, 60%))', colorClass: 'purple-blue'},
      { background: 'linear-gradient(limegreen, transparent), linear-gradient(90deg, skyblue, transparent), linear-gradient(-90deg, coral, transparent)', colorClass: 'green-orange'},
      { background: 'linear-gradient(315deg, #04619f 0%, #000000 74%)', colorClass: 'dark-blue'},
      { background: 'linear-gradient(315deg, #923CB5 0%, #000000 74%)', colorClass: 'dark-violet'},
      { background: 'linear-gradient(315deg, #485461 0%, #28313b 74%)', colorClass: 'dark-grey'},
      { background: 'linear-gradient(315deg, #166d3b 0%, #000000 74%)', colorClass: 'dark-green'},
      { background:  'linear-gradient(315deg, #e84393 0%, #000000 74%)', colorClass: 'dark-pink'},
    ];
  }

  getBackgrounds(): IBackground[] {
    return this.backgrounds;
  }
}
