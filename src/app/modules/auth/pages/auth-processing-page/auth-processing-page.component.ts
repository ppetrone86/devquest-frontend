import { Component } from '@angular/core';
import { AuthProcessingComponent } from '@components/shared/auth/processing/auth-processing.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-auth-processing-page',
  imports: [AuthProcessingComponent, ProgressSpinnerModule],
  templateUrl: './auth-processing-page.component.html',
  standalone: true,
})
export default class AuthProcessingPageComponent {}
