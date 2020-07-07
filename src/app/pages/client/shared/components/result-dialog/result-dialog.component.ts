import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: "result-dialog",
  templateUrl: "./result-dialog.component.html",
})
export class ResultDialogComponent {
  public currentDate = Date.now();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) {}

}