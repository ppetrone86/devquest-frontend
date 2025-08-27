import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private readonly _isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  public getItem<T>(key: string): T | null {
    if (!this._isBrowser) return null;

    const stored = localStorage.getItem(key);
    if (!stored) return null;

    try {
      return JSON.parse(stored) as T;
    } catch {
      return stored as T;
    }
  }

  public setItem<T>(key: string, value: T): boolean {
    if (!this._isBrowser) return false;

    localStorage.setItem(key, JSON.stringify(value));
    return true;
  }

  public removeItem(key: string): boolean {
    if (!this._isBrowser) return false;

    localStorage.removeItem(key);
    return true;
  }

  public clear(): boolean {
    if (!this._isBrowser) return false;

    localStorage.clear();
    return true;
  }
}
