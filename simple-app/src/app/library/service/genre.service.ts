import { Injectable } from '@angular/core';
import {AuthService} from "./auth.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Genre} from "../model/genre.model";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  private genreUrl: string = "/api/genres";

  constructor(private authService: AuthService, private http: HttpClient) { }

  getGenres() {
    const headers = new HttpHeaders({'auth': this.authService.getTokenFromCookie()});
    return this.http.get<Genre[]>(this.genreUrl,{headers});
  }

  addGenre(form: FormGroup) {
    const headers = new HttpHeaders({'auth': this.authService.getTokenFromCookie()});

    return this.http.post(this.genreUrl +"/add", form.value, {headers});
  }
}
