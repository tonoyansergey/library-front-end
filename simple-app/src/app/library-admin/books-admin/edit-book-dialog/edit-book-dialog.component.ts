import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {Book} from "../../../library/model/book.model";
import {Genre} from "../../../library/model/genre.model";
import {Author} from "../../../library/model/author.model";

@Component({
  selector: 'app-edit-book-dialog',
  templateUrl: './edit-book-dialog.component.html',
  styleUrls: ['./edit-book-dialog.component.css']
})
export class EditBookDialogComponent implements OnInit {

  private title: string;
  private book: Book;
  private genres: Genre[];
  private authors: Author[];
  private form: FormGroup;

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<EditBookDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data) {

    this.title = data.title;
    this.book = data.book;
    this.genres = data.genres;
    this.authors = data.authors;

    this.form = fb.group({
      id: [this.book.id, [Validators.required]],
      title: [this.book.title, [Validators.required, Validators.minLength(2), Validators.maxLength(45)]],
      genre: [this.book.genre, Validators.required],
      author: [this.book.author, Validators.required],
      quantity: [this.book.quantity, [Validators.required, Validators.min(0), Validators.pattern("^[0-9]*$")]],
    });
  }

  ngOnInit() {
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.form.controls[controlName].hasError(errorName);
  };
}
