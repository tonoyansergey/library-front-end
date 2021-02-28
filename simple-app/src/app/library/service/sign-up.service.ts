import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  url: string = '/api/users/add';

  constructor(private http: HttpClient) { }

  signUp(form: NgForm) {
    return this.http.post(this.url, form.value);
  }
}
