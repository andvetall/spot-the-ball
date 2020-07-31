import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'main-dashboard',
  templateUrl: './main.dashboard.component.html',
  styleUrls: ['./main.dashboard.component.scss']
})

export class MainDashboardComponent {

  public requestAmount: number = null;
  constructor(
    private router: Router,
    private userService: UserService,
  ) {
    this.userService.requestAmount.asObservable().subscribe((amount: number) => this.requestAmount = amount)
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
