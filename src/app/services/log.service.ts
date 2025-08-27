import { Injectable } from '@angular/core';
import { environment } from '@src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  static info(message: any, ...optionalParams: any[]): void {
    if (environment.enableLogging) {
      console.log('ℹ️ INFO:', message, ...optionalParams);
    }
  }

  static debug(message: any, ...optionalParams: any[]): void {
    if (!environment.production && environment.enableLogging) {
      console.info('🐛 [DEBUG]:', message, ...optionalParams);
    }
  }

  static warn(message: any, ...optionalParams: any[]): void {
    if (environment.enableLogging) {
      console.warn('⚠️ [CAUTION]:', message, ...optionalParams);
    }
  }

  static error(message: any, ...optionalParams: any[]): void {
    if (environment.enableLogging) {
      console.error('💀 [CRITICAL]:', message, ...optionalParams);
    }
  }
}
