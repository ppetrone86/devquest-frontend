import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Button } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { ColumnFilter, TableModule } from 'primeng/table';

@Component({
  selector: 'app-column-filter',
  imports: [TableModule, SelectModule, Button, TranslatePipe],
  templateUrl: './column-filter.component.html',
  styles: ``,
  standalone: true,
})
export class ColumnFilterComponent extends ColumnFilter {}
