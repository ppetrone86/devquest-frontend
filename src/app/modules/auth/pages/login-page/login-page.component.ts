import { Component } from '@angular/core';
import { AuthenticationComponent } from '@modules/auth/components/authentication/authentication.component';

@Component({
  selector: 'app-login-page',
  imports: [AuthenticationComponent],
  templateUrl: './login-page.component.html',
  standalone: true,
})
export default class LoginPageComponent {}
