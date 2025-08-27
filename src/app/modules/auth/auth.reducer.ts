import { createReducer, on } from '@ngrx/store';
import {
  exchangeToken,
  exchangeTokenSuccess,
  initializeAuthStateSuccess,
  login,
  loginError,
  loginSuccess,
  logoutSuccess,
  updateTokenSuccess,
} from './auth.actions';
import { AuthState } from './auth.state';

export const initialState: AuthState = {
  user: null,
  permissions: [],
  isAuthenticated: false,
  loading: false,
  error: null,
  state: null,
  codeVerifier: null,
  codeChallenge: null,
  nonce: null,
  authorizationToken: null,
  bearerAuthorizationToken: null,
  bearerRefreshToken: null,
  expiresIn: null,
  expiresInTimestamp: null,
  tokenType: null,
};

export const authReducer = createReducer(
  initialState,
  on(login, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(initializeAuthStateSuccess, (state, { codeVerifier, codeChallenge, state: _state, nonce }) => ({
    ...state,
    codeVerifier: codeVerifier,
    codeChallenge: codeChallenge,
    state: _state,
    nonce: nonce,
    isAuthenticated: false,
    error: null,
  })),

  on(exchangeToken, (state, { code }) => ({
    ...state,
    authorizationToken: code,
    loading: true,
    error: null,
  })),

  on(exchangeTokenSuccess, (state, { bearerToken, refreshToken, expiresIn, expiresInTimestamp, tokenType }) => ({
    ...state,
    bearerAuthorizationToken: bearerToken,
    bearerRefreshToken: refreshToken,
    expiresIn: expiresIn,
    expiresInTimestamp: expiresInTimestamp,
    tokenType: tokenType,
    isAuthenticated: false,
    loading: true,
    error: null,
  })),

  on(updateTokenSuccess, (state, { bearerToken, refreshToken }) => ({
    ...state,
    bearerAuthorizationToken: bearerToken,
    bearerRefreshToken: refreshToken,
  })),

  on(loginSuccess, (state, { user, permissions }) => ({
    ...state,
    user: user,
    permissions: permissions,
    loading: false,
    isAuthenticated: true,
    error: null,
  })),

  on(loginError, (state, { error }) => ({
    ...state,
    error: error,
    loading: false,
  })),

  on(logoutSuccess, () => ({
    ...initialState,
  }))
);
