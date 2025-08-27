import { Component } from '@angular/core';
import { TestToastMessageComponent } from '@components/test/test-toast-message/test-toast-message.component';

@Component({
  selector: 'app-test-components',
  imports: [TestToastMessageComponent],
  template: ` <app-test-toast-message></app-test-toast-message> `,
  styles: ``,
})
export default class TestComponentsPageComponent {}
