import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { FavotiteTeamComponent } from 'src/app/shared/components/favotite-team/favotite-team.component';
import * as jwtdecode from "jwt-decode";

@Component({
  selector: 'app-invite-new',
  templateUrl: './invite-new.component.html',
  styleUrls: ['./invite-new.component.scss']
})
export class InviteNewComponent implements OnInit {
  public formRequest: FormGroup;
  public submitButtonDisabled: boolean = false;
  private requested: boolean = false;
  private oops: boolean = false;
  private teamSelected: any = null;
  private sender: any = null;

  constructor(
    private _router : Router,
    private _formBuilder: FormBuilder,
    private _userService: UserService,
    private dialog: MatDialog,
    private rote: ActivatedRoute,
  ) {
    this.rote.queryParams.subscribe(res => {
      this.sender = jwtdecode(res.token)
    })
  }

  ngOnInit() {
    this._createForm();
    this.inputHandler()
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

  private _createForm(){
    this.formRequest = this._formBuilder.group({
      email: ['', [Validators.required, Validators.minLength(10), Validators.email]],
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  selectTeam() {
    const dialogRef = this.dialog.open(FavotiteTeamComponent, {
      width: "700px",
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.teamSelected = result;
    });
  }

  public submitForm(){
    if (this.formRequest.invalid) {
      return;
    }
    const data = Object.assign(this.formRequest.value, {favoriteTeam: `${this.teamSelected.city} ${this.teamSelected.title}`}, {referredBy: this.sender ? this.sender : {senderEmail: "N/A"}});
    data.email = data.email.toLocaleLowerCase();
    this._userService.sendRequest(data).subscribe(res => {
      this.requested = true;
    }, err => {
      this.oops = true;
      setTimeout(() => {
        this._router.navigate(['login']);
      }, 3000)})
  }

}
