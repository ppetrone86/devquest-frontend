import { HttpClient, HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { LogService } from '@services/log.service';
import { Observable, catchError, throwError } from 'rxjs';

// Interface for HTTP options to ensure type safety
export interface HttpOptions {
  headers?: HttpHeaders | Record<string, string | string[]>;
  context?: HttpContext;
  observe?: 'body'; // Default observe type
  params?: HttpParams | Record<string, string | number | boolean | readonly (string | number | boolean)[]>;
  reportProgress?: boolean;
  responseType?: 'json'; // Default response type
  withCredentials?: boolean;
  transferCache?: { includeHeaders?: string[] } | boolean;
}

@Injectable({
  providedIn: 'root', // Singleton service, available throughout the app
})
export class HttpService {
  private _http: HttpClient = inject(HttpClient); // Injecting HttpClient for HTTP requests

  /**
   * HTTP GET request
   * @param url - The URL to send the GET request to
   * @param options - Optional HTTP options for customization
   * @returns Observable of the response body
   */
  get<T>(url: string, options?: HttpOptions): Observable<T> {
    return this._http.get<T>(url, options).pipe(
      catchError(this._handleError) // Handle errors globally for GET requests
    );
  }

  /**
   * HTTP POST request
   * @param url - The URL to send the POST request to
   * @param body - The body of the request (data to send)
   * @param options - Optional HTTP options for customization
   * @returns Observable of the response body
   */
  post<T>(url: string, body: any, options?: HttpOptions): Observable<T> {
    return this._http.post<T>(url, body, options).pipe(
      catchError(this._handleError) // Handle errors globally for POST requests
    );
  }

  /**
   * HTTP PUT request
   * @param url - The URL to send the PUT request to
   * @param body - The body of the request (data to update)
   * @param options - Optional HTTP options for customization
   * @returns Observable of the response body
   */
  put<T>(url: string, body: any, options?: HttpOptions): Observable<T> {
    return this._http.put<T>(url, body, options).pipe(
      catchError(this._handleError) // Handle errors globally for PUT requests
    );
  }

  /**
   * HTTP DELETE request
   * @param url - The URL to send the DELETE request to
   * @param options - Optional HTTP options for customization
   * @returns Observable of the response body
   */
  delete<T>(url: string, options?: HttpOptions): Observable<T> {
    return this._http.delete<T>(url, options).pipe(
      catchError(this._handleError) // Handle errors globally for DELETE requests
    );
  }

  /**
   * Handles HTTP errors in a centralized way.
   * @param error - The error response
   * @returns Observable that throws an error with a standardized message
   */
  private _handleError(error: any): Observable<never> {
    // Log the error for debugging and tracking purposes
    LogService.error('HTTP Error:', error);

    // Return an observable that throws a standardized error message
    return throwError(() => new Error('An error occurred during the HTTP request!'));
  }
}
