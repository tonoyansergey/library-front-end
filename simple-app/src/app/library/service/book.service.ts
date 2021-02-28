import { Injectable } from '@angular/core';
import {AuthService} from "./auth.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Book} from "../model/book.model";
import {FormGroup} from "@angular/forms";


@Injectable({
  providedIn: 'root'
})
export class BookService {

  private bookUrl: string = "/api/books";

  constructor(private tokenService: AuthService, private http: HttpClient) { }

  getBooks() {

    const headers = new HttpHeaders({'auth': this.tokenService.getTokenFromCookie()});
    return this.http.get<Book[]>(this.bookUrl,{headers});
  }

  deleteBookById(id: number) {
    const headers = new HttpHeaders({'auth': this.tokenService.getTokenFromCookie()});

    this.http.delete(this.bookUrl + "/delete/" + id, {headers}).subscribe();
  }

  updateBook(book: Book) {
    const headers = new HttpHeaders({'auth': this.tokenService.getTokenFromCookie()});

    return this.http.put(this.bookUrl + "/update", book, {headers});
  }

  addBook(form: FormGroup) {
    const headers = new HttpHeaders({'auth': this.tokenService.getTokenFromCookie()});

    return this.http.post(this.bookUrl +"/add", form.value, {headers});
  }
}
