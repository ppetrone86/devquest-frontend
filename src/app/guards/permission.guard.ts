import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { AppSettingsService } from '@components/layouts/services/app-settings.service';
import { PermissionService } from '@modules/auth/permission.service';
import { LogService } from '@services/log.service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PermissionGuard implements CanActivate {
  private _router: Router = inject(Router);
  private _permissionService: PermissionService = inject(PermissionService);
  private _appSettings: AppSettingsService = inject(AppSettingsService);

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    const permissions = route.data['permissions'] as string[];
    return this._permissionService.hasPermission(permissions).pipe(
      map((hasPermission) => {
        LogService.debug(
          `Route access check for permissions: [${permissions.join(', ')}] → ${hasPermission ? 'GRANTED' : 'DENIED'}`
        );

        if (!hasPermission) {
          // Redirect to 401 (not authorized) in case of missing permissions
          this._router.navigate([this._appSettings.fallbackAfterDeniedAccess]);
          return false;
        }
        return true;
      })
    );
  }
}
