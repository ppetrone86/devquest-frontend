import { Component } from '@angular/core';
import { CardCounterComponent } from '@components/shared/card-counter/card-counter.component';
import { OrderMonthChartComponentComponent } from '@modules/order/components/order-chart/order-month-chart.component';
import { OrderOrdersChartComponent } from '@modules/order/components/order-chart/order-orders-chart.component';
import { OrderPriceChartComponent } from '@modules/order/components/order-chart/order-price-chart.component';
import { OrderPricesAndProductsChartComponent } from '@modules/order/components/order-chart/order-prices-and-products-chart.component';
import { OrderProductsChartComponent } from '@modules/order/components/order-chart/order-products-chart.component';
import { PostTableComponent } from '@modules/post/components/post-table/post-table.component';
import { ProductCategoryChartComponent } from '@modules/product/components/product-chart/product-chart.component';
import { TranslateModule } from '@ngx-translate/core';
import { SplitterModule } from 'primeng/splitter';

@Component({
  selector: 'app-my-dashboard-page',
  imports: [
    CardCounterComponent,
    SplitterModule,
    ProductCategoryChartComponent,
    PostTableComponent,
    OrderOrdersChartComponent,
    OrderPriceChartComponent,
    OrderProductsChartComponent,
    OrderMonthChartComponentComponent,
    TranslateModule,
    OrderPricesAndProductsChartComponent,
  ],
  templateUrl: './my-dashboard-page.component.html',
  standalone: true,
})
export default class MyDashboardPageComponent {}
