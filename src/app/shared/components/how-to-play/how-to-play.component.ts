import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-how-to-play',
  templateUrl: './how-to-play.component.html',
  styleUrls: ['./how-to-play.component.scss']
})
export class HowToPlayComponent {

  constructor(
    private dialog: MatDialog,
  ) { }

  close() {
    this.dialog.closeAll();
  }

}
