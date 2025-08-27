import { inject, Injectable } from '@angular/core';
import { DummyBaseProvider } from '@services/api/providers/dummy/dummy-base-provider';

@Injectable({
  providedIn: 'root',
})
export class DummyProvider {
  private _dummyBaseProvider = inject(DummyBaseProvider);

  /**
   * Retrieves user data from the API.
   */
  public get users() {
    this._dummyBaseProvider.endpoint = 'users';
    return this._dummyBaseProvider;
  }

  /**
   * Retrieves product data from the API.
   */
  public get products() {
    this._dummyBaseProvider.endpoint = 'products';
    return this._dummyBaseProvider;
  }

  /**
   * Retrieves post data from the API.
   */
  public get posts() {
    this._dummyBaseProvider.endpoint = 'posts';
    return this._dummyBaseProvider;
  }

  /**
   * Retrieves cart data from the API.
   */
  public get carts() {
    this._dummyBaseProvider.endpoint = 'carts';
    return this._dummyBaseProvider;
  }

  /**
   * Retrieves todo list data from the API.
   */
  public get todos() {
    this._dummyBaseProvider.endpoint = 'todos';
    return this._dummyBaseProvider;
  }

  /**
   * Retrieves quote data from the API.
   */
  public get quotes() {
    this._dummyBaseProvider.endpoint = 'quotes';
    return this._dummyBaseProvider;
  }

  /**
   * Retrieves image placeholder data from the API.
   */
  public get images() {
    this._dummyBaseProvider.endpoint = 'images';
    return this._dummyBaseProvider;
  }

  /**
   * Retrieves comment data from the API.
   */
  public get comments() {
    this._dummyBaseProvider.endpoint = 'comments';
    return this._dummyBaseProvider;
  }

  /**
   * Retrieves weather data from the API.
   */
  public get weather() {
    this._dummyBaseProvider.endpoint = 'weather';
    return this._dummyBaseProvider;
  }
}
