import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: "result-dialog-question",
  templateUrl: "./result-dialog-question.component.html",
})
export class ResultDialogQuestionComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<any>
    ) {}

    yes(){
      this.dialogRef.close(true);
    }
  
    no(){
      this.dialogRef.close(false);
    }

}