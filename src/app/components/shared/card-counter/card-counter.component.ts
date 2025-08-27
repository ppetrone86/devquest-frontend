import { Component, effect, inject, Input, signal } from '@angular/core';
import * as OrderActions from '@modules/order/order.actions';
import { selectorOrderState_total } from '@modules/order/order.selectors';
import * as PostActions from '@modules/post/post.actions';
import { selectorPostState_total } from '@modules/post/post.selectors';
import * as ProductActions from '@modules/product/product.actions';
import { selectorProductState_total } from '@modules/product/product.selectors';
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
        case 'product':
          selector = selectorProductState_total;
          this._store.dispatch(ProductActions.fetchAll());
          break;
        case 'user':
          selector = selectorUserState_total;
          this._store.dispatch(UserActions.fetchAll({}));
          break;
        case 'post':
          selector = selectorPostState_total;
          this._store.dispatch(PostActions.fetchAll());
          break;
        case 'order':
          selector = selectorOrderState_total;
          this._store.dispatch(OrderActions.fetchAll());
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
