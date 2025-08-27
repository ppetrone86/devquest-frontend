import { UpperCasePipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LayoutService } from '@components/layouts/services/layout.service';
import { LanguageSwitcherComponent } from '@components/shared/language-switcher/language-switcher.component';
import { MenubarComponent } from '@components/shared/menubar/menubar.component';
import { UserModel } from '@models/user.model';
import * as AuthActions from '@modules/auth/auth.actions';
import { selectorAuthState_user } from '@modules/auth/auth.selectors';
import { ThemeSelectorComponent } from '@modules/theme/components/theme-selector.component';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '@src/environments/environment';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { combineLatest, startWith, Subscription } from 'rxjs';

@Component({
  selector: 'app-topbar',
  imports: [
    ButtonModule,
    LanguageSwitcherComponent,
    ThemeSelectorComponent,
    MenubarComponent,
    UpperCasePipe,
    RouterLink,
  ],
  templateUrl: './topbar.component.html',
  standalone: true,
})
export class TopbarComponent implements OnInit, OnDestroy {
  private _store: Store = inject(Store);
  private _router: Router = inject(Router);
  private _layoutService: LayoutService = inject(LayoutService);
  private _translateService: TranslateService = inject(TranslateService);
  private _subscriptions: Subscription = new Subscription();

  appTitle: string = environment.appSettings.title;
  menuItems: MenuItem[] = [];

  user$ = this._store.select(selectorAuthState_user);

  userFullName: string | null = '';
  userEmail: string | null = '';

  ngOnInit(): void {
    this._initMenuItems();

    this.user$.pipe(startWith({ user: null, isAuthenticated: false })).subscribe(({ user, isAuthenticated }) => {
      this._initMenuItems(user, isAuthenticated);
    });

    const combinedSubscriptions$ = combineLatest([this._translateService.onLangChange, this.user$]);

    this._subscriptions?.add(
      combinedSubscriptions$.subscribe(([_, { user, isAuthenticated }]) => {
        this._initMenuItems(user, isAuthenticated);
      })
    );
  }

  ngOnDestroy(): void {
    this._subscriptions?.unsubscribe();
  }

  toggleSidebar() {
    this._layoutService.toggleMenuSidebar();
  }

  onProfile() {
    this._router.navigate(['/private/my-profile']);
  }

  onLogout() {
    this._store.dispatch(AuthActions.logout());
  }

  onLogin() {
    this._router.navigate(['/login']);
  }

  private _initMenuItems(user: UserModel | null = null, isAuthenticated: boolean | null = false) {
    this.menuItems = [];
    if (isAuthenticated && user) {
      this.userEmail = user.email;

      this.menuItems.push({
        label: this._translateService.instant('components.topbar.buttons.buttonProfile.label'),
        icon: 'pi pi-user',
        command: () => this.onProfile(),
      });

      this.menuItems.push({
        label: this._translateService.instant('components.topbar.buttons.buttonLogout.label'),
        icon: 'pi pi-sign-out',
        command: () => this.onLogout(),
      });
    } else {
      this.userEmail = null;
      this.menuItems = [
        {
          label: this._translateService.instant('components.topbar.buttons.buttonLogin.label'),
          command: () => this.onLogin(),
        },
      ];
    }
  }
}
