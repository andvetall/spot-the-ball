import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-prizes',
  templateUrl: './prizes.component.html',
  styleUrls: ['./prizes.component.scss']
})
export class PrizesComponent implements OnInit {

  public prizes: any = [
    {
      title: 'Apple AirPods',
      image: 'Airpods.png',
      desc: `Wireless Headphones
      Rich high quality sound
      Voice activated Siri access
      Easy, Instant setup
      24hour battery life`
    },
    {
      title: 'Tumbler',
      image: 'tumbler.png',
      desc: `Fully insulated 
      Stainless steel
      double wall
      dishwasher safe
      `
    },
    {
      title: 'T-Shirt',
      image: 'shirt.png',
      desc: `Seamless collar, taped neck and shoulders
      5.3oz, 100% preshrunk cotton
      `
    }
  ]

  constructor(
    private meta: Meta
  ) {
    this.meta.addTag({ name: 'Puck Hunt: Prizes', description: 'Don’t miss out on the amazing prizes lined up if you play Puck Hunt! Our lines of prizes range from cars to cash. Check them out!' });
  }

  ngOnInit() {
  }

}
