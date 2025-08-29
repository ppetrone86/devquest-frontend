import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';

/**
 * Dev  Quest preset based on PrimeNG Aura.
 * Keep ONLY theme data here — no framework imports, no side effects.
 */
export const DevQuestPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#FFF9E6',
      100: '#FFF3CC',
      200: '#FFE799',
      300: '#FEDB67',
      400: '#FECF34',
      500: '#FDC301',
      600: '#CB9C01',
      700: '#987501',
      800: '#664E00',
      900: '#332700',
      950: '#191300',
    },
    colorScheme: {
      light: {
        primary: {
          contrastColor: '{zinc.900}',
        },
      },
      dark: {},
    },
  },
});
