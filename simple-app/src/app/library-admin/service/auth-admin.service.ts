import { Injectable } from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthAdminService {

  constructor(private cookieService: CookieService) { }

  setTokenInCookie(token: string) {
    this.cookieService.set("auth-admin-cookie", token,1);
  }

  getTokenFromCookie() {
    return this.cookieService.get("auth-admin-cookie");
  }

  isLogged() : boolean {
    return this.cookieService.check("auth-cookie");
  }


}
