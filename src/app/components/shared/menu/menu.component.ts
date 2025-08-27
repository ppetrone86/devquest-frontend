import { Component, inject } from '@angular/core';
import { MenuModule } from 'primeng/menu';
import { PanelMenuModule } from 'primeng/panelmenu';
import { LogoComponent } from '../logo/logo.component';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-menu',
  imports: [MenuModule, PanelMenuModule, LogoComponent],
  templateUrl: './menu.component.html',
  standalone: true,
})
export class MenuComponent {
  private readonly _menuService = inject(MenuService);

  constructor() {
    this._menuService.build();
  }

  readonly items = this._menuService.finalMenu;
}
