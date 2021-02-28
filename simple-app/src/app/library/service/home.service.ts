import { Injectable } from '@angular/core';
import {AuthService} from "./auth.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Book} from "../model/book.model";
import {BookingData} from "../model/booking-data.model";

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private recordsUrl: string = "/api/booking/records";

  constructor(private tokenService: AuthService, private http: HttpClient) { }

  getBookingRecords() {

    const headers = new HttpHeaders({'auth': this.tokenService.getTokenFromCookie()});

    return this.http.get<BookingData[]>(this.recordsUrl + "/" + this.tokenService.getUIDFromCookie(),{headers});
  }

  deleteBookingRecord(id: number) {
    const headers = new HttpHeaders({'auth': this.tokenService.getTokenFromCookie()});

    this.http.delete(this.recordsUrl + "/delete/" + id,{headers, observe: 'response' }).subscribe();
  }
}
