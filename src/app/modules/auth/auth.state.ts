import { UserModel } from '@models/user.model';

export interface AuthState {
  user?: UserModel | null;
  permissions: string[];
  isAuthenticated?: boolean;
  loading?: boolean;
  error?: string | null;
  state?: string | null;
  codeVerifier?: string | null;
  codeChallenge?: string | null;
  nonce?: string | null;
  authorizationToken?: string | null;
  bearerAuthorizationToken?: string | null;
  bearerRefreshToken?: string | null;
  expiresIn?: number | null;
  expiresInTimestamp?: number | null;
  tokenType?: string | null;
}
