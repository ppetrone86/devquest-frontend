import { Component, inject, OnInit } from '@angular/core';
import { LineChartComponent } from '@components/shared/chart/line-chart/line-chart.component';
import { ChartModel } from '@models/chart.model';
import { selectorOrderState_months } from '@modules/order/order.selectors';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { ChartModule } from 'primeng/chart';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-order-month-chart',
  template: ` <app-line-chart header="{{ 'common.order.month' | translate }}" [data$]="chartData$"></app-line-chart> `,
  imports: [ChartModule, TranslateModule, LineChartComponent],
  standalone: true,
})
export class OrderMonthChartComponentComponent implements OnInit {
  chartData$!: Observable<ChartModel>;
  header?: string;

  private _store: Store = inject(Store);

  ngOnInit() {
    this.chartData$ = this._store.select(selectorOrderState_months);
  }
}
