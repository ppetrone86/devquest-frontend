import { bootstrapApplication } from '@angular/platform-browser';
import { LogService } from '@services/log.service';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';

const bootstrap = () => {
  LogService.debug('🚀 Bootstrap SSR started with config:', config);
  return bootstrapApplication(AppComponent, config);
};

export default bootstrap;
