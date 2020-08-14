import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  public formEmail: FormGroup;
  public formPassword: FormGroup;
  public showPassword: boolean = false;
  public showPasswordConfirm: boolean = false;
  public submitButtonDisabled: boolean = false;
  public submitButtonDisabledPassword: boolean = false;
  public emailValid: boolean = false;

  constructor(
    private _authService : AuthService,
    private _router : Router,
    private _formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this._createForm()
    this._inputHandler()
  }

  private _inputHandler(){
    if(!this.formEmail) {
      this.submitButtonDisabled = false;
      return
    }
    if(this.formEmail.status === "INVALID"){
      this.submitButtonDisabled = false;
      return
    } 
    for(let item in this.formEmail){
      if(item.length === 0){
        this.submitButtonDisabled = false;
        return
      }
    }
    this.submitButtonDisabled = true;
  }

  private _createForm(){
    this.formEmail = this._formBuilder.group({
      email: ['', [Validators.required, Validators.minLength(10), Validators.email]],
    });
  }

  public _submitForm(){
    if (this.formEmail.invalid) {
      return;
    }
    this._authService.resetPassword(this.formEmail.value.email.toLocaleLowerCase()).subscribe(a => {
      if(a) {
        this.emailValid = true;
      }
    }, err => err)
  }

}
