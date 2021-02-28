import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LibraryAdminComponent} from "./library-admin.component";
import {AuthGuard} from "../auth/auth.guard";
import {LoginAdminComponent} from "./login-admin/login-admin.component";
import {HomeAdminComponent} from "./home-admin/home-admin.component";
import {UsersAdminComponent} from "./users-admin/users-admin.component";
import {BooksAdminComponent} from "./books-admin/books-admin.component";
import {BookingsAdminComponent} from "./bookings-admin/bookings-admin.component";
import {LoansAdminComponent} from "./loans-admin/loans-admin.component";


const adminRoutes: Routes = [
  { path: "", component: LibraryAdminComponent,
    children: [
      {path: "login", component: LoginAdminComponent},
      {path: "users", component: UsersAdminComponent},
      {path: "books", component: BooksAdminComponent},
      {path: "bookings", component: BookingsAdminComponent},
      {path: "loans", component: LoansAdminComponent},
      {path: "", component: HomeAdminComponent}
    ]}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})

export class LibraryAdminRoutingModule { }
