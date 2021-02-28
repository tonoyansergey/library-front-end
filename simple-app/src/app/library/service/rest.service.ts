import { Injectable } from '@angular/core';
import {AuthService} from "./auth.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private authService: AuthService, private http: HttpClient) { }

  doGet<T>(url: string) {
    const headers = new HttpHeaders({'auth': this.authService.getTokenFromCookie()});
    return this.http.get<T[]>(url,{headers});
  }

  doPostAndGet<T>(url: string, body: any) {
    const headers = new HttpHeaders({'auth': this.authService.getTokenFromCookie()});
    return this.http.post<T[]>(url,body, {headers});
  }

  doDelete(url: string, id: number) {
    const headers = new HttpHeaders({'auth': this.authService.getTokenFromCookie()});
    this.http.delete(url + id, {headers}).subscribe();
  }

  doPost(url: string, body: any) {
    const headers = new HttpHeaders({'auth': this.authService.getTokenFromCookie()});
    return this.http.post(url, body, {headers});
  }
}
