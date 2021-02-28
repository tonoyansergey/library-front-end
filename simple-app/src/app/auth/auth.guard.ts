import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../library/service/auth.service";
import {HttpErrorResponse} from "@angular/common/http";
import {UserService} from "../library/service/user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  role: string;
  flag: boolean;

  constructor(private authService: AuthService) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.isLogged();
  }


}
