import { Component, OnInit } from '@angular/core';
import {UserService} from "../../service/user.service";
import {HttpErrorResponse} from "@angular/common/http";
import {User} from "../../model/user.model";
import {MatDialog, MatDialogConfig} from "@angular/material";
import {EditProfileDialogComponent} from "./edit-profile/edit-profile-dialog.component";
import {ChangePasswordDialogComponent} from "./change-password-dialog/change-password-dialog.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private user: User;

  constructor(private profileService: UserService, private dialog: MatDialog) { }

  ngOnInit() {
    this.getCurrentUserData();
  }

  getCurrentUserData () {
    this.profileService.getUserById().subscribe(
      data => {
        console.log(data);
        this.user = data;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      });
  }

  editProfile() {
    this.openEditProfileDialog();
  }

  changePassword() {
    this.openChangePasswordDialog();
  }

  openEditProfileDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      userData: this.user
    };

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '25%';

    const dialogRef = this.dialog.open(EditProfileDialogComponent, dialogConfig);


    dialogRef.afterClosed().subscribe(
      data => {
        if (data != null) {
        this.profileService.updateUser(data).subscribe (resp => {
          console.log(resp);
        },
          (error: HttpErrorResponse) => {
          console.log(error);
          });
      } }
    );
  }

  openChangePasswordDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      userData: this.user
    };

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '20%';

    const dialogRef = this.dialog.open(ChangePasswordDialogComponent, dialogConfig);

  }
}
