import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  public formLogin: FormGroup;
  public showPassword: boolean = false;
  public submitButtonDisabled: boolean = false;

  constructor(
    private _authService : AuthService,
    private _router : Router,
    private _formBuilder: FormBuilder,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this._createForm()
    this.inputHandler()
  }

  public inputHandler(){
    if(!this.formLogin) {
      this.submitButtonDisabled = false;
      return
    }
    if(this.formLogin.status === "INVALID"){
      this.submitButtonDisabled = false;
      return
    } 
    for(let item in this.formLogin){
      if(item.length === 0){
        this.submitButtonDisabled = false;
        return
      }
    }
    this.submitButtonDisabled = true;
  }

  private _createForm(){
    this.formLogin = this._formBuilder.group({
      email: ['', [Validators.required, Validators.minLength(10), Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  public submitForm(){
    if (this.formLogin.invalid) {
      return;
    }
    const data = this.formLogin.value;
    data.email = data.email.toLocaleLowerCase();
    this._authService.loginUser(data).subscribe(a => {
      localStorage.setItem('user', a.token)
      const role = a.user.role
      if(role === "admin") {
        this._router.navigate(['admin/main-dashboard'])
      } else {
        this._router.navigate(['dashboard'])
      }
    })
  }

  public navigateToForgotPassword(){
    this._router.navigate(['reset-password'])
  }

  public showPasswordToggle(){
    this.showPassword = !this.showPassword
  }

}
