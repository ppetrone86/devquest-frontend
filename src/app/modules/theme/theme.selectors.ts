import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ColorScheme, THEMES, ThemeState } from './theme.state';

export const THEME_STORAGE_KEY = 'themeState';

export const featureSelectorThemeState = createFeatureSelector<ThemeState>(THEME_STORAGE_KEY);

export const selectorThemeState = createSelector(featureSelectorThemeState, (state) => state);
export const selectorThemeState_key = createSelector(selectorThemeState, (state) => state.key);
export const selectorThemeState_theme = createSelector(selectorThemeState_key, (key) => THEMES[key]);
export const selectorThemeState_colorScheme = createSelector(selectorThemeState_theme, (theme) => theme.colorScheme);

export const getSelectorThemeState_value = <T>(values: Record<ColorScheme, T>) => {
  return createSelector(selectorThemeState_colorScheme, (colorScheme) => values[colorScheme]);
};
