import { Component, Inject, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: "result-dialog",
  templateUrl: "./result-dialog.component.html",
})
export class ResultDialogComponent implements AfterViewChecked{
  // @ViewChild("origImg", {static: false}) origImg: ElementRef;
  // @ViewChild("successImage", {static: false}) successImage: ElementRef;
  public currentDate = Date.now();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) {}

  ngAfterViewChecked() {
    // this.successImage.nativeElement.style = `
    //     width: 40px;  
    //     position: absolute;
    //     top: ${this.data.positionY - 20}px;
    //     left: ${this.data.positionX - 20}px;
    //     display: block;
    //   `
  }

}