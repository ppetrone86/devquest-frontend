import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LanguageSwitcherComponent } from '@components/shared/language-switcher/language-switcher.component';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';

@Component({
  selector: 'app-not-found-page',
  imports: [ButtonModule, PanelModule, LanguageSwitcherComponent, TranslateModule, RouterModule],
  templateUrl: './not-found-page.component.html',
  standalone: true,
})
export default class NotFoundPageComponent {}
