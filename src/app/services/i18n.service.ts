import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNG } from 'primeng/config';

@Injectable({
  providedIn: 'root',
})
export class I18nService {
  private readonly _fallbackLang: string = 'en_UK';
  private readonly _availableLanguages: string[] = ['en_US', 'en_UK', 'it_IT'];

  private _config: PrimeNG = inject(PrimeNG);
  private _translateService: TranslateService = inject(TranslateService);

  public initLanguages() {
    this._translateService.addLangs(this._availableLanguages);
    this.initDefaultLang();
  }

  public initDefaultLang() {
    let browserLang: string | undefined =
      this._translateService.getBrowserCultureLang()?.replace('-', '_') || this._fallbackLang;
    if (!this._availableLanguages.includes(browserLang)) {
      browserLang = this._fallbackLang;
    }

    this._translateService.setDefaultLang(browserLang);
    this.switchLang(browserLang);
  }

  public getSelectedLang(): string {
    return this._translateService.currentLang;
  }

  public switchLang(language: string) {
    this._translateService.use(language);
    this._translateService.get('common.uiLabels').subscribe((uiLabels) => {
      this._config.setTranslation(uiLabels);
    });
  }

  getTranslatedLanguages(): any[] {
    return [
      { value: 'en_UK', label: this._translateService.instant('components.languageSwitcher.en_UK') },
      { value: 'en_US', label: this._translateService.instant('components.languageSwitcher.en_US') },
      { value: 'it_IT', label: this._translateService.instant('components.languageSwitcher.it_IT') },
    ];
  }
}
