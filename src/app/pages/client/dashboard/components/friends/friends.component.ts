import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import * as jwtdecode from 'jwt-decode';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {

  public formInvite: FormGroup;
  public submitButtonDisabled: boolean = false;
  
  constructor(
    private _formBuilder: FormBuilder,
    private _userService: UserService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this._createForm()
  }

  private _createForm(){
    this.formInvite = this._formBuilder.group({
      email: ['', [Validators.required, Validators.minLength(10), Validators.email]],
    });
  }

  private inputHandler(){
    if(!this.formInvite) {
      this.submitButtonDisabled = false;
      return
    }
    if(this.formInvite.status === "INVALID"){
      this.submitButtonDisabled = false;
      return
    } 
    for(let item in this.formInvite){
      if(item.length === 0){
        this.submitButtonDisabled = false;
        return
      }
    }
    this.submitButtonDisabled = true;
  }

  public submitForm(){
    if (this.formInvite.invalid) {
      return;
    }
    const data = this.formInvite.value;
    data.email = data.email.toLocaleLowerCase()
    const user = localStorage.getItem('user')
    const sender = jwtdecode(user)
    this._userService.inviteUser(data, sender).subscribe(user => {
      if(user) {
        this.toastr.success(`The invite was sent to ${user.email}`);
        this.formInvite.reset();
        this.submitButtonDisabled = false;
      }
    })
  }

}
