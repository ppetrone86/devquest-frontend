import { Injectable } from '@angular/core';
import { environment } from '@src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AppSettingsService {
  fallbackAfterLogin = environment.appSettings.defaultRoutes.fallbackAfterLogin;
  fallbackAfterNotFound = environment.appSettings.defaultRoutes.fallbackAfterNotFound;
  fallbackAfterDeniedAccess = environment.appSettings.defaultRoutes.fallbackAfterDeniedAccess;
}
