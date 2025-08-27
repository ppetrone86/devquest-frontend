import { inject, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';

@Pipe({
  name: 'markdown',
  standalone: true,
})
export class MarkdownPipe implements PipeTransform {
  private _sanitizer: DomSanitizer = inject(DomSanitizer);

  async transform(value: string): Promise<SafeHtml> {
    if (!value) return '';
    const html = await marked(value);
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }
}
