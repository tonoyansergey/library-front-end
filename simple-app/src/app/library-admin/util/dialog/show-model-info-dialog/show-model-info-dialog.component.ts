import {Component, Inject, OnInit} from '@angular/core';
import {User} from "../../../../library/model/user.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../../../../library/service/user.service";

@Component({
  selector: 'app-show-model-info-dialog',
  templateUrl: './show-model-info-dialog.component.html',
  styleUrls: ['./show-model-info-dialog.component.css']
})
export class ShowModelInfoDialogComponent implements OnInit {

  private title: string;
  private user: User;
  private form: FormGroup;

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<ShowModelInfoDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data,
              private profileService: UserService) {

    this.title = data.title;
    this.user = data.object;

    this.form = fb.group({
      id: [this.user.id],
      fullName: [this.user.firstName + " " + this.user.lastName],
      userName: [this.user.userName],
      email: [this.user.email],
      role: [this.user.role],
    });
  }

  ngOnInit() {
  }
}
