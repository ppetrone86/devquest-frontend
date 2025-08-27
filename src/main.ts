/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

console.log('🌐 Bootstrapping client-side Angular...');
const token = (window as any).__AUTH_TOKEN__;
if (token) {
  console.log('🔐 Client-side token from window.__AUTH_TOKEN__:', token);
} else {
  console.warn('⚠️ No token found in window.__AUTH_TOKEN__');
}

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
