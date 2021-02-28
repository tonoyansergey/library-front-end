import {Component, OnInit, ViewChild} from '@angular/core';
import {BookingData} from "../../library/model/booking-data.model";
import {RestService} from "../../library/service/rest.service";
import {HttpErrorResponse} from "@angular/common/http";
import {MatDialog, MatDialogConfig} from "@angular/material";
import {ConfirmationDialogComponent} from "../../library/dialog/confirmation-dialog/confirmation-dialog.component";
import {LoanBookDialogComponent} from "./loan-book-dialog/loan-book-dialog.component";
import {DatePipe} from "@angular/common";
import {ShowModelInfoDialogComponent} from "../util/dialog/show-model-info-dialog/show-model-info-dialog.component";
import {ShowBookInfoDialogComponent} from "../util/dialog/show-book-info-dialog/show-book-info-dialog.component";
import {Loan} from "../../library/model/loan.model";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-bookings-admin',
  templateUrl: './bookings-admin.component.html',
  styleUrls: ['./bookings-admin.component.css']
})
export class BookingsAdminComponent implements OnInit {

  bookings: BookingData[];
  loanDate: string;
  expireDate: string;
  searchText: string;
  displayedColumns = ['id', 'user', 'book', 'receiptCode', 'timer', 'accept', 'reject'];
  dataSource: MatTableDataSource<BookingData>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private restService: RestService, private dialog: MatDialog, private datePipe: DatePipe) {
    this.loanDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd\'T\'HH:mm:ss.SSSZ');
    this.initBookings();
  }

  ngOnInit() {
  }

  initBookings() {
    this.restService.doGet<BookingData>("/api/booking/records").subscribe(
      data => {
        this.bookings = data;
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sortingDataAccessor = (item, property) => {
          if (property.includes('.')) return property.split('.').reduce((o,i)=>o[i], item);
          return item[property];
        };
        this.dataSource.filterPredicate = (data: any, filter) => {
          const dataStr = JSON.stringify(data).toLowerCase();
          return dataStr.indexOf(filter) != -1;
        };
        this.dataSource.sort = this.sort;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

  acceptBooking(id: number) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      title: "Confirm loan",
      bookingData: this.getBookingById(id)
    };

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '27%';

    const dialogRef = this.dialog.open(LoanBookDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if (data != null) {
          this.expireDate = this.datePipe.transform(new Date().setDate(new Date().getDate() + Number(data.loanDays)), 'yyyy-MM-dd\'T\'HH:mm:ss.SSSZ');
          const body = {"user": data.user, "book": data.book, "loanDate": this.loanDate, "expireDate": this.expireDate};
          this.restService.doPost("/api/loan/records/add", body).subscribe(resp => {
            this.restService.doDelete("/api/booking/records/delete/", id);
            location.reload();
            },
            (error: HttpErrorResponse) => {
              console.log(error);
            });
        }});
  }

  showUserInfo(id: number) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      title: "User info",
      object: this.getBookingById(id).user
    };

    dialogConfig.autoFocus = true;
    dialogConfig.width = '27%';

    this.dialog.open(ShowModelInfoDialogComponent, dialogConfig);
  }

  showBookInfo(id: number) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      title: "Book info",
      object: this.getBookingById(id).book
    };

    dialogConfig.autoFocus = true;
    dialogConfig.width = '27%';

    this.dialog.open(ShowBookInfoDialogComponent, dialogConfig);
  }

  rejectBooking(id: number) {
      const dialogConfig = new MatDialogConfig();

      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.direction = "rtl";
      dialogConfig.width = "20%";

      const dialogRef = this.dialog.open(ConfirmationDialogComponent, dialogConfig);

      dialogRef.afterClosed().subscribe(
        data => {
          if (data == true) {
            this.restService.doDelete("/api/booking/records/delete/", id);
            location.reload();
          }
        }
      );
    }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  getBookingById(id: number): BookingData {
    return this.bookings.find(x => x.id === id);
  }
}
