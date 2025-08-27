import { Directive, effect, inject, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { PermissionService } from '@modules/auth/permission.service';

/**
 * This directive allows to render the component iff the active user
 * has at least one of the given permissions.
 */
@Directive({
  selector: '[appPermissioned]',
  standalone: true,
})
export class PermissionedDirective {
  @Input('appPermissioned') permissions: string[] = [];

  private _templateRef: TemplateRef<any> = inject(TemplateRef);
  private _viewContainerRef: ViewContainerRef = inject(ViewContainerRef);
  private _permissionService: PermissionService = inject(PermissionService);

  constructor() {
    effect(() => {
      this._permissionService.hasPermission(this.permissions).subscribe({
        next: (hasPermission) => {
          if (hasPermission) {
            this._viewContainerRef.createEmbeddedView(this._templateRef);
          } else {
            this._viewContainerRef.clear();
          }
        },
      });
    });
  }
}
