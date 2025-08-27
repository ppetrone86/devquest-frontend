import { Observable } from 'rxjs';

/**
 * Interface for implementing different filtering strategies for API requests.
 * Each strategy should define how filters are applied to the API request.
 */
export interface FilterStrategy {
  /**
   * Applies filters to an API request.
   *
   * @param params Query parameters used for filtering results.
   * @param baseUrl The base API URL where the request is made.
   * @param endpoint The specific API endpoint to be used.
   * @returns Observable<T> containing the filtered API response.
   */
  applyFilters<T>(params: Record<string, string | number>, baseUrl: string, endpoint: string): Observable<T>;
}
