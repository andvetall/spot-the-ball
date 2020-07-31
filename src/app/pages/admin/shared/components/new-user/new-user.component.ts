import { UserService } from './../../../../../services/user.service';
import { Component, OnInit, ViewChild, Inject } from "@angular/core";
import { FormGroup, FormControl, Validators, NgForm } from "@angular/forms";
import { PasswordGen1, PasswordGen2 } from 'src/app/shared/constants/password.generator';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

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
    ) {}

  ngOnInit() {
      this.form = new FormGroup({
        _id: new FormControl(this.data._id), 
        email: new FormControl(this.data.email ? this.data.email : null, [Validators.required, Validators.email]),
        password: new FormControl(this.data.password ? this.data.password : this.res, [
          Validators.required,
          Validators.minLength(6),
        ]),
        firstName: new FormControl(this.data.firstName ? this.data.firstName : null, Validators.required),
        lastName: new FormControl(this.data.lastName ? this.data.lastName : null, Validators.required),
        gameType: new FormControl(this.data.gameType ? this.data.gameType : null, Validators.required),
        role: new FormControl(this.data.role ? this.data.role : "user", Validators.required),
      });
  }

  submit() {
    this.userService.addUser(this.form.value).subscribe((res) => {
      this.toastr.success('User created');
    }, err => err );
    this.userService.getAllUsers().subscribe(res => res, err => err)
  }

  invite() {
    this.userService.addUser(this.form.value).subscribe((res) => {
      this.userService.deleteRequest(this.form.value.email).subscribe(res => {
        this.userService.getAllUsers().subscribe(res => {
          this.userService.setAllUsers(res)
        }, err => err)
        this.toastr.success('User created');
      }, err => err)
    }, err => err );
    
  }

  update() {
    this.userService.updateUserInfo(this.form.value).subscribe(res => {
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