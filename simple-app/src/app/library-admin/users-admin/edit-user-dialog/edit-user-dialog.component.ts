import {Component, Inject, OnInit} from '@angular/core';
import {User} from "../../../library/model/user.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {UserService} from "../../../library/service/user.service";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.css']
})
export class EditUserDialogComponent implements OnInit {

  private title: string;
  private user: User;
  private form: FormGroup;
  private emailPattern: string = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@" + "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<EditUserDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data,
              private profileService: UserService) {

    this.title = data.title;
    this.user = data.object;

    this.form = fb.group({
      id: [this.user.id, [Validators.required]],
      firstName: [this.user.firstName, [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      lastName: [this.user.lastName, [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      userName: [this.user.userName, [Validators.minLength(5), Validators.maxLength(25), Validators.required]],
      email: [this.user.email, [Validators.required, Validators.pattern(this.emailPattern)]],
      role: [this.user.role, Validators.required],
    });
  }

  ngOnInit() {
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.form.controls[controlName].hasError(errorName);
  };
}
