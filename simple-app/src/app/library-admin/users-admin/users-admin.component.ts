import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from "../../library/model/user.model";
import {UserService} from "../../library/service/user.service";
import {HttpErrorResponse} from "@angular/common/http";
import {MatDialog, MatDialogConfig} from "@angular/material";
import {EditUserDialogComponent} from "./edit-user-dialog/edit-user-dialog.component";
import {ConfirmationDialogComponent} from "../../library/dialog/confirmation-dialog/confirmation-dialog.component";
import {AddUserDialogComponent} from "./add-user-dialog/add-user-dialog.component";
import {Book} from "../../library/model/book.model";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-users-admin',
  templateUrl: './users-admin.component.html',
  styleUrls: ['./users-admin.component.css']
})
export class UsersAdminComponent implements OnInit {

  private users: User[];
  searchText: string;
  displayedColumns = ['id', 'firstName', 'lastName', 'userName', 'email', 'role', 'edit', 'delete'];
  dataSource: MatTableDataSource<User>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private userService: UserService, private dialog: MatDialog) {
    this.getUsers();
  }

  ngOnInit() {
  }

  deleteUser(id: number) {
      this.openConfirmationDialog(id);
   }

  editUser(id: number) {
      const dialogConfig = new MatDialogConfig();

      dialogConfig.data = {
        title: "Edit user",
        object: this.getUserById(id),
      };

      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '27%';

      const dialogRef = this.dialog.open(EditUserDialogComponent, dialogConfig);

      dialogRef.afterClosed().subscribe(
        data => {
          if (data != null) {
            this.userService.updateUser(data).subscribe (resp => {
                location.reload();
              },
              (error: HttpErrorResponse) => {
                console.log(error);
              });
          } }
      );
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
          this.userService.deleteUserById(id);
          location.reload();
        }
      }
    );
  }

  getUsers() {
    this.userService.getAllUsers().subscribe(
      data => {
        this.users = data;
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
        console.log(error);
      }
    )
  }

  addUser() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      title: "Add new user"
    };

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '27%';

    this.dialog.open(AddUserDialogComponent, dialogConfig);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  getUserById(id: number): User {
    return this.users.find(x => x.id === id);
  }
}
