import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LanguageSwitcherComponent } from '@components/shared/language-switcher/language-switcher.component';
import { UserModel } from '@models/user.model';
import * as AuthActions from '@modules/auth/auth.actions';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { LogService } from '@services/log.service';
import { AUTH_TOKEN } from '@src/app/app.config';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-authentication',
  imports: [
    PanelModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    DividerModule,
    TranslateModule,
    LanguageSwitcherComponent,
  ],
  templateUrl: './authentication.component.html',
  standalone: true,
})
export class AuthenticationComponent implements OnInit {
  token = inject(AUTH_TOKEN);

  private _store: Store = inject(Store);
  form!: FormGroup;

  ngOnInit(): void {
    LogService.debug('🔐 Token from application server:', this.token);

    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  onSubmit(form: FormGroup) {
    const _user: UserModel = { ...form.value };
  }

  onSubmitSSO() {
    this._store.dispatch(AuthActions.login());
  }
}
