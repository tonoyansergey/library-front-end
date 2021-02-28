import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {HttpErrorResponse} from "@angular/common/http";
import {GenreService} from "../../../library/service/genre.service";

@Component({
  selector: 'app-add-genre-dialog',
  templateUrl: './add-genre-dialog.component.html',
  styleUrls: ['./add-genre-dialog.component.css']
})
export class AddGenreDialogComponent implements OnInit {

  private title: string;
  private form: FormGroup;

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<AddGenreDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data,
              private genreService: GenreService) {

    this.title = data.title;

    this.form = fb.group({
      genreName: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      });
  }

  ngOnInit() {
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.form.controls[controlName].hasError(errorName);
  };

  addGenre() {
    this.genreService.addGenre(this.form).subscribe(
      resp => {
        console.log(resp);
        this.dialogRef.close();
        location.reload();
      },
      (error: HttpErrorResponse) => {
        if (error.status == 400) {
          this.form.controls.genreName.setErrors({'genreExists': true});
        }
      });

  }
}
