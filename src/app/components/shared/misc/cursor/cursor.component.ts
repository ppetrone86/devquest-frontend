import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  imports: [NgIf],
  selector: 'app-cursor',
  template: `
    <span
      *ngIf="visible"
      class="mb-[.1em] inline-block h-[.9em] w-[.35em] animate-pulse rounded-xs bg-gray-500 align-middle"
    ></span>
  `,
  standalone: true,
})
export class CursorComponent {
  @Input() visible? = false;
}
