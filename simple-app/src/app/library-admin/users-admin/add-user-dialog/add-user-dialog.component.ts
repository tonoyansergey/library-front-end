import {Component, Inject, OnInit} from '@angular/core';
import {User} from "../../../library/model/user.model";
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {UserService} from "../../../library/service/user.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.css']
})
export class AddUserDialogComponent implements OnInit {

  private title: string;
  private form: FormGroup;
  private emailPattern: string = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@" + "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<AddUserDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data,
              private userService: UserService) {

    this.title = data.title;

    this.form = fb.group({
      firstName: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      lastName: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      userName: ["", [Validators.minLength(5), Validators.maxLength(25), Validators.required]],
      password: ["", [Validators.minLength(5), Validators.maxLength(25), Validators.required]],
      email: ["", [Validators.required, Validators.pattern(this.emailPattern)]],
      role: ["", Validators.required],
    });
  }

  ngOnInit() {
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.form.controls[controlName].hasError(errorName);
  };

  addUser() {
    this.userService.addUser(this.form).subscribe(
      resp => {
        console.log(resp);
        this.dialogRef.close();
        location.reload();
      },
      (error: HttpErrorResponse) => {
        if (error.status == 400) {
          this.form.controls.userName.setErrors({'usernameExists': true});
        }
      });

  }
}
