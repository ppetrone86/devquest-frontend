import { Component } from '@angular/core';
import { ProgressSpinner } from 'primeng/progressspinner';

@Component({
  selector: 'app-page-loader',
  imports: [ProgressSpinner],
  template: `
    <div class="flex h-screen w-full items-center justify-center">
      <p-progress-spinner ariaLabel="loading" />
    </div>
  `,
  standalone: true,
})
export class PageLoaderComponent {}
