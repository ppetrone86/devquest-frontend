import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { selectorAuthState_user } from '@modules/auth/auth.selectors';
import { Store } from '@ngrx/store';
import { environment } from '@src/environments/environment';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoginGuard implements CanActivate {
  private _store: Store = inject(Store);
  private _router: Router = inject(Router);

  fallbackAfterLogin: string = environment.appSettings.defaultRoutes.fallbackAfterLogin;

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    return this._store.select(selectorAuthState_user).pipe(
      map(({ isAuthenticated }) => {
        if (isAuthenticated && route.routeConfig?.path === 'login') {
          this._router.navigate([this.fallbackAfterLogin]);
          return false;
        }

        return true;
      })
    );
  }
}
