import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LibraryRoutingModule } from './library/library-routing.module';
import { LibraryModule } from './library/library.module';
import { LibraryAdminModule } from './library-admin/library-admin.module';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import {CommonModule} from "@angular/common";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {NgxPaginationModule} from "ngx-pagination";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
  MatButtonModule,
  MatDatepickerModule,
  MatDialogModule,
  MatFormFieldModule, MatInputModule,
  MatSelectModule
} from "@angular/material";
import {ClipboardModule} from "ngx-clipboard";
import {CountdownTimerModule} from "ngx-countdown-timer";
import {LibraryComponent} from "./library/library.component";
import {LibraryAdminComponent} from "./library-admin/library-admin.component";
import { RouterModule, Routes } from '@angular/router';
import { Router } from '@angular/router';
import {AuthService} from "./library/service/auth.service";
import {UserService} from "./library/service/user.service";

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatInputModule,
    ClipboardModule,
    CountdownTimerModule.forRoot(),
    AppRoutingModule,
    LibraryModule,
    LibraryAdminModule,
    MatFormFieldModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {

  constructor(router: Router) {
  }
}
