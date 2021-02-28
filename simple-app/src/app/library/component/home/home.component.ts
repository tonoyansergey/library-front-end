import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {AuthService} from "../../service/auth.service";
import {HomeService} from "../../service/home.service";
import {BookingData} from "../../model/booking-data.model";
import {MatDialog, MatDialogConfig} from "@angular/material";
import {ReceiptDialogComponent} from "../../dialog/receipt-dialog/receipt-dialog.component";
import {ConfirmationDialogComponent} from "../../dialog/confirmation-dialog/confirmation-dialog.component";
import {CommonModule} from "@angular/common";
import {EditUserDialogComponent} from "../../../library-admin/users-admin/edit-user-dialog/edit-user-dialog.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private userName: string = null;
  private bookings: BookingData[];

  constructor(private tokenService: AuthService, private homeService: HomeService, public dialog: MatDialog) {

  }

  ngOnInit() {
    this.userName = this.tokenService.getUserDetailsFromCookie();
    this.getBookings();
  }

  getBookings() {
    this.homeService.getBookingRecords().subscribe(
      data => {
        this.bookings = data;
        console.log(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      });
  }


  cancelBooking(id: number) {
    this.openConfirmationDialog(this.bookings[id].id);
  }

  deleteBooking(id: number) {
    this.homeService.deleteBookingRecord(id);
    location.reload();
  }

  openConfirmationDialog(id: number) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.direction = "rtl";
    dialogConfig.width = "20%";

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if (data == true) {
          this.deleteBooking(id);
        }
      }
    );
  }
}
