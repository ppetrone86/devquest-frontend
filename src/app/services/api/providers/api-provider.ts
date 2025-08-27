import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export abstract class ApiProvider {
  // Private API endpoint (should be defined by subclasses or dynamically set)
  private _endpoint!: string;

  // Injected HttpClient service for making API requests
  protected readonly httpService: HttpClient = inject(HttpClient);

  // Base URL for API requests (must be implemented by subclasses)
  protected abstract baseUrl: string;

  /**
   * Gets the current API endpoint.
   *
   * @returns The currently set API endpoint.
   */
  public get endpoint(): string {
    return this._endpoint;
  }

  /**
   * Sets a new API endpoint.
   *
   * @param endpoint The new endpoint to be assigned.
   */
  public set endpoint(endpoint: string) {
    this._endpoint = endpoint;
  }
}
