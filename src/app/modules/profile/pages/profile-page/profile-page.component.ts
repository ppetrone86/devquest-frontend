import { Component } from '@angular/core';
import { UserAuthDetailsComponent } from '@modules/profile/components/user-auth-details/user-auth-details.component';
import { UserDetailsComponent } from '@modules/profile/components/user-details/user-details.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-profile-page',
  imports: [UserDetailsComponent, UserAuthDetailsComponent, TranslateModule],
  templateUrl: './profile-page.component.html',
  styles: ``,
  standalone: true,
})
export default class ProfilePageComponent {}
