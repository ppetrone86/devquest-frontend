import { AfterViewInit, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from '@components/shared/notifications/toast/toast.component';
import { PageLoaderComponent } from '../../shared/page-loader/page-loader.component';

@Component({
  selector: 'app-base-layout',
  imports: [ToastComponent, RouterOutlet, PageLoaderComponent],
  templateUrl: './base-layout.component.html',
  standalone: true,
})
export default class BaseLayoutComponent implements AfterViewInit {
  private _initialized = false;

  get loading(): boolean {
    return !this._initialized;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this._initialized = true;
    }, 0);
  }
}
