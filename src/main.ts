/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { environment } from '@src/environments/environment';

async function start() {
  // 🔎 Client-side bootstrap logs (keep them!)
  console.log('🌐 Bootstrapping client-side Angular...');

  if (environment.mock) {
    // Seed a fake token if none is present, useful for your AUTH_TOKEN consumer
    if (!(window as any).__AUTH_TOKEN__) {
      (window as any).__AUTH_TOKEN__ = environment.mocks?.token?.access_token ?? 'mock-access-token';
    }

    const token = (window as any).__AUTH_TOKEN__;
    if (token) {
      console.log('🔐 Client-side token from window.__AUTH_TOKEN__:', token);
    } else {
      console.warn('⚠️ No token found in window.__AUTH_TOKEN__');
    }

    // Start MSW worker (browser)
    // Use baseURI to make it work under sub-paths (e.g., Work Zone tile)
    const { worker } = await import('./mock/browser'); // <- path corretto (mock/)
    const swUrl = `${document.baseURI.replace(/\/$/, '')}/mockServiceWorker.js`;
    await worker.start({
      serviceWorker: { url: swUrl },
      onUnhandledRequest: 'warn',
      quiet: true,
    });
    console.info('[MSW] Mock mode enabled at', swUrl);
  }

  await bootstrapApplication(AppComponent, appConfig);
}

start().catch((err) => console.error(err));
