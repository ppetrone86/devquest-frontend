import { Component, inject } from '@angular/core';
import { LayoutService } from '@components/layouts/services/layout.service';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-sidebar',
  imports: [DrawerModule, ButtonModule, MenuComponent],
  templateUrl: './sidebar.component.html',
  standalone: true,
})
export class SidebarComponent {
  private _layoutService: LayoutService = inject(LayoutService);

  visible = this._layoutService.menuSidebarVisible;

  hideSidebar() {
    this._layoutService.setMenuSidebar(false);
  }
}
