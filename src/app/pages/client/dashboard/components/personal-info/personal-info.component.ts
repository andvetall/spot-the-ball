import { Component, OnInit } from '@angular/core';
import * as jwtdecode from "jwt-decode";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { sha256 } from "js-sha256";
import { MatDialog } from '@angular/material/dialog';
import { FavotiteTeamComponent } from 'src/app/shared/components/favotite-team/favotite-team.component';
import { nhlTeams } from 'src/app/shared/constants/nhl.comstant';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit {

  public user: any = null;
  public userData: any = null;
  public form: FormGroup;
  public showPassword: boolean = false;
  public showPasswordNew: boolean = false;
  public showPasswordNew1: boolean = false;
  public submitButtonDisabled: boolean = false;
  private hashedPass: string = "";
  private _samePasswordsOld: boolean = false;
  private _samePasswordsNew: boolean = false;
  private teamSelected: any = null;
  public nhlTeams: any = nhlTeams.teamsData;


  constructor(
    private _authService : AuthService,
    private dialog: MatDialog,
    private userService: UserService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.user = jwtdecode(localStorage.getItem('user'));
    this.getUserData();
    this.inputHandler();
  }

  getHash(input: string) {
    const hash = sha256.create();
    hash.update(input);
    const output = hash.hex();
    return output;
  }

  getUserData(){
    this._authService.checkEmail(this.user.email).subscribe(res => {
      if(res) {
        this.userData = res;
        this.teamSelected = this.nhlTeams.find(elem => {
          let target = `${elem.city} ${elem.title}` === res.favoriteTeam
          return target
        })
        this.createForm();
      }
    }, err => err)
  }

  public createForm() {
    this.form = new FormGroup({
      _id: new FormControl(this.userData._id), 
      email: new FormControl(this.userData.email ? this.userData.email.toLocaleLowerCase() : null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(9),
      ]),
      passwordNew: new FormControl({value: null, disabled: true}, [
        Validators.required,
        Validators.minLength(9),
      ]),
      passwordNew1: new FormControl({value: null, disabled: true}, [
        Validators.required,
        Validators.minLength(9),
      ]),
      firstName: new FormControl(this.userData.firstName ? this.userData.firstName : null, Validators.required),
      lastName: new FormControl(this.userData.lastName ? this.userData.lastName : null, Validators.required),
      favoriteTeam: new FormControl(this.userData.favoriteTeam ? this.userData.favoriteTeam : null,  Validators.required),
      // gameType: new FormControl(this.userData.gameType ? this.userData.gameType : null, Validators.required),
      // role: new FormControl(this.userData.role ? this.userData.role : "user", Validators.required),
      // referredBy: new FormControl(this.userData.referredBy ? this.userData.referredBy.senderEmail : "Admin", Validators.required),
    });
  }

  private inputHandler(){
    if(!this.form) {
      this.submitButtonDisabled = false;
      return
    }
    if(this.form.value.password && this.form.value.password.length > 0){
      this.samePasswordsOld();
      if(!this._samePasswordsOld || this.form.value.password.length === 0){
        this.form.controls['passwordNew'].disable()
        this.form.controls['passwordNew'].reset()
        this.form.controls['passwordNew1'].disable()
        this.form.controls['passwordNew1'].reset()
        this.submitButtonDisabled = false;
        return
      } else {
        this.samePasswordsNew();
        this.form.controls['passwordNew'].enable()
        this.form.controls['passwordNew1'].enable()
        if(!this._samePasswordsNew){
          this.submitButtonDisabled = false;
          return
        } else if(!this.form.controls['firstName'].valid || !this.form.controls['lastName'].valid || !this.form.controls['favoriteTeam'].valid) {
          this.submitButtonDisabled = false;
          return
        }
      }
    }
    this.submitButtonDisabled = true;
  }

  private samePasswordsOld() {
    this.hashedPass = this.getHash(this.form.value.password)
    if(this.hashedPass !== this.userData.password){
      this._samePasswordsOld = false;
      return
    }
    this._samePasswordsOld = true;
  }

  private samePasswordsNew() {
    if(!this.form.value.passwordNew){
      this._samePasswordsNew = false;
      return
    }
    if(!this.form.value.passwordNew1){
      this._samePasswordsNew = false;
      return
    }
    if(this.form.value.passwordNew !== this.form.value.passwordNew1 && this.form.controls['passwordNew'].valid){
      this._samePasswordsNew = false;
      return
    }
    this._samePasswordsNew = true;
  }

  selectTeam() {
    const dialogRef = this.dialog.open(FavotiteTeamComponent, {
      width: "700px",
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.teamSelected = result;
      this.inputHandler();
    });
  }

  public showPasswordToggle(pass){
    if(pass === "showPassword"){
      this.showPassword = !this.showPassword;
      return
    }
    if(pass === "showPasswordNew"){
      this.showPasswordNew = !this.showPasswordNew;
      return
    }
    if(pass === "showPasswordNew1"){
      this.showPasswordNew1 = !this.showPasswordNew1;
      return
    }
  }

  submit(){
    this.form.controls['favoriteTeam'].setValue(`${this.teamSelected.city} ${this.teamSelected.title}`)
    const data = this.form.value;
    if(data.password){
      data.password = this.getHash(data.passwordNew)
      data.referredBy = {senderEmail: data.referredBy}
      delete data.passwordNew;
      delete data.passwordNew1;
    } else {
      delete data.password;
      delete data.passwordNew;
      delete data.passwordNew1;
    }
    this.userService.updateUserInfo(data).subscribe(res => {
      this.toastr.success('Account is updated');
      this.userData = data;
      this.form.reset();
      this.createForm()
    }, err => {
      this.toastr.error(err);
    })
  }

}
