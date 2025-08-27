import { inject, Injectable, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { selectorAuthState_permissions } from './auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  private _store: Store = inject(Store);
  private _permissions$ = this._store.select(selectorAuthState_permissions);

  get userPermissions(): Signal<Set<string>> {
    return this._store.selectSignal(selectorAuthState_permissions);
  }

  /**
   * Checks if the user has the required permission(s).
   * @param permission The required permission(s). If an array is passed, the user must have at least one of the permissions.
   * @returns An observable that emits true if the user has the required permission(s), otherwise false.
   * @see hasPermissionSync for the synchronous version.
   */
  hasPermission(permission: string | string[] = []): Observable<boolean> {
    const requiredPermissions = Array.isArray(permission) ? permission : [permission];
    return this._permissions$.pipe(
      map((userPermissions) => {
        if (requiredPermissions.length === 0) return true;
        return requiredPermissions.some((p) => userPermissions?.has(p));
      })
    );
  }

  /**
   * Checks if the user has the required permission(s) synchronously.
   * @param permission The required permission(s). If an array is passed, the user must have at least one of the permissions.
   * @param userPermissions The user's permissions.
   * @returns true if the user has the required permission(s), otherwise false.
   * @see hasPermission for the asynchronous version.
   */
  hasPermissionSync(permission: string | string[] = [], userPermissions: Set<string>): boolean {
    const requiredPermissions = Array.isArray(permission) ? permission : [permission];
    if (requiredPermissions.length === 0) return true;
    return requiredPermissions.some((p) => userPermissions?.has(p));
  }
}
