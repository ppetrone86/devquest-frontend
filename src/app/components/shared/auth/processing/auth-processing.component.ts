import { isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as AuthActions from '@modules/auth/auth.actions';
import { selectorAuthState } from '@modules/auth/auth.selectors';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { LogService } from '@services/log.service';
import { AUTH_TOKEN } from '@src/app/app.config';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { PasswordModule } from 'primeng/password';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { filter, take } from 'rxjs';

@Component({
  selector: 'app-auth-processing',
  imports: [
    PanelModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    DividerModule,
    TranslateModule,
    ProgressSpinnerModule,
  ],
  templateUrl: './auth-processing.component.html',
  standalone: true,
})
export class AuthProcessingComponent implements OnInit {
  token = inject(AUTH_TOKEN);

  private _store: Store = inject(Store);
  private _platformId = inject(PLATFORM_ID);
  private _router: Router = inject(Router);
  private _activateRoute: ActivatedRoute = inject(ActivatedRoute);
  private _loading = signal(true);
  private _alreadyDispatched = signal(false);

  loading = signal(true);

  ngOnInit(): void {
    LogService.debug('🔐 Token from application server:', this.token);

    if (isPlatformBrowser(this._platformId)) {
      this._handleOAuthRedirect();
    } else {
      LogService.debug('🪶 SSR pass - skip OAuth redirect handler');
    }
  }

  private _handleOAuthRedirect(): void {
    const qp = this._activateRoute.snapshot.queryParamMap;
    const code = qp.get('code');
    const state = qp.get('state');
    const error = qp.get('error_description');

    if (code && state && !this._alreadyDispatched()) {
      this._alreadyDispatched.set(true);
      this._loading.set(true);

      this._store.dispatch(AuthActions.exchangeToken({ code }));
      this._cleanRoute();

      this._store
        .select(selectorAuthState)
        .pipe(
          filter((s) => !!s.authorizationToken || !!s.error),
          take(1)
        )
        .subscribe(() => this._loading.set(false));

      return;
    }

    if (error) {
      this._store.dispatch(AuthActions.loginError({ error: error }));
      this._loading.set(false);
    }
  }

  private _cleanRoute() {
    this._router.navigate([], {
      relativeTo: this._activateRoute,
      queryParams: {},
      replaceUrl: true,
    });
  }
}
