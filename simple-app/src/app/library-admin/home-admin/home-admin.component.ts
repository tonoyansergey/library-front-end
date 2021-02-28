import {Component, OnInit, ViewChild} from '@angular/core';
import {RestService} from "../../library/service/rest.service";
import {TopBook} from "../../library/model/top-book.model";
import {HttpErrorResponse} from "@angular/common/http";
import {MatDatepicker} from "@angular/material/datepicker";
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {MatTableDataSource} from "@angular/material/table";
import {Loan} from "../../library/model/loan.model";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ShowBookInfoDialogComponent} from "../util/dialog/show-book-info-dialog/show-book-info-dialog.component";
import {Book} from "../../library/model/book.model";

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css'],
})

export class HomeAdminComponent implements OnInit {

  private topBooks: TopBook[];
  private topGenres: TopBook[];
  private topAuthors: TopBook[];
  private statisticsBookLoans: TopBook[];
  minDate = new Date(2019, 7, 1);
  maxDate = new Date();
  day = new Date().setHours(0, 0, 0, 0);
  form: FormGroup;
  private total: number = 0;
  searchText: string;
  displayedColumns = ['id', 'title', 'count'];
  bookDataSource: MatTableDataSource<TopBook>;
  genreDataSource: MatTableDataSource<TopBook>;
  authorDataSource: MatTableDataSource<TopBook>;
  bookDisplayedColumns = ['id', 'title', 'genre', 'author', 'quantity'];
  dataSource: MatTableDataSource<TopBook>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private restService: RestService, private fb: FormBuilder, private datePipe: DatePipe, private dialog: MatDialog) {
    this.form = fb.group({
      startDate: [new Date(this.day), [Validators.required]],
      endDate: [this.maxDate, [Validators.required]]
    });
    this.getTopFiveBooks();
    this.getTopFiveGenres();
    this.getTopFiveAuthors();
  }

  ngOnInit() {

  }

  submit(form: FormGroup) {
    this.restService.doPostAndGet<TopBook>("/api/loan/top/book",
      {startDate: this.datePipe.transform(form.value.startDate, 'yyyy-MM-dd\'T\'HH:mm:ss.SSSZ'),
        endDate: this.datePipe.transform(form.value.endDate, 'yyyy-MM-dd\'T\'HH:mm:ss.SSSZ')}).subscribe(
      data => {
        this.statisticsBookLoans = data;
        this.calcTotalCount(data);
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
        if (error.status == 404) {
            this.statisticsBookLoans = null;
            this.total = 0;
        }
      }
    );
  }

  getTopFiveBooks() {
    this.restService.doGet<TopBook>("/api/loan/top/book").subscribe(
      data => {
        this.topBooks = data;
        this.bookDataSource = new MatTableDataSource(data);
        this.bookDataSource.paginator = this.paginator;
        this.bookDataSource.sortingDataAccessor = (item, property) => {
          if (property.includes('.')) return property.split('.').reduce((o,i)=>o[i], item);
          return item[property];
        };
        this.bookDataSource.filterPredicate = (data: any, filter) => {
          const dataStr =JSON.stringify(data).toLowerCase();
          return dataStr.indexOf(filter) != -1;
        };
        this.bookDataSource.sort = this.sort;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    )
  }

  getTopFiveGenres() {
    this.restService.doGet<TopBook>("/api/loan/top/book/genre").subscribe(
      data => {
        this.topGenres = data;
        this.genreDataSource = new MatTableDataSource(data);
        this.genreDataSource.paginator = this.paginator;
        this.genreDataSource.sortingDataAccessor = (item, property) => {
          if (property.includes('.')) return property.split('.').reduce((o,i)=>o[i], item);
          return item[property];
        };
        this.genreDataSource.filterPredicate = (data: any, filter) => {
          const dataStr =JSON.stringify(data).toLowerCase();
          return dataStr.indexOf(filter) != -1;
        };
        this.genreDataSource.sort = this.sort;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    )
  }

  getTopFiveAuthors() {
    this.restService.doGet<TopBook>("/api/loan/top/book/author").subscribe(
      data => {
        this.topAuthors = data;
        this.authorDataSource = new MatTableDataSource(data);
        this.authorDataSource.paginator = this.paginator;
        this.authorDataSource.sortingDataAccessor = (item, property) => {
          if (property.includes('.')) return property.split('.').reduce((o,i)=>o[i], item);
          return item[property];
        };
        this.authorDataSource.filterPredicate = (data: any, filter) => {
          const dataStr =JSON.stringify(data).toLowerCase();
          return dataStr.indexOf(filter) != -1;
        };
        this.authorDataSource.sort = this.sort;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    )
  }

  setDay(pickerStart: MatDatepicker<Date>, pickerEnd: MatDatepicker<Date>) {
    pickerStart.select(new Date(this.day));
    pickerEnd.select(this.maxDate);
  }

  setWeek(pickerStart: MatDatepicker<Date>, pickerEnd: MatDatepicker<Date>) {
    let current = new Date(this.day);
    let weekstart = current.getDate() - current.getDay() + 1;
    let monday = new Date(current.setDate(weekstart));
    pickerStart.select(monday);
    pickerEnd.select(this.maxDate);
  }

  setMonth(pickerStart: MatDatepicker<Date>, pickerEnd: MatDatepicker<Date>) {
    let date = new Date(), y = date.getFullYear(), m = date.getMonth();
    let firstDay = new Date(y, m, 1);
    pickerStart.select(firstDay);
    pickerEnd.select(this.maxDate);
  }

  calcTotalCount(array: any[]) {
    this.total = 0;
   array.forEach(value => this.total = this.total + value.count);
  }

  showBookInfo(id: number) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      title: "Book info",
      object: this.topBooks[id].object
    };

    dialogConfig.autoFocus = true;
    dialogConfig.width = '27%';

    this.dialog.open(ShowBookInfoDialogComponent, dialogConfig);
  }

  getBookById(id: number): TopBook {
    return this.topBooks.find(x => x.id === id);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
