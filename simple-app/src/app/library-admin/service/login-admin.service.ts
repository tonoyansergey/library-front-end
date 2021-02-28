import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NgForm} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class LoginAdminService {

  url: string = '/api/admin/auth/login';

  constructor(private http: HttpClient) {
  }

  logIn(form: NgForm) {
    return this.http.post(this.url, form.value, {observe: 'response'});
  }
}
