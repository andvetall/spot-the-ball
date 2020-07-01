import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ResultXY } from 'src/app/shared/interfaces/result.model';

@Component({
  selector: 'result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
  providers: [Location]
})

export class ResultComponent implements OnDestroy{

  public route: string;
  public res = JSON.parse(localStorage.getItem('temporary-result'));
  
  constructor(
    private router: Router,
    private location: Location
    ) {
    this.router.events.subscribe(val => {
      if (this.location.path() !== 'result') {
        this.route = this.location.path();
      } else {
        this.route = "dashboard";
      }
    });

  }

  ngOnDestroy() {
    localStorage.removeItem('temporary-result')
  }

  toDashboard() {
    this.router.navigate(['dashboard'])
  }

}