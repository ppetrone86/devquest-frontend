import { MenuItem } from 'primeng/api';

export interface PermissionedMenuItem extends MenuItem {
  permissions?: string[];
  order?: number;
}

export interface MenuItemConfig {
  translationKey: string;
  routerLink: string | string[];
  icon?: string;
  permissions?: string[];
  order?: number;
  sectionId: string;
}

export interface MenuSectionConfig {
  id: string;
  translationKey: string;
  icon?: string;
  order?: number;
  items?: MenuItem[];
  sectionId?: MenuSectionConfig;
}
