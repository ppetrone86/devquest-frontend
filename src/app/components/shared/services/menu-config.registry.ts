import { MenuItemConfig, MenuSectionConfig } from '@components/shared/services/menu.types';

export class MenuConfigRegistry {
  static readonly SECTIONS_CONFIGURATION: Record<string, MenuSectionConfig> = {
    home: {
      id: 'home',
      translationKey: 'menu.section.home',
      icon: 'pi pi-home',
      order: 10,
    },
    ai: {
      id: 'ai',
      translationKey: 'menu.section.ai',
      icon: 'pi pi-robot',
      order: 20,
    },
    entities: {
      id: 'entities',
      translationKey: 'menu.section.entities',
      icon: 'pi pi-database',
      order: 30,
    },
    dynamic_form: {
      id: 'dynamic_form',
      translationKey: 'menu.section.dynamic_form',
      icon: 'pi pi-file',
      order: 40,
    },
    test: {
      id: 'test',
      translationKey: 'menu.section.test',
      icon: 'pi pi-cog',
      order: 50,
    },
  };

  static readonly ITEMS_CONFIGURATION: Record<string, MenuItemConfig> = {
    /* ----- Home --------------------------------------------------- */
    'home.dashboard': {
      translationKey: 'menu.dashboard',
      routerLink: '/',
      icon: 'pi pi-home',
      sectionId: 'home',
      order: 1,
    },
    /* ----- AI ----------------------------------------------------- */
    'ai.chat.read': {
      translationKey: 'menu.chat',
      routerLink: '/private/chat',
      icon: 'pi pi-comments',
      sectionId: 'ai',
      order: 1,
    },
    /* ----- Entities ---------------------------------------------- */
    'entities.users.read': {
      translationKey: 'menu.users',
      routerLink: '/private/users',
      icon: 'pi pi-users',
      sectionId: 'entities',
      order: 1,
    },
    'entities.products.read': {
      translationKey: 'menu.products',
      routerLink: '/private/products',
      icon: 'pi pi-box',
      sectionId: 'entities',
      order: 2,
    },
    /* ----- Dynamic Form ------------------------------------------ */
    'dynamic_form.user_registration.read': {
      translationKey: 'menu.user_registration',
      routerLink: '/private/form/user-registration',
      icon: 'pi pi-user',
      sectionId: 'dynamic_form',
      order: 1,
    },
    'dynamic_form.event_registration.read': {
      translationKey: 'menu.event_registration',
      routerLink: '/private/form/event-registration',
      icon: 'pi pi-calendar',
      sectionId: 'dynamic_form',
      order: 2,
    },
    'dynamic_form.job_application.read': {
      translationKey: 'menu.job_application',
      routerLink: '/private/form/job-application',
      icon: 'pi pi-briefcase',
      sectionId: 'dynamic_form',
      order: 3,
    },
    'dynamic_form.expense_report.read': {
      translationKey: 'menu.expense_report',
      routerLink: '/private/form/expense-report',
      icon: 'pi pi-dollar',
      sectionId: 'dynamic_form',
      order: 4,
    },
    'dynamic_form.product_feedback.read': {
      translationKey: 'menu.product_feedback',
      routerLink: '/private/form/product-feedback',
      icon: 'pi pi-comments',
      sectionId: 'dynamic_form',
      order: 5,
    },
    'dynamic_form.jet_search.read': {
      translationKey: 'menu.jet_search',
      routerLink: '/private/form/jet-search',
      icon: 'pi pi-search',
      sectionId: 'dynamic_form',
      order: 6,
    },
    'dynamic_form.currency_input.read': {
      translationKey: 'menu.currency_input',
      routerLink: '/private/form/currency-input',
      icon: 'pi pi-dollar',
      sectionId: 'dynamic_form',
      order: 7,
    },
    /* ----- Public Items------------------------------------------- */
    'test.components': {
      translationKey: 'menu.components',
      routerLink: '/test-components',
      icon: 'pi pi-cog',
      sectionId: 'test',
      order: 1,
    },
  };
}
