import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material";
import {AuthService} from "../../service/auth.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Book} from "../../model/book.model";
import {ReceiptDialogComponent} from "../receipt-dialog/receipt-dialog.component";
import {toNumbers} from "@angular/compiler-cli/src/diagnostics/typescript_version";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent implements OnInit {

  private title: string;
  private url: string = '/api/booking/order';
  private theBook: Book;
  private rCode: string;
  private form: FormGroup;

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<EmailVerificationComponent>,
              @Inject(MAT_DIALOG_DATA) data,
              private tokenService: AuthService,
              private http: HttpClient, public dialog: MatDialog) {

    this.title = data.title;
    this.theBook = data.book;
    this.form = fb.group({
      verCode: ["", [Validators.required, Validators.maxLength(6), Validators.minLength(6)]],
    });
  }

  ngOnInit() {
  }

  submitVCode(vCode: string) {
    const headers = new HttpHeaders({'auth': this.tokenService.getTokenFromCookie()});
    // const body = {userID: this.tokenService.getUIDFromCookie(), bookID: this.theBook.id.toString(), vCode: vCode};

    this.http.post(this.url, { userID: parseInt(this.tokenService.getUIDFromCookie()),  bookID: this.theBook.id, verCode: vCode },{headers, observe: 'response' , responseType: 'text'}).subscribe(
      resp => {
        this.rCode = resp.body;
        this.openConfirmationDialog();
      },
      error => {
        this.form.controls.verCode.setErrors({'wrongCode': true});
        console.log(error);
      });
  }

  openConfirmationDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      title: "Your Receipt Code",
      rCode: this.rCode
    };

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "20%";


    this.dialog.open(ReceiptDialogComponent, dialogConfig);
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.form.controls[controlName].hasError(errorName);
  };
}
