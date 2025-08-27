import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  randomString(length = 10): string {
    const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);

    let result = '';
    for (let i = 0; i < length; i++) {
      result += CHARS[array[i] % CHARS.length];
    }

    return result;
  }

  static getCategoryColors(length: number): string[] {
    const colorVars = [
      '--p-blue-500',
      '--p-emerald-500',
      '--p-amber-500',
      '--p-violet-500',
      '--p-red-500',
      '--p-yellow-500',
    ];

    return Array.from({ length }, (_, i) =>
      getComputedStyle(document.documentElement)
        .getPropertyValue(colorVars[i % colorVars.length])
        .trim()
    );
  }

  static checkStringIsEmpty(str: string): boolean {
    return str == null || str === 'undefined' || str.trim() === '';
  }

  static checkStringIsEqual(str1: string, str2: string): boolean {
    if (this.checkStringIsEmpty(str1)) return false;

    if (this.checkStringIsEmpty(str2)) return false;

    return str1.trim() === str2.trim();
  }

  static checkRegexMatch(regexPattern: string, value: string, errorKey: string) {
    const regex = new RegExp(regexPattern);
    return regex.test(value) ? null : { [errorKey]: true };
  }

  static generateRandomDate(): Date {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 365);
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }

  static hexToRgba(hex: string, opacity: number): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
}
