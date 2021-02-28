import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {User} from "../model/user.model";
import {CookieService} from "ngx-cookie-service";
import {Book} from "../model/book.model";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url: string = "/api/users/";

  constructor(private tokenService: AuthService, private http: HttpClient, private cookieService: CookieService) { }

  getAllUsers() {
    const headers = new HttpHeaders({'auth': this.tokenService.getTokenFromCookie()});
    return this.http.get<User[]>(this.url,{headers});
  }

  getUserById() {
    const headers = new HttpHeaders({'auth': this.cookieService.get("auth-cookie")});

    return this.http.get<User>(this.url+ this.cookieService.get("UID"),{headers});
  }

  updateUser(user: User) {
    const headers = new HttpHeaders({'auth': this.tokenService.getTokenFromCookie()});

    return this.http.put(this.url + "update/" + user.id, user, {headers});
  }

  updateUserPassword(id: number, userName: string, oldPassword: string, newPassword: string) {
    const headers = new HttpHeaders({'auth': this.tokenService.getTokenFromCookie()});

    return this.http.put(this.url + "update/password/" + id, {userName: userName, oldPassword: oldPassword, newPassword: newPassword}, {headers});
  }

  deleteUserById(id: number) {
    const headers = new HttpHeaders({'auth': this.tokenService.getTokenFromCookie()});

    this.http.delete(this.url + "/delete/" + id, {headers}).subscribe();
  }

  addUser(form: FormGroup) {
    const headers = new HttpHeaders({'auth': this.tokenService.getTokenFromCookie()});

    return this.http.post(this.url +"add", form.value, {headers});
  }


}
