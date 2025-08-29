import { Component, Input, OnInit } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';
import { $dt } from '@primeuix/themes';

const MinWidthPerc = 20;
const MaxWidthPerc = 75;

const MinHeightRem = 4.5;
const MaxHeightRem = 7.5;

interface SkeletonConfig {
  width: string;
  height: string;
  borderRadius: string;
  styleClass?: string;
}

@Component({
  selector: 'app-chat-skeleton',
  imports: [SkeletonModule],
  template: `
    <div class="flex flex-col gap-2">
      @for (skeleton of skeletons; track $index) {
        <p-skeleton
          [width]="skeleton.width"
          [height]="skeleton.height"
          [borderRadius]="skeleton.borderRadius"
          [styleClass]="skeleton.styleClass"
        />
      }
    </div>
  `,
  standalone: true,
})
export class ChatSkeletonComponent implements OnInit {
  @Input() itemCount = 5;
  skeletons: SkeletonConfig[] = [];

  ngOnInit(): void {
    this._buildSkeletons();
  }

  private _borderRadius = $dt('border.radius.xl').variable;

  private _buildSkeletons(): void {
    const skeletons = [];
    for (let i = 0; i < this.itemCount; i++) {
      const multiline = Math.random() > 0.5;
      const width = multiline
        ? MaxWidthPerc
        : Math.floor(Math.random() * (MaxWidthPerc - MinWidthPerc - 10)) + MinWidthPerc;
      const height = multiline
        ? Math.round(Math.random() * (MaxHeightRem - MinHeightRem) * 10) / 10 + MinHeightRem
        : MinHeightRem;
      let borderRadius: string;
      let styleClass: string;
      if (i % 2 === 0) {
        borderRadius = `${this._borderRadius} 0 ${this._borderRadius} ${this._borderRadius}`;
        styleClass = 'place-self-end';
      } else {
        borderRadius = `0 ${this._borderRadius} ${this._borderRadius} ${this._borderRadius}`;
        styleClass = 'place-self-start';
      }
      skeletons.push({ width: `${width}%`, height: `${height}rem`, borderRadius, styleClass });
    }
    this.skeletons = skeletons;
  }
}
