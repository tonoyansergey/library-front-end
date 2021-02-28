import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {BookingData} from "../../../library/model/booking-data.model";

@Component({
  selector: 'app-lend-book-dialog',
  templateUrl: './loan-book-dialog.component.html',
  styleUrls: ['./loan-book-dialog.component.css']
})
export class LoanBookDialogComponent implements OnInit {

  private title: string;
  private bookingData: BookingData;
  private form: FormGroup;

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<LoanBookDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data) {

    this.title = data.title;
    this.bookingData = data.bookingData;

    this.form = fb.group({
      user: [this.bookingData.user, [Validators.required, Validators.minLength(2), Validators.maxLength(45)]],
      book: [this.bookingData.book, Validators.required],
      loanDays: ["5", Validators.required]
    });
  }

  ngOnInit() {
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.form.controls[controlName].hasError(errorName);
  };
}
