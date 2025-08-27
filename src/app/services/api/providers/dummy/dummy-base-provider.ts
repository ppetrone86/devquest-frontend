import { inject, Injectable } from '@angular/core';
import { ApiProvider } from '@services/api/providers/api-provider';
import { DummyFilterStrategy } from '@services/api/providers/dummy/dummy-filter-strategy';
import { LogService } from '@services/log.service';
import { environment } from '@src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DummyBaseProvider extends ApiProvider {
  // Base URL for the Dummy API, loaded from environment configuration
  protected readonly baseUrl = environment.api.dummyJsonApi.url;

  // Inject the filtering strategy for API responses
  protected readonly filterStrategy = inject(DummyFilterStrategy);

  /**
   * Fetches all items from the API with optional filters and sorting.
   *
   * @param params Query parameters for filtering results.
   * @param sortParams Sorting parameters (not currently used in this method).
   * @param endpoint Custom API endpoint (defaults to the class-level endpoint).
   * @returns Observable<T> containing the API response.
   */
  fetchAll<T>(
    params?: Record<string, string | number>,
    sortParams?: Record<string, string | number>, // Currently unused but reserved for future sorting logic
    endpoint?: string
  ): Observable<T> {
    // Use the provided endpoint or fallback to the default
    const resolvedEndpoint = endpoint ?? this.endpoint;

    // Log the API request endpoint for debugging purposes
    LogService.debug('DummyApiProvider.fetchAll.endpoint', resolvedEndpoint);

    // Apply filters and fetch data from the API
    return this.filterStrategy.applyFilters<T>(params ?? {}, this.baseUrl, resolvedEndpoint);
  }

  /**
   * Fetches an entity by its ID.
   *
   * @param id The unique identifier of the entity.
   * @param endpoint Optional custom endpoint (defaults to the class-defined endpoint).
   * @returns Observable<T> containing the retrieved entity.
   */
  fetchById<T>(id: number | string, endpoint?: string): Observable<T> {
    const apiEndpoint = endpoint ?? this.endpoint;
    return this.httpService.get<T>(`${this.baseUrl}/${apiEndpoint}/${id}`);
  }

  /**
   * Creates a new entity via a POST request.
   *
   * @param entity The entity to be created.
   * @param endpoint Optional custom endpoint (defaults to the class-defined endpoint).
   * @returns Observable<T> containing the created entity.
   */
  create<T>(entity: T, endpoint?: string): Observable<T> {
    const apiEndpoint = endpoint ?? this.endpoint;
    return this.httpService.post<T>(`${this.baseUrl}/${apiEndpoint}`, entity);
  }

  /**
   * Updates an existing entity via a PUT request.
   *
   * @param id The unique identifier of the entity to update.
   * @param entity Partial entity data to update.
   * @param endpoint Optional custom endpoint (defaults to the class-defined endpoint).
   * @returns Observable<T> containing the updated entity.
   */
  update<T>(id: number | string, entity: Partial<T>, endpoint?: string): Observable<T> {
    const apiEndpoint = endpoint ?? this.endpoint;
    return this.httpService.put<T>(`${this.baseUrl}/${apiEndpoint}/${id}`, entity);
  }

  /**
   * Deletes an entity by its ID.
   *
   * @param id The unique identifier of the entity to delete.
   * @param endpoint Optional custom endpoint (defaults to the class-defined endpoint).
   * @returns Observable<T> containing the deletion response.
   */
  delete<T>(id: number | string, endpoint?: string): Observable<T> {
    const apiEndpoint = endpoint ?? this.endpoint;
    return this.httpService.delete<T>(`${this.baseUrl}/${apiEndpoint}/${id}`);
  }
}
