import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { I18nService } from '@services/i18n.service';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-language-switcher',
  imports: [FormsModule, TranslateModule, SelectModule],
  templateUrl: './language-switcher.component.html',
  standalone: true,
})
export class LanguageSwitcherComponent implements OnInit {
  private _i18sService: I18nService = inject(I18nService);
  selectedLanguage: string;
  languages: any[] = [];

  constructor() {
    this.selectedLanguage = this._i18sService.getSelectedLang();
  }

  ngOnInit(): void {
    this._initLanguages();
  }

  private _initLanguages() {
    this.languages = this._i18sService.getTranslatedLanguages();
  }

  switchLanguage() {
    this._i18sService.switchLang(this.selectedLanguage);
  }
}
