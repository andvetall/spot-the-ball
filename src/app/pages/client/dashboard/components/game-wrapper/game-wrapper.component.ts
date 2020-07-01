import { Component, Input } from '@angular/core';

@Component({
  selector: 'game-wrapper',
  templateUrl: './game-wrapper.component.html',
  styleUrls: ['./game-wrapper.component.scss']
})

export class GameWrapperComponent {
  @Input('image') image: any;
  @Input('title') title: any;

}