import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LibraryAdminComponent} from "./library-admin.component";
import {AppRoutingModule} from "../app-routing.module";
import {LibraryAdminRoutingModule} from "./library-admin-routing.module";
import { LoginAdminComponent } from './login-admin/login-admin.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { UsersAdminComponent } from './users-admin/users-admin.component';
import { BookingsAdminComponent } from './bookings-admin/bookings-admin.component';
import { BooksAdminComponent } from './books-admin/books-admin.component';
import { LoansAdminComponent } from './loans-admin/loans-admin.component';
import { EditUserDialogComponent } from './users-admin/edit-user-dialog/edit-user-dialog.component';
import {
  MatButtonModule,
  MatDatepickerModule,
  MatDialogModule,
  MatFormFieldModule, MatInputModule,
  MatSelectModule
} from "@angular/material";
import { AddUserDialogComponent } from './users-admin/add-user-dialog/add-user-dialog.component';
import { EditBookDialogComponent } from './books-admin/edit-book-dialog/edit-book-dialog.component';
import { AddBookDialogComponent } from './books-admin/add-book-dialog/add-book-dialog.component';
import { AddGenreDialogComponent } from './books-admin/add-genre-dialog/add-genre-dialog.component';
import { AddAuthorDialogComponent } from './books-admin/add-author-dialog/add-author-dialog.component';
import {CountdownTimerModule} from "ngx-countdown-timer";
import { LoanBookDialogComponent } from './bookings-admin/loan-book-dialog/loan-book-dialog.component';
import {MatNativeDateModule} from "@angular/material/core";
import { FilterPipe } from './filter.pipe';
import {MatSortModule} from "@angular/material/sort";
import {MatTabsModule} from "@angular/material/tabs";
import { ShowModelInfoDialogComponent } from './util/dialog/show-model-info-dialog/show-model-info-dialog.component';
import { ShowBookInfoDialogComponent } from './util/dialog/show-book-info-dialog/show-book-info-dialog.component';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";

@NgModule({
  imports: [
    CommonModule,
    LibraryAdminRoutingModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatInputModule,
    CountdownTimerModule,
    MatNativeDateModule,
    MatSortModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule
  ],
  declarations: [
    LibraryAdminComponent,
    LoginAdminComponent,
    HomeAdminComponent,
    UsersAdminComponent,
    BookingsAdminComponent,
    BooksAdminComponent,
    LoansAdminComponent,
    EditUserDialogComponent,
    AddUserDialogComponent,
    EditBookDialogComponent,
    AddBookDialogComponent,
    AddGenreDialogComponent,
    AddAuthorDialogComponent,
    LoanBookDialogComponent,
    FilterPipe,
    ShowModelInfoDialogComponent,
    ShowBookInfoDialogComponent
  ],
  entryComponents: [EditUserDialogComponent,
                    AddUserDialogComponent,
                    EditBookDialogComponent,
                    AddBookDialogComponent,
                    AddGenreDialogComponent,
                    AddAuthorDialogComponent,
                    LoanBookDialogComponent,
                    ShowModelInfoDialogComponent,
                    ShowBookInfoDialogComponent]
})
export class LibraryAdminModule { }
