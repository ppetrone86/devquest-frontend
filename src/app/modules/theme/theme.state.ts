export enum ColorScheme {
  LIGHT = 'light',
  DARK = 'dark',
}

export enum ThemeKey {
  LIGHT = 'light',
  DARK = 'dark',
}

export interface ThemeDescriptor {
  name: string;
  icon: string;
  colorScheme: ColorScheme;
}

export const THEMES: Record<ThemeKey, ThemeDescriptor> = {
  [ThemeKey.LIGHT]: {
    name: 'light',
    icon: 'pi pi-sun',
    colorScheme: ColorScheme.LIGHT,
  },
  [ThemeKey.DARK]: {
    name: 'dark',
    icon: 'pi pi-moon',
    colorScheme: ColorScheme.DARK,
  },
};

export const getThemeByColorScheme = (colorScheme: ColorScheme): ThemeDescriptor =>
  Object.values(THEMES).find((theme) => theme.colorScheme === colorScheme) as ThemeDescriptor;

export interface ThemeState {
  key: ThemeKey;
}
