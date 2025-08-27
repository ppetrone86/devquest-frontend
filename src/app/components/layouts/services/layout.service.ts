import { isPlatformBrowser } from '@angular/common';
import { computed, effect, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

export interface AppConfig {
  ripple: boolean;
  inputStyle: string;
  menuMode: string;
  scale: number;
}

interface LayoutState {
  staticMenuDesktopInactive: boolean;
  overlayMenuActive: boolean;
  profileSidebarVisible: boolean;
  configSidebarVisible: boolean;
  staticMenuMobileActive: boolean;
  menuHoverActive: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  private readonly _isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  // Configuration using signals
  config = signal<AppConfig>({
    ripple: false,
    inputStyle: 'outlined',
    menuMode: 'static',
    scale: 14,
  });

  // Layout state using signals
  state = signal<LayoutState>({
    staticMenuDesktopInactive: false,
    overlayMenuActive: false,
    profileSidebarVisible: false,
    configSidebarVisible: false,
    staticMenuMobileActive: false,
    menuHoverActive: false,
  });

  // Signal to track menu sidebar visibility
  menuSidebarVisible = signal<boolean>(this.isDesktop());

  constructor() {
    // Reactive effect to handle config updates
    effect(() => {
      const currentConfig = this.config();
      this.changeScale(currentConfig.scale);
      this.onConfigUpdate(currentConfig);
    });
  }

  // Compute container classes for private layout
  containerClassesForPrivateLayout = computed(() => ({
    'layout-overlay': this.config().menuMode === 'overlay',
    'layout-static': this.config().menuMode === 'static',
    'layout-static-inactive': this.state().staticMenuDesktopInactive && this.config().menuMode === 'static',
    'layout-overlay-active': this.state().overlayMenuActive,
    'layout-mobile-active': this.state().staticMenuMobileActive,
    'p-input-filled': this.config().inputStyle === 'filled',
    'p-ripple-disabled': !this.config().ripple,
  }));

  // Compute container classes for home layout
  containerClassesForHomeLayout = computed(() => ({
    // Add specific classes for home layout if needed
  }));

  // Set menu sidebar visibility
  setMenuSidebar(visible: boolean) {
    this.menuSidebarVisible.set(visible);
  }

  // Toggle menu sidebar visibility
  toggleMenuSidebar() {
    this.menuSidebarVisible.set(!this.menuSidebarVisible());
  }

  // Show/hide profile sidebar
  showProfileSidebar() {
    const currentState = this.state();
    this.state.set({
      ...currentState,
      profileSidebarVisible: !currentState.profileSidebarVisible,
    });
  }

  // Show config sidebar
  showConfigSidebar() {
    const currentState = this.state();
    this.state.set({
      ...currentState,
      configSidebarVisible: true,
    });
  }

  // Check if menu mode is overlay
  isOverlay() {
    return this.config().menuMode === 'overlay';
  }

  // Check if the device is desktop
  isDesktop() {
    return this._isBrowser && window.innerWidth > 991;
  }

  // Check if the device is mobile
  isMobile() {
    return !this.isDesktop();
  }

  // Update the configuration
  onConfigUpdate(newConfig: AppConfig) {
    // Handle configuration updates here if needed
  }

  // Dynamically change scale
  changeScale(value: number) {
    if (!this._isBrowser) return;
    document.documentElement.style.fontSize = `${value}px`;
  }
}
