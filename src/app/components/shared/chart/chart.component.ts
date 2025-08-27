import { AsyncPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chart',
  imports: [ChartModule, CardModule, AsyncPipe, TranslateModule],
  templateUrl: './chart.component.html',
  standalone: true,
})
export class ChartComponent {
  @Input() header?: string = '';
  @Input() subheader?: string = '';
  @Input() styleClasses?: string = '';
  @Input() type!: 'bar' | 'line' | 'scatter' | 'bubble' | 'pie' | 'doughnut' | 'polarArea' | 'radar';
  @Input() data$!: Observable<any>;
  @Input() options: any;
}
