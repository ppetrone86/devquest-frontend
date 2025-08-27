import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-logo',
  standalone: true,
  templateUrl: './logo.component.html',
})
export class LogoComponent {
  @Input() styleClass = '';
  @Input() imageStyleClass = '';
}
