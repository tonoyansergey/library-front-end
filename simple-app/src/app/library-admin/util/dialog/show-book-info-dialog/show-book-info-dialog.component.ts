import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../../../../library/service/user.service";
import {Book} from "../../../../library/model/book.model";

@Component({
  selector: 'app-show-book-info-dialog',
  templateUrl: './show-book-info-dialog.component.html',
  styleUrls: ['./show-book-info-dialog.component.css']
})
export class ShowBookInfoDialogComponent implements OnInit {

  private title: string;
  private book: Book;
  private form: FormGroup;

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<ShowBookInfoDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data,
              private profileService: UserService) {

    this.title = data.title;
    this.book = data.object;

    this.form = fb.group({
      id: [this.book.id],
      title: [this.book.title],
      author: [this.book.author.authorName],
      genre: [this.book.genre.genreName],
      qnt: [this.book.quantity]
    });
  }

  ngOnInit() {
  }
}
