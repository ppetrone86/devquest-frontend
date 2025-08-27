import { isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthenticationService } from '@modules/auth/authentication.service';
import { SysconsPreset } from '@modules/theme/presets/syscons.preset';
import { init } from '@modules/theme/theme.actions';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { I18nService } from '@services/i18n.service';
import { PrimeNG } from 'primeng/config';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
})
export class AppComponent implements OnInit {
  private readonly _isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly _store: Store = inject(Store);
  private _config: PrimeNG = inject(PrimeNG);
  private _i18sService: I18nService = inject(I18nService);
  private _authenticationService: AuthenticationService = inject(AuthenticationService);

  title = 'White Label';

  constructor() {
    this._config.theme.set({
      preset: SysconsPreset,
      options: {
        darkModeSelector: "[data-theme='dark']",
        cssLayer: {
          name: 'primeng',
          order: 'theme, base, primeng',
        },
      },
    });
  }

  ngOnInit(): void {
    this._i18sService.initLanguages();
    this._authenticationService.restoreTokenRefreshTimer();

    if (this._isBrowser) {
      this._initTheme();
    }
  }

  private _initTheme() {
    this._store.dispatch(init());
  }
}
