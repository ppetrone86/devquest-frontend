import { Component } from '@angular/core';
import { CardCounterComponent } from '@components/shared/card-counter/card-counter.component';
import { ProductCategoryChartComponent } from '@modules/product/components/product-chart/product-chart.component';
import { TranslateModule } from '@ngx-translate/core';
import { SplitterModule } from 'primeng/splitter';

@Component({
  selector: 'app-my-dashboard-page',
  imports: [
    CardCounterComponent,
    SplitterModule,
    ProductCategoryChartComponent,
    TranslateModule,
  ],
  templateUrl: './my-dashboard-page.component.html',
  standalone: true,
})
export default class MyDashboardPageComponent {}
