import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

import { BookingRequest, Discount } from './booking.models';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  constructor(private http: HttpClient) {}

  getDiscount(bookingRequest: BookingRequest): Observable<Discount[]> {
    return this.http
      .post<Discount[]>('/api/discount', bookingRequest)
      .pipe(delay(1000));
  }
}
