import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

import { Rental, RentalsQuery } from './rentals.models';

@Injectable({
  providedIn: 'root',
})
export class RentalsService {
  constructor(private http: HttpClient) {}

  getRentals(query: RentalsQuery): Observable<Rental[]> {
    let params = new HttpParams();
    if (query.city) {
      params = params.append('city', query.city);
    }
    return this.http
      .get<Rental[]>('/api/rentals', { params })
      .pipe(delay(1000));
  }

  getRental(id: number): Observable<Rental> {
    return this.http.get<Rental>(`/api/rentals/${id}`).pipe(delay(1000));
  }
}
