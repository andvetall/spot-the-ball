import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'main-dashboard',
  templateUrl: './main.dashboard.component.html',
  styleUrls: ['./main.dashboard.component.scss']
})

export class MainDashboardComponent {

  constructor(
    private router: Router
  ) { }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
