import Aura from '@primeuix/themes/aura';
import { definePreset } from '@primeuix/themes';

/**
 * Dev  Quest preset based on PrimeNG Aura.
 * Keep ONLY theme data here — no framework imports, no side effects.
 */
export const DevQuestPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50:  '#F5F3FF',
      100: '#EDE9FE',
      200: '#DDD6FE',
      300: '#C4B5FD',
      400: '#A78BFA',
      500: '#8B5CF6', // Violet “main”
      600: '#7C3AED',
      700: '#6D28D9',
      800: '#5B21B6',
      900: '#4C1D95',
      950: '#2E1065',
    },
    accent: {
      100: '#D1FAE5',
      300: '#6EE7B7',
      500: '#10B981', // emerald green accent
      700: '#047857',
    },
    colorScheme: {
      light: {
        primary: {
          contrastColor: '{zinc.900}',
        },
      },
      dark: {
        primary: {
          contrastColor: '{zinc.50}',
        },
      },
    },
  },
});
