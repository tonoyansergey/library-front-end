import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {SignUpService} from '../../service/sign-up.service';
import {Subscription} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  emailPattern: string = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@" + "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";
  error: string;
  constructor(private signUpService: SignUpService, private router: Router) {
  }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.signUpService.signUp(form).subscribe(
      resp => {
        this.router.navigate(['./login']);
      },
      (error: HttpErrorResponse) => {
        this.error = error.error;
      });
  };
}
