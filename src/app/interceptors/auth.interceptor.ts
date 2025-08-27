import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { selectorAuthState_tokenInfo } from '@modules/auth/auth.selectors';
import { Store } from '@ngrx/store';
import { environment } from '@src/environments/environment';
import { Observable, switchMap, take } from 'rxjs';

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const store: Store = inject(Store);

  return store.select(selectorAuthState_tokenInfo).pipe(
    take(1),
    switchMap(({ bearerAuthorizationToken, tokenType }) => {
      let clonedReq = req.clone();

      clonedReq = req.url.includes('/oauth2/token')
        ? handleOAuthRequest(clonedReq)
        : handleOtherRequest(clonedReq, bearerAuthorizationToken, tokenType);

      return next(clonedReq);
    })
  );

  function handleOAuthRequest(clonedReq: HttpRequest<unknown>) {
    const basicAuth = `Basic ${btoa(`${environment.api.whiteLabel.clientId}:${environment.api.whiteLabel.clientSecret}`)}`;
    return clonedReq.clone({
      headers: clonedReq.headers
        .set('Content-type', 'application/x-www-form-urlencoded; charset=utf-8')
        .set('Authorization', basicAuth),
    });
  }

  function handleOtherRequest(
    clonedReq: HttpRequest<unknown>,
    bearerAuthorizationToken: string | undefined | null,
    tokenType: string | undefined | null
  ) {
    clonedReq = req.clone({
      headers: req.headers.set('Content-Type', 'application/json'),
    });

    if (bearerAuthorizationToken && tokenType) {
      clonedReq = clonedReq.clone({
        headers: clonedReq.headers.set('Authorization', `${tokenType} ${bearerAuthorizationToken}`),
      });
    }
    return clonedReq;
  }
}
