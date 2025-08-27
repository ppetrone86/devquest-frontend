import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';

export const featureSelectorAuthState = createFeatureSelector<AuthState>('authState');

export const selectorAuthState = createSelector(featureSelectorAuthState, (state: AuthState) => state);
export const selectorAuthState_user = createSelector(featureSelectorAuthState, (state: AuthState) => ({
  user: state.user,
  isAuthenticated: state.isAuthenticated,
}));

export const selectorAuthState_tokenInfo = createSelector(featureSelectorAuthState, (state: AuthState) => ({
  bearerAuthorizationToken: state.bearerAuthorizationToken,
  bearerRefreshToken: state.bearerRefreshToken,
  expiresIn: state.expiresIn,
  tokenType: state.tokenType,
}));

export const selectorAuthState_permissions = createSelector(
  featureSelectorAuthState,
  (state: AuthState) => new Set(state.permissions)
);
