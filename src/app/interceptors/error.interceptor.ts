import { HttpErrorResponse, HttpHandlerFn, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { inject } from '@angular/core';
import { ErrorConstants } from '@components/shared/notifications/error.contants';
import { showErrorToast } from '@components/shared/notifications/toast/toast.actions';
import { logoutSuccess } from '@modules/auth/auth.actions';
import { Store } from '@ngrx/store';
import { LogService } from '@services/log.service';
import { catchError, Observable, of, throwError } from 'rxjs';

export function errorInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<any> {
  const store: Store = inject(Store);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = '';

      if (error.status === 0) {
        errorMessage = handleUnknownError(error);

        if (req.url.includes('/logout')) {
          // TODO: Temporary workaround - dispatch logoutSuccess until the logout endpoint is implemented.
          store.dispatch(logoutSuccess());
          return of(null);
        }
      } else if (error.status === HttpStatusCode.Unauthorized) {
        LogService.error('errorInterceptor.handleUnauthorizedError()', error);
        errorMessage = ErrorConstants.UNAUTHORIZED;
        store.dispatch(logoutSuccess());
      } else if (error.status === HttpStatusCode.Forbidden) {
        LogService.error('errorInterceptor.handleForbiddenError()', error);
        errorMessage = ErrorConstants.FORBIDDEN;
        // TODO: refresh user details
      } else if (error.headers.has('Application-Error')) {
        errorMessage = handleApplicationError(error);
      } else {
        errorMessage = handleServerError(error);
      }

      store.dispatch(showErrorToast({ toast: { detail: errorMessage } }));
      return throwError(() => new Error(errorMessage));
    })
  );

  function handleUnknownError(error: HttpErrorResponse): string {
    LogService.error('errorInterceptor.handleUnknownError()', error);
    if (error?.statusText === 'Unknown Error') {
      return ErrorConstants.SERVER_NOT_RESPONDING;
    }

    return ErrorConstants.UNKNOWN_ERROR;
  }

  function handleApplicationError(error: HttpErrorResponse): string {
    LogService.error('errorInterceptor.handleApplicationError()', error);
    return ErrorConstants.APPLICATION_ERROR;
  }

  function handleServerError(error: HttpErrorResponse): string {
    LogService.error('errorInterceptor.handleServerError()', error);
    return ErrorConstants.handleError(error.status);
  }
}
