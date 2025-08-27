import { Injectable } from '@angular/core';
import CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class PKCEService {
  getCodeVerifier() {
    const rand = new Uint8Array(32);
    crypto.getRandomValues(rand);
    return this.base64URL(CryptoJS.lib.WordArray.create(rand));
  }

  getCodeChallenge(codeVerifier: string): string {
    const hash = CryptoJS.SHA256(codeVerifier);
    return this.base64URL(hash);
  }

  base64URL(wordArray: CryptoJS.lib.WordArray): string {
    return wordArray.toString(CryptoJS.enc.Base64).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  }
}
