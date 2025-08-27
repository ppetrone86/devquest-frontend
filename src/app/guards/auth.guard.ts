import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { selectorAuthState_user } from '@modules/auth/auth.selectors';
import { Store } from '@ngrx/store';
import { LogService } from '@services/log.service';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  private _store: Store = inject(Store);
  private _router: Router = inject(Router);

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this._store.select(selectorAuthState_user).pipe(
      map((authState) => {
        LogService.debug('AuthGuard - Auth State:', authState);

        const isAuthenticated = authState.isAuthenticated ?? false;

        if (isAuthenticated) {
          LogService.debug(`AuthGuard - User is authenticated. Access granted to route ${state.url}.`);
          return true;
        } else {
          LogService.error(`AuthGuard - User is not authenticated. Redirecting to unauthorized page...`);
          this._router.navigate(['/unauthorized-page']).then(() => {
            LogService.warn(`You cannot access this route: "${state.url}".`);
          });

          return false;
        }
      })
    );
  }
}
