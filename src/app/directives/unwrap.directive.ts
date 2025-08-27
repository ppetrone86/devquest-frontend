import { AfterViewInit, Directive, ElementRef, inject, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appUnwrap]',
  standalone: true,
})
export class UnwrapDirective implements AfterViewInit {
  el: ElementRef = inject(ElementRef);
  render: Renderer2 = inject(Renderer2);

  ngAfterViewInit(): void {
    const parent = this.el.nativeElement.parentNode;
    const self = this.el.nativeElement;

    while (self.firstChild) {
      this.render.appendChild(parent, self.firstChild);
    }

    this.render.removeChild(parent, self);
  }
}
