import { Component, inject, Input, OnInit } from '@angular/core';
import { ChartComponent } from '@components/shared/chart/chart.component';
import { ChartModel } from '@models/chart.model';
import { selectorProductState_categories } from '@modules/product/product.selectors';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-category-chart',
  template: ` <app-chart
    header="{{ 'common.product.category' | translate }}"
    [type]="type"
    [data$]="data$"
    [options]="options"
  >
  </app-chart>`,
  imports: [ChartComponent, TranslateModule],
  standalone: true,
})
export class ProductCategoryChartComponent implements OnInit {
  @Input() type!: 'bar' | 'line' | 'scatter' | 'bubble' | 'pie' | 'doughnut' | 'polarArea' | 'radar';
  data$!: Observable<ChartModel>;
  options: any;

  private _store: Store = inject(Store);

  ngOnInit(): void {
    this.data$ = this._store.select(selectorProductState_categories);

    this.options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          usePointStyle: true,
          labels: {
            padding: 20,
            boxWidth: 20,
          },
        },
      },
      elements: {
        arc: {
          borderWidth: 2,
        },
      },
    };
  }
}
