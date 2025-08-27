import { UserModel } from '@models/user.model';
import { createAction, props } from '@ngrx/store';

export enum AuthActionsType {
  AUTH_LOGIN = '[Auth] Login',
  AUTH_INITIALIZE_AUTH_STATE = '[Auth] Initialize Auth State',
  AUTH_INITIALIZE_AUTH_STATE_SUCCESS = '[Auth] Initialize Auth State Success',
  AUTH_REDIRECT_TO_AUTH = '[Auth] Redirect to Auth System',
  AUTH_EXCHANGE_TOKEN = '[Auth]  Exchange Token',
  AUTH_EXCHANGE_TOKEN_SUCCESS = '[Auth] Exchange Token Success',
  AUTH_UPDATE_TOKEN_SUCCESS = '[Auth] Update Token Success',
  AUTH_REFRESH_TOKEN_PROACTIVE = '[Auth] Refresh Token Proactive',
  AUTH_LOGIN_SUCCESS = '[Auth] Login Success',
  AUTH_LOGIN_ERROR = '[Auth] Login Error',
  AUTH_LOGOUT = '[Auth] Logout',
  AUTH_LOGOUT_SUCCESS = '[Auth] Logout Success',
}

// Action to start the login process, initiates the authentication process
export const login = createAction(AuthActionsType.AUTH_LOGIN);

export const initializeAuthState = createAction(AuthActionsType.AUTH_INITIALIZE_AUTH_STATE);

export const initializeAuthStateSuccess = createAction(
  AuthActionsType.AUTH_INITIALIZE_AUTH_STATE_SUCCESS,
  props<{ codeVerifier: string; codeChallenge: string; state: string; nonce: string }>()
);

export const redirectToAuth = createAction(AuthActionsType.AUTH_REDIRECT_TO_AUTH);

// Action to send the code and retrieve the token (this starts the token exchange flow)
export const exchangeToken = createAction(AuthActionsType.AUTH_EXCHANGE_TOKEN, props<{ code: string }>());

// Successful retrieval of bearer token, refresh token, and user
export const exchangeTokenSuccess = createAction(
  AuthActionsType.AUTH_EXCHANGE_TOKEN_SUCCESS,
  props<{
    bearerToken: string;
    refreshToken: string;
    expiresIn: number;
    expiresInTimestamp: number;
    tokenType: string;
  }>()
);

// Successful update of bearer token, refresh token, and user
export const updateTokenSuccess = createAction(
  AuthActionsType.AUTH_UPDATE_TOKEN_SUCCESS,
  props<{ bearerToken: string; refreshToken: string }>()
);

export const refreshTokenProactive = createAction(
  AuthActionsType.AUTH_REFRESH_TOKEN_PROACTIVE,
  props<{ refreshToken: string }>()
);

// Action to confirm the successful generation of the login URL (optional, if you want to manage it in the reducer)
export const loginSuccess = createAction(
  AuthActionsType.AUTH_LOGIN_SUCCESS,
  props<{
    user: UserModel;
    permissions: string[];
  }>()
);

// Action to handle an error during login or authentication process
export const loginError = createAction(AuthActionsType.AUTH_LOGIN_ERROR, props<{ error: string }>());

// Action for logging out
export const logout = createAction(AuthActionsType.AUTH_LOGOUT);
export const logoutSuccess = createAction(AuthActionsType.AUTH_LOGOUT_SUCCESS);
