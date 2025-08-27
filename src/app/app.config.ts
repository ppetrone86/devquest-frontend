import { CommonModule } from '@angular/common';
import { HttpBackend, provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  ApplicationConfig,
  importProvidersFrom,
  InjectionToken,
  isDevMode,
  provideZoneChangeDetection,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { ActionReducer, MetaReducer, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { localStorageSync } from 'ngrx-store-localstorage';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';
import { ConfirmationService, MessageService } from 'primeng/api';
import { routes } from './app.routes';
import { authInterceptor } from './interceptors/auth.interceptor';
import { errorInterceptor } from './interceptors/error.interceptor';
import { effects } from './store/effects';
import { clearState, reducers } from './store/reducers';

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({ keys: ['authState'], rehydrate: true })(reducer);
}

const metaReducers: MetaReducer<any, any>[] = [localStorageSyncReducer, clearState];

export function httpLoaderFactory(_httpBackend: HttpBackend) {
  return new MultiTranslateHttpLoader(_httpBackend, ['./assets/i18n/backend/', './assets/i18n/frontend/']);
}

/*
  NOTE: if your json file name is different from [lang].json model kinda [lang]-[stuff].json
  you have to specify the -[stuff].json custom suffix

export function httpLoaderFactory(_httpBackend: HttpBackend) {
  return new MultiTranslateHttpLoader(_httpBackend, [
    {prefix: './assets/i18n/frontend/', suffix: '.json'},
    {prefix: './assets/i18n/backend/', suffix: '-backend.json'},
  ]);
}
*/

export const AUTH_TOKEN = new InjectionToken<string>('AUTH_TOKEN');

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptors([authInterceptor, errorInterceptor])),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideStore(reducers, { metaReducers }),
    provideEffects(effects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideAnimationsAsync(),
    importProvidersFrom([
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: httpLoaderFactory,
          deps: [HttpBackend],
        },
      }),
    ]),
    {
      provide: AUTH_TOKEN,
      useFactory: () => (typeof window !== 'undefined' ? (window as any).__AUTH_TOKEN__ : null),
    },
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MessageService,
    ConfirmationService,
    provideClientHydration(withEventReplay()),
  ],
};
