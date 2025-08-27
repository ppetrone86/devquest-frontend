import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { MenuConfigRegistry } from '@components/shared/services/menu-config.registry';
import { PermissionService } from '@modules/auth/permission.service';
import { TranslateService } from '@ngx-translate/core';
import { LogService } from '@services/log.service';
import { environment } from '@src/environments/environment';
import { MenuChangeEvent } from '../api/menu-change-event';
import { PermissionedMenuItem } from './menu.types';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private _http: HttpClient = inject(HttpClient);
  private _permissionService = inject(PermissionService);
  private _translateService = inject(TranslateService);

  private readonly _dryRun: boolean = environment.dryRun;
  private readonly _mockMenuData = 'assets/data/mock/menu-items.json';

  readonly finalMenu = signal<PermissionedMenuItem[]>([]);

  menuStateChange = signal<MenuChangeEvent | null>(null);
  resetState = signal<boolean>(false);

  public build(): void {
    this._dryRun ? this._loadMockMenu() : this._loadUserMenu();
  }

  private _loadUserMenu() {
    const builtMenu = computed(() => this._buildMenu());
    effect(() => this.finalMenu.set(builtMenu()));
  }

  private _buildMenu(): PermissionedMenuItem[] {
    const userPermissions: Set<string> = this._permissionService.userPermissions();
    const sectionsMap = new Map<string, PermissionedMenuItem>();

    userPermissions.forEach((permission) => {
      const itemConfiguration = MenuConfigRegistry.ITEMS_CONFIGURATION[permission];
      if (!itemConfiguration) {
        LogService.debug('Cannot find item configuration for', permission);
        return;
      }

      const section = this._getOrCreateSection(sectionsMap, itemConfiguration.sectionId);

      section.items!.push(this._createItem(itemConfiguration, permission));
    });

    return this._sortSectionsAndItems(sectionsMap);
  }

  private _getOrCreateSection(sectionMap: Map<string, PermissionedMenuItem>, sectionId: string): PermissionedMenuItem {
    let section = sectionMap.get(sectionId);

    if (section) {
      return section;
    }

    const sectionConfig = MenuConfigRegistry.SECTIONS_CONFIGURATION[sectionId] ?? { translationKey: sectionId };
    section = {
      id: sectionId,
      label: this._translateService.instant(sectionConfig.translationKey),
      icon: sectionConfig.icon,
      order: sectionConfig.order ?? 0,
      items: [],
    };
    sectionMap.set(sectionId, section);

    return section;
  }

  private _createItem(
    itemConfig: (typeof MenuConfigRegistry.ITEMS_CONFIGURATION)[string],
    permission: string
  ): PermissionedMenuItem {
    return {
      label: this._translateService.instant(itemConfig.translationKey),
      icon: itemConfig.icon,
      routerLink: itemConfig.routerLink,
      permissions: [permission],
      order: itemConfig.order ?? 0,
    };
  }

  private _sortSectionsAndItems(sectionsMap: Map<string, PermissionedMenuItem>): PermissionedMenuItem[] {
    const byOrder = (a: PermissionedMenuItem, b: PermissionedMenuItem) => (a.order ?? 0) - (b.order ?? 0);

    const sections = Array.from(sectionsMap.values()).sort(byOrder);
    sections.forEach((s) => s.items?.sort(byOrder));

    return sections;
  }

  private _loadMockMenu() {
    this._http.get<PermissionedMenuItem[]>(this._mockMenuData).subscribe({
      next: (response) => {
        this.finalMenu.set(response);
      },
      error: (err) => LogService.error('Failed to build menu', err),
    });
  }

  onMenuStateChange(event: MenuChangeEvent) {
    this.menuStateChange.set(event);
  }

  reset() {
    this.resetState.set(true);
    setTimeout(() => this.resetState.set(false), 0);
  }
}
