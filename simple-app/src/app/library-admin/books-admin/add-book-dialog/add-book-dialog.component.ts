import {Component, Inject, OnInit} from '@angular/core';
import {Genre} from "../../../library/model/genre.model";
import {Author} from "../../../library/model/author.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-add-book-dialog',
  templateUrl: './add-book-dialog.component.html',
  styleUrls: ['./add-book-dialog.component.css']
})
export class AddBookDialogComponent implements OnInit {

  private title: string;
  private genres: Genre[];
  private authors: Author[];
  private form: FormGroup;

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<AddBookDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data) {

    this.title = data.title;
    this.genres = data.genres;
    this.authors = data.authors;

    this.form = fb.group({
      title: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(45)]],
      genre: ["", Validators.required],
      author: ["", Validators.required],
      quantity: [null, [Validators.required, Validators.min(0), Validators.pattern("^[0-9]*$")]],
    });
  }

  ngOnInit() {
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.form.controls[controlName].hasError(errorName);
  };
}
