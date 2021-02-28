import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {HttpErrorResponse} from "@angular/common/http";
import {AuthorService} from "../../../library/service/author.service";

@Component({
  selector: 'app-add-author-dialog',
  templateUrl: './add-author-dialog.component.html',
  styleUrls: ['./add-author-dialog.component.css']
})
export class AddAuthorDialogComponent implements OnInit {

  private title: string;
  private form: FormGroup;

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<AddAuthorDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data,
              private authorService: AuthorService) {

    this.title = data.title;

    this.form = fb.group({
      authorName: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      });
  }

  ngOnInit() {
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.form.controls[controlName].hasError(errorName);
  };

  addAuthor() {
    this.authorService.addAuthor(this.form).subscribe(
      resp => {
        console.log(resp);
        this.dialogRef.close();
        location.reload();
      },
      (error: HttpErrorResponse) => {
        if (error.status == 400) {
          this.form.controls.authorName.setErrors({'authorExists': true});
        }
      });

  }
}
