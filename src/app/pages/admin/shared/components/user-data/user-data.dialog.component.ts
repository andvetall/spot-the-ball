import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: "user-data-dialog",
  templateUrl: "./user-data.dialog.component.html",
  styleUrls: ["./user-data.dialog.component.scss"],
})
export class UserDataDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }
}