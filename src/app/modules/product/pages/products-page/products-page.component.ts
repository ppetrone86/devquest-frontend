import { Component, inject, OnInit } from '@angular/core';
import { ProductsTableComponent } from '@modules/product/components/products-table/products-table.component';
import { fetchAll } from '@modules/product/product.actions';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-products-page',
  imports: [TranslateModule, ProductsTableComponent],
  templateUrl: './products-page.component.html',
  standalone: true,
})
export default class ProductsPageComponent implements OnInit {
  private _store: Store = inject(Store);

  ngOnInit(): void {
    this._store.dispatch(fetchAll());
  }
}
