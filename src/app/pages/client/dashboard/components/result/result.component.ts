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
  public route: string;
  public res = JSON.parse(localStorage.getItem('temporary-result'));
  public currentDate = Date.now();
  currDate = moment(this.currentDate).format('l');

  public some: any = null;
  public good: boolean = false;
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
    this.res.forEach(element => {
      this.gamesService.findOneById(element.game).subscribe(res => {
        this.some = res;
          setTimeout(() => {
            this.successImage.nativeElement.style = `
              width: 40px;  
              position: absolute;
              top: ${element.result.y - 9}px;
              left: ${element.result.x  - 18}px;
              display: block;
            `
          }, 3000)
        this.some.dateTo = moment(this.some.dateTo).format('l');
        this.good = this.some.dateTo >= this.currDate;        
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