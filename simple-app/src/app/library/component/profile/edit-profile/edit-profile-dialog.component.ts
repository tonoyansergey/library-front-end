import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {User} from "../../../model/user.model";
import {UserService} from "../../../service/user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile-dialog.component.html',
  styleUrls: ['./edit-profile-dialog.component.css']
})
export class EditProfileDialogComponent implements OnInit {

  private user: User;
  form: FormGroup;

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<EditProfileDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data, private profileService: UserService) {
    this.user = data.userData;
    this.form = fb.group({
      firstName: [this.user.firstName, [Validators.required, Validators.maxLength(25)]],
      lastName: [this.user.lastName, [Validators.required, Validators.maxLength(25)]],
      email: [{value: this.user.email, disabled: true}, Validators.required],
      userName: [{value: this.user.userName, disabled: true}, Validators.required]
    });
  }

  ngOnInit() {
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.form.controls[controlName].hasError(errorName);
  }

  updateProfileSettings() {
    this.user.firstName = this.form.controls.firstName.value;
    this.user.lastName = this.form.controls.lastName.value;
    this.dialogRef.close(this.user);
    console.log(this.user);
  }

  cancel() {
    this.dialogRef.close();
  }
}
