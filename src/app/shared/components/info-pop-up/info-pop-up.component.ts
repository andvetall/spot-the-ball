import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-info-pop-up',
  templateUrl: './info-pop-up.component.html',
  styleUrls: ['./info-pop-up.component.scss']
})
export class InfoPopUpComponent {

  constructor(
    private dialog: MatDialog,
  ) { }

  close() {
    this.dialog.closeAll();
  }

}
