import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-invite-new',
  templateUrl: './invite-new.component.html',
  styleUrls: ['./invite-new.component.scss']
})
export class InviteNewComponent implements OnInit {
  public formRequest: FormGroup;
  public formEmailValidation: FormGroup;
  public showPassword: boolean = false;
  public submitButtonDisabled: boolean = false;
  public submitButtonEmailDisabled: boolean = false;
  private user: any;
  private access: boolean = false;
  private requested: boolean = false;
  private oops: boolean = false;

  constructor(
    private _router : Router,
    private _activatedRoute: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private toastr: ToastrService,
    private _userService: UserService,
  ) {
    this._activatedRoute.params.subscribe(res => {
      const helper = new JwtHelperService();
      this.user = helper.decodeToken(res.token)
    })
  }

  ngOnInit() {
    this._createFormformEmailValidation()
    this.inputHandler()
    this.inputHandlerEmail()
  }

  private inputHandler(){
    if(!this.formRequest) {
      this.submitButtonDisabled = false;
      return
    }
    if(this.formRequest.status === "INVALID"){
      this.submitButtonDisabled = false;
      return
    } 
    for(let item in this.formRequest){
      if(item.length === 0){
        this.submitButtonDisabled = false;
        return
      }
    }
    this.submitButtonDisabled = true;
  }

  private inputHandlerEmail(){
    if(!this.formEmailValidation) {
      this.submitButtonEmailDisabled = false;
      return
    }
    if(this.formEmailValidation.status === "INVALID"){
      this.submitButtonEmailDisabled = false;
      return
    } 
    for(let item in this.formEmailValidation){
      if(item.length === 0){
        this.submitButtonEmailDisabled = false;
        return
      }
    }
    this.submitButtonEmailDisabled = true;
  }

  private _createForm(){
    this.formRequest = this._formBuilder.group({
      email: ['', [Validators.required, Validators.minLength(10), Validators.email]],
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]]
    });
  }
  private _createFormformEmailValidation(){
    this.formEmailValidation = this._formBuilder.group({
      email: ['', [Validators.required, Validators.minLength(10), Validators.email]]
    });
  }

  public validateEmail() {
    const { email } = this.formEmailValidation.value
    if(email !== this.user.email) {
      this.toastr.error("Email is wrong")
      this.formEmailValidation.reset()
      this.submitButtonEmailDisabled = false
      return
    }
    this.access = true;
    this._createForm();
    this.formRequest.controls.email.setValue(this.user.email)
    this.toastr.success("Email is correct")
  }

  public submitForm(){
    if (this.formRequest.invalid) {
      return;
    }
    console.log(this.formRequest);
    this._userService.sendRequest(this.formRequest.value).subscribe(res => {
      this.requested = true;
      setTimeout(() => {
        this._router.navigate(['login']);
      }, 3000)
    }, err => {
      this.oops = true;
      setTimeout(() => {
        this._router.navigate(['login']);
      }, 3000)
    })
  }

}
