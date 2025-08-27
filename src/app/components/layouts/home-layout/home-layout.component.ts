import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-home-layout',
  imports: [RouterOutlet, FooterComponent],
  templateUrl: './home-layout.component.html',
  standalone: true,
})
export default class HomeLayoutComponent {}
