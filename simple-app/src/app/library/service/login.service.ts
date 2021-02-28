import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {User} from "../model/user.model";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url: string = '/api/auth/login';
  user: User;

  constructor(private http: HttpClient) {
  }

  logIn(form: NgForm) {
    return this.http.post<User>(this.url, form.value, {observe: 'response'});
  }
}
