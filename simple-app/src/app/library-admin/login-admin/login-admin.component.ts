import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../library/service/login.service";
import {AuthService} from "../../library/service/auth.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {LoginAdminService} from "../service/login-admin.service";
import {AuthAdminService} from "../service/auth-admin.service";

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {

  private error: string;
  private flag: boolean = false;

  constructor(private loginAdminService: LoginAdminService, private authAdminService: AuthAdminService, private router: Router) {
  }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.flag = true;
    this.loginAdminService.logIn(form).subscribe(
      resp => {
        this.authAdminService.setTokenInCookie(resp.headers.get('ADMIN_AUTHORIZATION'));
        this.router.navigate(['./library-admin']);
      },
      (error: HttpErrorResponse) => {
        this.error = error.error;
      }
    );
  }
}
