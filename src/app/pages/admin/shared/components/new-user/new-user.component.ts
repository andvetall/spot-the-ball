import { UserService } from './../../../../../services/user.service';
import { Component, OnInit, ViewChild, Inject } from "@angular/core";
import { FormGroup, FormControl, Validators, NgForm } from "@angular/forms";
import { PasswordGen1, PasswordGen2 } from 'src/app/shared/constants/password.generator';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FavotiteTeamComponent } from 'src/app/shared/components/favotite-team/favotite-team.component';

@Component({
  selector: "new-user",
  templateUrl: "./new-user.component.html",
  styleUrls: ["./new-user.component.scss"],
})
export class NewUserComponent implements OnInit {
  form: FormGroup;
  res = this.generateP();

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    ) {}

  ngOnInit() {
    if(this.data.type == 'update'){
      this.form = new FormGroup({
        _id: new FormControl(this.data._id), 
        email: new FormControl(this.data.email ? this.data.email.toLocaleLowerCase() : null, [Validators.required, Validators.email]),
        password: new FormControl(this.data.password ? this.data.password : this.res, [
          Validators.required,
          Validators.minLength(6),
        ]),
        firstName: new FormControl(this.data.firstName ? this.data.firstName : null, Validators.required),
        lastName: new FormControl(this.data.lastName ? this.data.lastName : null, Validators.required),
        favoriteTeam: new FormControl(this.data.favoriteTeam ? this.data.favoriteTeam : null,  Validators.required),
        gameType: new FormControl(this.data.gameType ? this.data.gameType : null, Validators.required),
        role: new FormControl(this.data.role ? this.data.role : "user", Validators.required),
        referredBy: new FormControl(this.data.type === "add" ? "Admin" : this.data.referredBy.senderEmail , Validators.required),
        rate: new FormControl(this.data.rate ? this.data.rate : null, Validators.required)
      });
    } else {
      this.form = new FormGroup({
        _id: new FormControl(this.data._id), 
        email: new FormControl(this.data.email ? this.data.email.toLocaleLowerCase() : null, [Validators.required, Validators.email]),
        password: new FormControl(this.data.password ? this.data.password : this.res, [
          Validators.required,
          Validators.minLength(6),
        ]),
        firstName: new FormControl(this.data.firstName ? this.data.firstName : null, Validators.required),
        lastName: new FormControl(this.data.lastName ? this.data.lastName : null, Validators.required),
        favoriteTeam: new FormControl(this.data.favoriteTeam ? this.data.favoriteTeam : null,  Validators.required),
        gameType: new FormControl(this.data.gameType ? this.data.gameType : null, Validators.required),
        role: new FormControl(this.data.role ? this.data.role : "user", Validators.required),
        referredBy: new FormControl(this.data.type === "add" ? "Admin" : this.data.referredBy.senderEmail , Validators.required),
      });
    }
  }

  submit() {
    const data = this.form.value;
    data.email = data.email.toLocaleLowerCase();
    data.referredBy = {senderEmail: this.form.value.referredBy};
    data.rate = null;
    this.userService.addUser(data).subscribe((res) => {
      this.toastr.success('User created');
    }, err => err );
    this.userService.getAllUsers().subscribe(res => res, err => err)
  }

  invite() {
    const data = this.form.value;
    data.email = data.email.toLocaleLowerCase();
    data.referredBy = {senderEmail: this.form.value.referredBy};
    this.userService.addUser(data).subscribe((res) => res, err => err)
    this.userService.deleteRequest(data.email).subscribe(res => res, err => err)
  }

  selectTeam() {
    const dialogRef = this.dialog.open(FavotiteTeamComponent, {
      width: "700px",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        this.form.controls.favoriteTeam.setValue(`${result.city} ${result.title}`)
      }
    });
  }

  update() {
    const data = this.form.value;
    data.email = data.email.toLocaleLowerCase();
    data.referredBy = {senderEmail: this.form.value.referredBy};
    this.userService.updateUserInfo(data).subscribe(res => {
      this.toastr.success('User updated');
    }, err => {
      this.toastr.error(err);
    })
    this.userService.getAllUsers().subscribe(res => res, err => err)
  }

  generateP() {
    var pass = "";
    var str: string = PasswordGen1 + PasswordGen2;
    for (let i = 1; i <= 12; i++) {
      var char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    return pass;
  }

}