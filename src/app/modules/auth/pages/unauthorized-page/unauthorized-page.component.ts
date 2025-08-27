import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router, RouterModule } from '@angular/router';
import { LanguageSwitcherComponent } from '@components/shared/language-switcher/language-switcher.component';
import { logout } from '@modules/auth/auth.actions';
import { selectorAuthState_permissions } from '@modules/auth/auth.selectors';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';

@Component({
  selector: 'app-not-found-page',
  imports: [LanguageSwitcherComponent, ButtonModule, PanelModule, TranslateModule, RouterModule],
  templateUrl: './unauthorized-page.component.html',
  standalone: true,
})
export default class UnauthorizedPageComponent {
  private _store: Store = inject(Store);
  private _router: Router = inject(Router);

  readonly userPermissions = toSignal(this._store.select(selectorAuthState_permissions));

  readonly shouldLogout = computed(() => {
    const permissions = this.userPermissions();
    return !permissions || permissions.size === 0;
  });

  onGoToHome() {
    if (this.shouldLogout()) {
      this._store.dispatch(logout());
    } else {
      this._router.navigateByUrl('/login');
    }
  }
}
