import {
  Component,
  HostListener,
  inject,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { LayoutService } from '@components/layouts/services/layout.service';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-menubar',
  imports: [ButtonModule, MenuModule, TooltipModule],
  templateUrl: './menubar.component.html',
  standalone: true,
})
export class MenubarComponent implements OnInit {
  private _layoutService: LayoutService = inject(LayoutService);
  private _viewContainerRef: ViewContainerRef = inject(ViewContainerRef);

  @ViewChild('mobileTemplate', { static: true })
  mobileTemplate!: TemplateRef<any>;

  @ViewChild('desktopTemplate', { static: true })
  desktopTemplate!: TemplateRef<any>;

  @Input() model: MenuItem[] = [];

  @Input() iconOnly = false;

  isMobile = false;

  ngOnInit(): void {
    this._checkScreenSize(true);
  }

  @HostListener('window:resize', [])
  onResize() {
    this._checkScreenSize();
  }

  private _checkScreenSize(forceUpdate = false) {
    const isMobile = this._layoutService.isMobile();
    if (forceUpdate || this.isMobile !== isMobile) {
      this.isMobile = isMobile;
      this._updateViewContainer();
    }
  }

  private _updateViewContainer() {
    this._viewContainerRef.clear();
    if (this.isMobile) {
      this._viewContainerRef.createEmbeddedView(this.mobileTemplate);
    } else {
      this._viewContainerRef.createEmbeddedView(this.desktopTemplate);
    }
  }
}
