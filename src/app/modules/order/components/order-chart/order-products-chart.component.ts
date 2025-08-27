import { Component, inject, OnInit } from '@angular/core';
import { LineChartComponent } from '@components/shared/chart/line-chart/line-chart.component';
import { ChartModel } from '@models/chart.model';
import { selectorOrderState_products } from '@modules/order/order.selectors';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { ChartModule } from 'primeng/chart';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-order-products-chart',
  template: `
    <app-line-chart header="{{ 'common.order.product' | translate }}" [data$]="chartData$"></app-line-chart>
  `,
  styles: [],
  imports: [ChartModule, TranslateModule, LineChartComponent],
  standalone: true,
})
export class OrderProductsChartComponent implements OnInit {
  chartData$!: Observable<ChartModel>;

  private _store: Store = inject(Store);

  ngOnInit() {
    this.chartData$ = this._store.select(selectorOrderState_products);
  }
}
