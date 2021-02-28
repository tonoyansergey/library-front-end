import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {UserService} from "../../../service/user.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-change-password-dialog',
  templateUrl: './change-password-dialog.component.html',
  styleUrls: ['./change-password-dialog.component.css']
})
export class ChangePasswordDialogComponent implements OnInit {

  form: FormGroup;
  userName: string;
  id: number;

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<ChangePasswordDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data, private profileService: UserService) {
    this.form = fb.group({
      oldPass: [null, [Validators.required, Validators.maxLength(25)]],
      newPass: [null, [Validators.required, Validators.maxLength(25)]],
    });
    this.userName = data.userData.userName;
    this.id = data.userData.id;
  }

  ngOnInit() {
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.form.controls[controlName].hasError(errorName);
  };

  changePassword() {
    this.profileService.updateUserPassword(this.id, this.userName, this.form.value.oldPass, this.form.value.newPass).subscribe (resp => {
        console.log(resp);
        this.dialogRef.close();
      },
      (error: HttpErrorResponse) => {
        if (error.status == 404) {
          this.form.controls.oldPass.setErrors({'wrong': true});
        }
      });
  }

  cancel() {
    this.dialogRef.close();
  }
}
