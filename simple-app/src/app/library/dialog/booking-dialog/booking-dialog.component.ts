import {Component, Inject, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material";
import {Book} from "../../model/book.model";
import {AuthService} from "../../service/auth.service";
import {EmailVerificationComponent} from "../email-verification/email-verification.component";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RestService} from "../../service/rest.service";

@Component({
  selector: "app-booking-dialog",
  templateUrl: "./booking-dialog.component.html",
  styleUrls: ["./booking-dialog.component.css"]
})
export class BookingDialogComponent implements OnInit {

  private title: string;
  theBook: Book;
  url: string = "/api/verification/email";
  private form: FormGroup;
  private emailPattern: string = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@" + "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";

  constructor(  private fb: FormBuilder, private dialogRef: MatDialogRef<BookingDialogComponent>,
                @Inject(MAT_DIALOG_DATA) data,
                private authService: AuthService,
                public dialog: MatDialog,
                private restService: RestService) {

    this.title = data.title;

    this.theBook = data.book;
    this.form = fb.group({
      book: [this.theBook.title],
      genre: [this.theBook.genre.genreName],
      author: [this.theBook.author.authorName],
      email: ["", [Validators.required, Validators.pattern(this.emailPattern)]],
    });
  }

  ngOnInit() {
  }

  verifyEmail(email: string) {
    if (email == this.authService.getEmailFromCookie()) {
      this.restService.doPost(this.url, parseInt(this.authService.getUIDFromCookie())).subscribe(
        resp => {
          this.openEmailVerifyDialog();
        },
        error => {
          console.log(error);
        });
    } else {
      this.form.controls.email.setErrors({'wrongEmail': true});
    }
  }

  openEmailVerifyDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      title: "Email verification",
      book: this.theBook
    };

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "20%";

    this.dialog.open(EmailVerificationComponent, dialogConfig);
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.form.controls[controlName].hasError(errorName);
  };
}
