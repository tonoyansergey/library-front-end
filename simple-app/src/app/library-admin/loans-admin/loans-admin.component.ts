import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material";
import {HttpErrorResponse} from "@angular/common/http";
import {ConfirmationDialogComponent} from "../../library/dialog/confirmation-dialog/confirmation-dialog.component";
import {RestService} from "../../library/service/rest.service";
import {Loan} from "../../library/model/loan.model";
import {UserService} from "../../library/service/user.service";
import {ShowModelInfoDialogComponent} from "../util/dialog/show-model-info-dialog/show-model-info-dialog.component";
import {ShowBookInfoDialogComponent} from "../util/dialog/show-book-info-dialog/show-book-info-dialog.component";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-loans-admin',
  templateUrl: './loans-admin.component.html',
  styleUrls: ['./loans-admin.component.css']
})
export class LoansAdminComponent implements OnInit {

  private loans: Loan[];
  searchText: string;
  displayedColumns = ['id', 'user', 'book', 'loanDate', 'expireDate', 'timer', 'delete'];
  dataSource: MatTableDataSource<Loan>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private restService: RestService, private dialog: MatDialog, private userService: UserService) {
    this.getLoans();
  }

  ngOnInit() {
  }

  deleteLoan(id: number) {
    this.restService.doDelete("/api/loan/records/delete/",id);
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
          this.deleteLoan(id);
        }
      }
    );
  }

  showUserInfo(id: number) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      title: "User info",
      object: this.getLoanById(id).user
    };

    dialogConfig.autoFocus = true;
    dialogConfig.width = '27%';

    this.dialog.open(ShowModelInfoDialogComponent, dialogConfig);
  }

  showBookInfo(id: number) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      title: "Book info",
      object: this.getLoanById(id).book
    };

    dialogConfig.autoFocus = true;
    dialogConfig.width = '27%';

    this.dialog.open(ShowBookInfoDialogComponent, dialogConfig);
  }

  getLoans() {
    this.restService.doGet<Loan>("/api/loan/records").subscribe(
      data => {
        this.loans = data;
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sortingDataAccessor = (item, property) => {
          if (property.includes('.')) return property.split('.').reduce((o,i)=>o[i], item);
          return item[property];
        };
        this.dataSource.filterPredicate = (data: any, filter) => {
          const dataStr =JSON.stringify(data).toLowerCase();
          return dataStr.indexOf(filter) != -1;
        };
        this.dataSource.sort = this.sort;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  getLoanById(id: number): Loan {
    return this.loans.find(x => x.id === id);
  }
}
