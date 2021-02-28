import { NgModule } from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {NgxPaginationModule} from "ngx-pagination";
import {CookieService} from "ngx-cookie-service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
  MatButtonModule, MatDatepickerModule,
  MatDialogModule, MatFormFieldModule, MatInputModule, MatSelectModule
} from "@angular/material";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClipboardModule } from 'ngx-clipboard';
import { CountdownTimerModule } from 'ngx-countdown-timer';
import {LibraryComponent} from "./library.component";
import {ChangePasswordDialogComponent} from "./component/profile/change-password-dialog/change-password-dialog.component";
import {EditProfileDialogComponent} from "./component/profile/edit-profile/edit-profile-dialog.component";
import {ConfirmationDialogComponent} from "./dialog/confirmation-dialog/confirmation-dialog.component";
import {ReceiptDialogComponent} from "./dialog/receipt-dialog/receipt-dialog.component";
import {EmailVerificationComponent} from "./dialog/email-verification/email-verification.component";
import {BookingDialogComponent} from "./dialog/booking-dialog/booking-dialog.component";
import {AppRoutingModule} from "../app-routing.module";
import {ProfileComponent} from "./component/profile/profile.component";
import {LoginComponent} from "./component/login/login.component";
import {SignUpComponent} from "./component/sign-up/sign-up.component";
import {BookComponent} from "./component/book/book.component";
import {HomeComponent} from "./component/home/home.component";
import {LibraryRoutingModule} from "./library-routing.module";
import {CommonModule, DatePipe} from "@angular/common";
import {AuthService} from "./service/auth.service";
import {UserService} from "./service/user.service";
import {FilterPipe} from "./filter.pipe";

// http client check role admin
@NgModule({
  imports: [
    CommonModule,
    NgxPaginationModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatInputModule,
    ClipboardModule,
    LibraryRoutingModule,
    CountdownTimerModule.forRoot(),
    ReactiveFormsModule
  ],
  declarations: [
    HomeComponent,
    BookComponent,
    SignUpComponent,
    LoginComponent,
    BookingDialogComponent,
    EmailVerificationComponent,
    ReceiptDialogComponent,
    ProfileComponent,
    ConfirmationDialogComponent,
    EditProfileDialogComponent,
    ChangePasswordDialogComponent,
    LibraryComponent,
    FilterPipe
  ],
  entryComponents: [BookingDialogComponent,
    EmailVerificationComponent,
    ReceiptDialogComponent,
    ConfirmationDialogComponent,
    EditProfileDialogComponent,
    ChangePasswordDialogComponent],
  providers: [CookieService, DatePipe]})
export class LibraryModule { }
