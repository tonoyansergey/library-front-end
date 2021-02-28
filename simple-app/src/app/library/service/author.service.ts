import { Injectable } from '@angular/core';
import {AuthService} from "./auth.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Author} from "../model/author.model";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  private authorUrl: string = "/api/authors";

  constructor(private authService: AuthService, private http: HttpClient) { }

  getAuthors() {
    const headers = new HttpHeaders({'auth': this.authService.getTokenFromCookie()});
    return this.http.get<Author[]>(this.authorUrl,{headers});
  }

  addAuthor(form: FormGroup) {
    const headers = new HttpHeaders({'auth': this.authService.getTokenFromCookie()});

    return this.http.post(this.authorUrl +"/add", form.value, {headers});
  }
}
