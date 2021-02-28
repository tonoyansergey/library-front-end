import { Injectable } from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {UserService} from "./user.service";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private cookieService: CookieService) { }

  setTokenInCookie(token: string) {
    this.cookieService.set("auth-cookie", token,1);
  }

  getTokenFromCookie() {
    return this.cookieService.get("auth-cookie");
  }

  setUserDetailsCookie(details: string) {
    this.cookieService.set("user-details-cookie",details,1);
  }

  getUserDetailsFromCookie() {
    return this.cookieService.get("user-details-cookie");
  }

  setEmailInCookie(email: string) {
    this.cookieService.set("email-cookie", email, 1);
  }

  getEmailFromCookie() {
    return this.cookieService.get("email-cookie");
  }

  setUIDInCookie(id: string) {
    this.cookieService.set("UID", id, 1);
  }

  getUIDFromCookie() {
    return this.cookieService.get("UID");
  }

  isLogged() : boolean {
    if (this.cookieService.check("auth-cookie") &&
        this.cookieService.check("user-details-cookie") &&
        this.cookieService.check("email-cookie") &&
        this.cookieService.check("UID")) {
      return true;
    }
    return false;
  }


}
