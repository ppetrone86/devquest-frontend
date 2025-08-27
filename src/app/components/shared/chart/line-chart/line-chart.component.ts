import { Component, Input } from '@angular/core';
import { ChartComponent } from '@components/shared/chart/chart.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  imports: [ChartComponent],
  standalone: true,
})
export class LineChartComponent {
  @Input() header?: string = '';
  @Input() subheader?: string = '';
  @Input() data$!: Observable<any>;
  @Input() options?: any;

  defaultOptions: any = {
    responsive: true,
    plugins: {
      legend: {
        position: false,
      },
    },
    scales: {
      x: {},
      y: {
        ticks: {
          count: 5,
          padding: 10,
        },
      },
    },
    elements: {
      line: {
        tension: 0.5,
        fill: true,
      },
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  };

  get mergedOptions(): any {
    return { ...this.defaultOptions, ...(this.options || {}) };
  }
}
