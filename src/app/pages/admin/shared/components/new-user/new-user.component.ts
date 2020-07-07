import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormControl, Validators, NgForm } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
import { PasswordGen1, PasswordGen2 } from 'src/app/shared/constants/password.generator';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: "new-user",
  templateUrl: "./new-user.component.html",
  styleUrls: ["./new-user.component.scss"],
})
export class NewUserComponent implements OnInit {
  form: FormGroup;
  res = this.generateP();

  constructor(
    private authService: AuthService,
    private toastr: ToastrService
    ) {}

  ngOnInit() {
    this.createForm()
  }

  createForm() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(this.res, [
        Validators.required,
        Validators.minLength(6),
      ]),
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      gameType: new FormControl(null, Validators.required),
      role: new FormControl("user", Validators.required),
    });
  }

  submit() {
    this.authService.addUser(this.form.value).subscribe((res) => {
      this.toastr.success('User created');
      this.createForm();
    }, err => {
      this.createForm();
    } );
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