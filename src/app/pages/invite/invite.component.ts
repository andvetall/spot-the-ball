import { Component, OnInit } from '@angular/core';
import AOS from 'aos';

@Component({
  selector: 'app-invite',
  template: '<router-outlet></router-outlet>'
})
export class InviteComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    AOS.init();
  }

}
