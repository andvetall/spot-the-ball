import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prizes',
  templateUrl: './prizes.component.html',
  styleUrls: ['./prizes.component.scss']
})
export class PrizesComponent implements OnInit {

  public prizes: any = [
    {
      image: 'thumb.png',
      desc: `Wireless Headphones
      Rich high quality sound
      Voice activated Siri access
      Easy, Instant setup
      24hour battery life`
    },
    {
      image: 'air.png',
      desc: `Fully insulated 
      Stainless steel
      double wall
      dishwasher safe
      `
    },
    {
      image: 'PuckHunt_Shirt.png',
      desc: `Seamless collar, taped neck and shoulders
      5.3oz, 100% preshrunk cotton
      `
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
