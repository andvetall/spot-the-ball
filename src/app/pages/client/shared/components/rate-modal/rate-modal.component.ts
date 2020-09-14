import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from 'src/app/services/user.service';
import { HowToPlayComponent } from 'src/app/shared/components/how-to-play/how-to-play.component';
import * as jwtdecode from "jwt-decode";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-rate-modal',
  templateUrl: './rate-modal.component.html',
})
export class RateModalComponent implements OnInit {

  public form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder,
    private dialog: MatDialog,
    private userService: UserService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this._createForm();
  }

  private _createForm(){
    this.form = this._formBuilder.group({
      rate: ['', [Validators.required]]
    });
  }

  sendRate(){
    if(this.form && this.form.valid){
      const data = Object.assign({_id: this.data.id}, this.form.value)
      this.userService.updateUserInfo(data).subscribe(res => {
        this.dialog.closeAll();
        this.toastr.success('Operation is successful!');
        const user = jwtdecode(localStorage.getItem('user'));
        const dateToken = user.iat;
        const dateCurrent = new Date().getTime()/1000;
        if(dateCurrent - dateToken < 60){
          setTimeout(() => {
            const dialogRef = this.dialog.open(HowToPlayComponent, {
              width: "700px",
            });
          }, 1000)
        }
      }, err => {
        this.dialog.closeAll();
        this.toastr.error('Something went wrong...');
      })
    }
  }

}
