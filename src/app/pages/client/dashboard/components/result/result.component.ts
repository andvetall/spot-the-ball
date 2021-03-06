import { Component, OnDestroy, ViewChild, ElementRef, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import * as moment from 'moment';
import { GamesService } from 'src/app/services/games.service';

@Component({
  selector: 'result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
  providers: [Location]
})

export class ResultComponent implements OnDestroy, OnInit {
  @ViewChild("successImage", {static: false}) successImage: ElementRef;
  @ViewChild("image", {static: false}) image: ElementRef;
  public route: string;
  public res = JSON.parse(localStorage.getItem('temporary-result'));
  public currentDate = Date.now();
  public currDate = moment(this.currentDate).format('MM-DD-YYYY');
  public reqGame: any = null;
  public suitableDate: boolean = false;

  constructor(
    private router: Router,
    private location: Location,
    private gamesService: GamesService
    ) {
    this.router.events.subscribe(val => {
      if (this.location.path() !== 'result') {
        this.route = this.location.path();
      } else {
        this.route = "dashboard";
      }
    });
  }

ngOnInit() {
  setTimeout(() => {
    this.res.length = 1;
    this.res.forEach(element => {
      this.gamesService.findOneById(element.game).subscribe(res => {
        this.reqGame = res;
          setTimeout(() => {
            let cofY = 9 * (this.image.nativeElement.naturalHeight / +this.image.nativeElement.clientHeight)
            let cofX = 18 * (this.image.nativeElement.naturalWidth / +this.image.nativeElement.clientWidth)
            this.successImage.nativeElement.style = `
              width: 40px;  
              position: absolute;
              top: ${(element.result.y - cofY) / (this.image.nativeElement.naturalHeight / +this.image.nativeElement.clientHeight)}px;
              left: ${(element.result.x - cofX) / (this.image.nativeElement.naturalWidth / +this.image.nativeElement.clientWidth)}px;
              display: block;
            `;
          }, 2000)
        this.reqGame.dateTo = moment(this.reqGame.dateTo).format('MM-DD-YYYY');
        this.suitableDate = this.reqGame.dateTo >= this.currDate;        
      })
    });
  }, 2000) 
}

  ngOnDestroy() {
    localStorage.removeItem('temporary-result')
  }
 
  toDashboard() {
    this.router.navigate(['dashboard'])
  }

}