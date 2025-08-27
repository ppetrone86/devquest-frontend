import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { PermissionService } from '@modules/auth/permission.service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DynamicPermissionGuard implements CanActivate {
  private _router: Router = inject(Router);
  private _permissionService: PermissionService = inject(PermissionService);

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    let permissions = route.data['permissions'] as string[];
    const params = route.params;

    // Replace placeholders with actual query param values
    permissions = permissions.map((permission) =>
      permission.replace(/\{(\w+)\}/g, (_, paramName) => params[paramName].replaceAll('-', '_') || `{${paramName}}`)
    );

    return this._permissionService.hasPermission(permissions).pipe(
      map((hasPermission) => {
        if (!hasPermission) {
          // Redirect to 401 (not authorized) in case of missing permissions
          this._router.navigate(['unauthorized-page']);
          return false;
        }
        return true;
      })
    );
  }
}
