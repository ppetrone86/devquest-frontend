export class ErrorConstants {
  // Field Errors
  static readonly REQUIRED = 'common.fieldValidators.required';
  static readonly MIN_LENGTH = 'common.fieldValidators.minLength';
  static readonly MAX_LENGTH = 'common.fieldValidators.maxLength';
  static readonly MIN = 'common.fieldValidators.min';
  static readonly MAX = 'common.fieldValidators.max';
  static readonly PATTERN = 'common.fieldValidators.pattern';
  static readonly EMAIL = 'common.fieldValidators.email';
  static readonly URL = 'common.fieldValidators.url';
  static readonly DATE = 'common.fieldValidators.date';
  static readonly FILE = 'common.fieldValidators.file';
  static readonly CUSTOM = 'common.fieldValidators.custom';

  // HTTP Errors
  static readonly BAD_REQUEST = 'errors.400_badRequest';
  static readonly UNAUTHORIZED = 'errors.401_unauthorized';
  static readonly AUTHENTICATION_ERROR = 'errors.401_authenticationError';
  static readonly FORBIDDEN = 'errors.403_forbidden';
  static readonly NOT_FOUND = 'errors.404_notFound';
  static readonly REQUEST_TIMEOUT = 'errors.408_requestTimeout';
  static readonly CONFLICT = 'errors.409_conflict';
  static readonly PAYLOAD_TOO_LARGE = 'errors.413_payloadTooLarge';
  static readonly TOO_MANY_REQUESTS = 'errors.429_tooManyRequests';
  static readonly INTERNAL_SERVER_ERROR = 'errors.500_internalServerError';
  static readonly BAD_GATEWAY = 'errors.502_badGateway';
  static readonly SERVICE_UNAVAILABLE = 'errors.503_serviceUnavailable';
  static readonly GATEWAY_TIMEOUT = 'errors.504_gatewayTimeout';

  // Network Errors
  static readonly NETWORK_ERROR = 'errors.networkError';
  static readonly CONNECTION_TIMEOUT = 'errors.connectionTimeout';
  static readonly SERVER_NOT_RESPONDING = 'errors.serverNotResponding';

  // Generic Errors
  static readonly UNKNOWN_ERROR = 'errors.unknownError';
  static readonly APPLICATION_ERROR = 'errors.applicationError';

  // Other Errors
  static readonly NO_REFRESH_TOKEN = 'errors.noRefreshToken';
  static readonly FAILED_TO_REFRESH_TOKEN = 'errors.failedToRefreshToken';
  static readonly PKCE_GENERATION_FAILED = 'errors.pkceGenerationFailed';
  static readonly CODE_OR_VERIFIER_MISSING = 'errors.codeOrVerifierMissing';
  static readonly AUTH_PROVIDER_CONNECTION_FAILED = 'errors.authProviderConnectionFailed';

  static handleError(status: number): string {
    switch (status) {
      case 400:
        return ErrorConstants.BAD_REQUEST;
      case 401:
        return ErrorConstants.UNAUTHORIZED;
      case 403:
        return ErrorConstants.FORBIDDEN;
      case 404:
        return ErrorConstants.NOT_FOUND;
      case 408:
        return ErrorConstants.REQUEST_TIMEOUT;
      case 429:
        return ErrorConstants.TOO_MANY_REQUESTS;
      case 500:
        return ErrorConstants.INTERNAL_SERVER_ERROR;
      case 502:
        return ErrorConstants.BAD_GATEWAY;
      case 503:
        return ErrorConstants.SERVICE_UNAVAILABLE;
      case 504:
        return ErrorConstants.GATEWAY_TIMEOUT;
      default:
        return ErrorConstants.UNKNOWN_ERROR;
    }
  }
}
