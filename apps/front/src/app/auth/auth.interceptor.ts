import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { mergeMap, take } from 'rxjs/operators';

import { AuthFacade } from './+state/auth.facade';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  static readonly tokenHeaderName = 'x-auth-token';

  constructor(private authFacade: AuthFacade) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authFacade.accessToken.pipe(
      take(1),
      mergeMap(accessToken => {
        const authReq = req.clone(
          accessToken
            ? {
                headers: req.headers.set(
                  AuthInterceptor.tokenHeaderName,
                  accessToken,
                ),
              }
            : {},
        );
        return next.handle(authReq);
      }),
    );
  }
}
