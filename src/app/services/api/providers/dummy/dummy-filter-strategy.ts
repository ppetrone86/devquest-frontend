import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FilterStrategy } from '../filter-strategy.interface';

@Injectable({
  providedIn: 'root',
})
export class DummyFilterStrategy implements FilterStrategy {
  // Injects HttpClient for making API requests
  private readonly _httpService: HttpClient = inject(HttpClient);

  /**
   * Applies filtering logic to API requests based on provided parameters.
   * If valid filters are provided, the request is sent to the filter endpoint.
   * Otherwise, a default request is made to retrieve all items.
   *
   * @param params Query parameters for filtering results.
   * @param baseUrl The base API URL.
   * @param endpoint The specific API endpoint.
   * @returns Observable<T> containing the API response.
   */
  applyFilters<T>(params: Record<string, string | number>, baseUrl: string, endpoint: string): Observable<T> {
    // Ensure filters include the 'limit' parameter (specific to DummyJSON API)
    const filters = { ...params, limit: 0 };

    // Check if at least one valid filter exists
    const hasValidFilters = Object.values(params).some((value) => value !== null && value !== '');

    if (hasValidFilters) {
      // Transform filters to the format expected by the API
      const transformedParams = this._transformFiltersToParams(filters);
      return this._httpService.get<T>(`${baseUrl}/${endpoint}/filter`, { params: transformedParams });
    }

    // No filters applied, fetch all items
    return this._httpService.get<T>(`${baseUrl}/${endpoint}`, { params: filters });
  }

  /**
   * Transforms the provided filters object into the format expected by DummyJSON's filter endpoint.
   * It selects the first valid key-value pair (where the value is not an empty string)
   * and returns an object with 'key' and 'value' properties.
   *
   * This transformation is specifically tailored for DummyJSON's filtering mechanism.
   *
   * @param filters The filter object to transform.
   * @returns A transformed object with 'key' and 'value' properties.
   */
  private _transformFiltersToParams(filters: Record<string, string | number>): Record<string, string | number> {
    const validKeys = Object.keys(filters).filter((key) => filters[key] !== '');

    if (validKeys.length === 0) {
      return {}; // No valid filters provided
    }

    const firstKey = validKeys[0];
    const firstValue = filters[firstKey];

    return { key: firstKey, value: firstValue };
  }
}
