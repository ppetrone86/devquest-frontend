import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { map, Observable } from 'rxjs';
import { change } from '../theme.actions';
import { selectorThemeState_key } from '../theme.selectors';
import { ThemeKey, THEMES } from '../theme.state';

interface ButtonData {
  icon: string;
  command: () => void;
  visible$: Observable<boolean>;
}

@Component({
  selector: 'app-theme-selector',
  imports: [ButtonModule, AsyncPipe],
  templateUrl: './theme-selector.component.html',
  standalone: true,
})
export class ThemeSelectorComponent {
  private _store: Store = inject(Store);
  private _theme$ = this._store.select(selectorThemeState_key);
  buttons: ButtonData[];

  constructor() {
    this.buttons = Object.entries(THEMES).map(([key, theme]) => ({
      icon: theme.icon,
      command: () => this._store.dispatch(change({ key: key as ThemeKey })),
      visible$: this._theme$.pipe(map((current) => current !== key)),
    }));
  }
}
