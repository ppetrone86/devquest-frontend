import { Component, effect, inject, Input, signal } from '@angular/core';
import * as UserActions from '@modules/user/user.actions';
import { selectorUserState_total } from '@modules/user/user.selectors';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { CardModule } from 'primeng/card';
import { SplitterModule } from 'primeng/splitter';

@Component({
  selector: 'app-card-counter',
  imports: [CardModule, SplitterModule, TranslateModule],
  templateUrl: './card-counter.component.html',
  standalone: true,
})
export class CardCounterComponent {
  private _store: Store = inject(Store);

  @Input() title!: string;
  @Input() icon!: string;
  @Input() type!: 'product' | 'order' | 'user' | 'post';
  @Input() styleClass?: string;

  total = signal<number>(0);

  constructor() {
    effect(() => {
      let selector;

      switch (this.type) {
        case 'user':
          selector = selectorUserState_total;
          this._store.dispatch(UserActions.fetchAll({}));
          break;
        default:
          return;
      }

      this._store.select(selector).subscribe((total) => {
        this.total.set(total);
      });
    });
  }
}
