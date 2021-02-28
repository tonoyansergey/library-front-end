import { Component, OnInit } from '@angular/core';
import {BookService} from "../../service/book.service";
import {Book} from "../../model/book.model";
import {MatDialog, MatDialogConfig} from '@angular/material';
import {BookingDialogComponent} from "../../dialog/booking-dialog/booking-dialog.component";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {RestService} from "../../service/rest.service";


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  p: number = 1;
  books: Book[];
  searchText: string;


  constructor(private bookService: BookService, public dialog: MatDialog, private router: Router, private restService: RestService) {
  }

  ngOnInit() {
    this.restService.doGet<Book>("/api/books").subscribe(
      data => {this.books = data
      },
      (error: HttpErrorResponse) => {
        if (error.status == 401) {
          this.router.navigate(['./']);
        }
      }
      );
  }

  openBookingDialog(book: Book) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      title: "Booking",
      book: book
    };

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '23%';


    this.dialog.open(BookingDialogComponent, dialogConfig);
  }
}
