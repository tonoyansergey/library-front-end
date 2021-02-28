import { Component, OnInit } from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import {AuthService} from "./service/auth.service";
import {UserService} from "./service/user.service";

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {

  title = 'simple-app';

  constructor(private cookieService: CookieService, private router: Router, private tokenService: AuthService) { }

  ngOnInit() {
  }

  logOut() {
    this.cookieService.delete("auth-cookie");
    this.cookieService.delete("user-details-cookie");
    this.cookieService.delete("email-cookie");
    this.cookieService.delete("UID");
    this.router.navigate(['./library/login']);
  }

}
