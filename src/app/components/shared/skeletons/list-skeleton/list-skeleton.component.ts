import { Component } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-list-skeleton',
  standalone: true,
  imports: [SkeletonModule],
  template: `
    <div class="card">
      <div class="border-round surface-border surface-card border p-4">
        <div class="mb-3 flex">
          <p-skeleton shape="circle" size="4rem" styleClass="mr-2" />
          <div>
            <p-skeleton width="10rem" styleClass="mb-2" />
            <p-skeleton width="5rem" styleClass="mb-2" />
            <p-skeleton height=".5rem" />
          </div>
        </div>
        <p-skeleton width="100%" height="150px" />
        <div class="justify-content-between mt-3 flex">
          <p-skeleton width="4rem" height="2rem" />
          <p-skeleton width="4rem" height="2rem" />
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class ListSkeletonComponent {}
