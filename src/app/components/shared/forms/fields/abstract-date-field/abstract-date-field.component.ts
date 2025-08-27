import { Component, computed, inject, OnDestroy, signal } from '@angular/core';
import { AbstractFieldComponent } from '@components/shared/forms/fields/abstract-field/abstract-field.component';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-abstract-date-field',
  imports: [],
  templateUrl: './abstract-date-field.component.html',
  styles: ``,
  standalone: true,
})
export class AbstractDateFieldComponent extends AbstractFieldComponent implements OnDestroy {
  private _translationService: TranslateService = inject(TranslateService);
  private _languageSubscription!: Subscription;

  private _language = signal(this._translationService.currentLang);

  private _dateFormatMap: Record<string, string> = {
    it_IT: 'dd/mm/yy',
    en_UK: 'dd/mm/yy',
    en_US: 'mm/dd/yy',
  };

  private _timeFormatMap: Record<string, string> = {
    it_IT: '24',
    en_UK: '12',
    en_US: '12',
  };

  dateFormat = computed(() => {
    const lang = this._language();
    console.log('dateFormat => ', this._language());
    return this._dateFormatMap[lang] || this._dateFormatMap['en_UK'];
  });

  timeFormat = computed(() => {
    const lang = this._language();
    console.log('timeFormat => ', this._language());
    return this._timeFormatMap[lang] || this._timeFormatMap['en_UK'];
  });

  constructor() {
    super();
    this._languageSubscription = this._translationService.onLangChange.subscribe((event) => {
      this._language.set(event.lang);
    });
  }

  ngOnDestroy(): void {
    this._languageSubscription?.unsubscribe();
  }
}
