import { Component, OnInit } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-table-skeleton',
  standalone: true,
  imports: [SkeletonModule],
  template: `
    <p-table [value]="items" [tableStyle]="{ 'min-width': '50rem' }">
      <ng-template pTemplate="header">
        <tr>
          <th>
            <p-skeleton />
          </th>
          <th>
            <p-skeleton />
          </th>
          <th>
            <p-skeleton />
          </th>
          <th>
            <p-skeleton />
          </th>
        </tr>
      </ng-template>
      <ng-template pTemplate="body" let-product>
        <tr>
          <td>
            <p-skeleton />
          </td>
          <td>
            <p-skeleton />
          </td>
          <td>
            <p-skeleton />
          </td>
          <td>
            <p-skeleton />
          </td>
        </tr>
      </ng-template>
    </p-table>
  `,
  styles: ``,
})
export class TableSkeletonComponent implements OnInit {
  items: any[] | undefined;

  ngOnInit() {
    const randomLength = Math.floor(Math.random() * 10 + 1) * 5;
    this.items = Array.from({ length: randomLength }).map((_, i) => `#${i}`);
  }
}
