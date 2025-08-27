import { Component, inject, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { TopbarComponent } from '../../shared/topbar/topbar.component';
import { LayoutService } from '../services/layout.service';

@Component({
  selector: 'app-private-layout',
  imports: [TopbarComponent, SidebarComponent, RouterOutlet],
  templateUrl: './private-layout.component.html',
  standalone: true,
})
export default class PrivateLayoutComponent {
  @ViewChild(SidebarComponent) appSidebar!: SidebarComponent;
  @ViewChild(TopbarComponent) appTopbar!: TopbarComponent;

  private _layoutService: LayoutService = inject(LayoutService);

  sidebarVisible = this._layoutService.menuSidebarVisible;

  hideSidebar() {
    this._layoutService.setMenuSidebar(false);
  }
}
