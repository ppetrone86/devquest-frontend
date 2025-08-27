import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig, mergeApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { provideStore } from '@ngrx/store';
import { appConfig } from './app.config';
import { reducers } from './store/reducers';

const serverConfig: ApplicationConfig = {
  providers: [provideServerRendering(), provideStore(reducers), provideHttpClient(withFetch())],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
