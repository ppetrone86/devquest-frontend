import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductModel } from '@models/product.model';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Rating } from 'primeng/rating';
import { TableModule } from 'primeng/table';
import { selectorProductState_products } from '../../product.selectors';

interface Action {
  icon: string;
  callback: (product: ProductModel) => void;
  permissions: string[];
  severity?: 'success' | 'info' | 'warn' | 'danger' | 'help' | 'primary' | 'secondary' | 'contrast';
}

@Component({
  selector: 'app-products-table',
  imports: [TableModule, CommonModule, TranslateModule, Rating, FormsModule, ButtonModule, CardModule],
  templateUrl: './products-table.component.html',
  styleUrl: './products-table.component.scss',
  standalone: true,
})
export class ProductsTableComponent implements OnInit {
  private _store: Store = inject(Store);

  // Models for view
  products: ProductModel[] = [];
  product!: ProductModel;
  selectedProducts: ProductModel[] = [];
  productDialog = false;
  deleteProductDialog = false;

  actions: Action[] = [];

  ngOnInit(): void {
    this._store.select(selectorProductState_products).subscribe({
      next: (data) => {
        this.products = data;
      },
    });
    this.actions = [
      {
        icon: 'pi pi-pencil',
        callback: this.editProduct,
        permissions: ['entities.products.update'],
        severity: 'info',
      },
      {
        icon: 'pi pi-trash',
        callback: this.deleteProduct,
        permissions: ['entities.products.delete'],
        severity: 'danger',
      },
    ];
  }

  editProduct(product: ProductModel) {
    this.product = { ...product };
    this.productDialog = true;
  }

  deleteProduct(product: ProductModel) {
    this.deleteProductDialog = true;
    this.product = { ...product };
  }
}
