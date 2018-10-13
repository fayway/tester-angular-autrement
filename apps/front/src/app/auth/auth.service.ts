import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthenticateBody, AuthenticateResponse } from './user.models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  login(body: AuthenticateBody): Observable<AuthenticateResponse> {
    return this.httpClient.post<AuthenticateResponse>(
      '/api/authenticate',
      body,
    );
  }

  logout() {
    return of(true);
  }
}
