import { Injectable } from '@angular/core';
import { environment } from '@src/environments/environment';

export enum TypeAbortReason {
  FAST_FORWARD = 'fast-forward',
}

@Injectable({
  providedIn: 'root',
})
export class EffectsService {
  typeText(text: string, onUpdate: (text: string, typing: boolean) => void, signal?: AbortSignal): void {
    let typing = true;
    let currentText = '';
    let timeout: NodeJS.Timeout;

    const minTypingDelay = environment.componentSettings.chatMessage.typingDelay.min;
    const maxTypingDelay = environment.componentSettings.chatMessage.typingDelay.max;
    const pauseDelay = environment.componentSettings.chatMessage.typingDelay.pause;

    const typeNextCharacter = () => {
      if (typing) {
        currentText += text[currentText.length];
        typing = currentText.length < text.length;
        onUpdate(currentText, typing);

        const baseDelay = Math.floor(Math.random() * (maxTypingDelay - minTypingDelay) + minTypingDelay);
        let delay = baseDelay;
        if (/[.,!?]/.test(currentText[currentText.length - 1])) {
          delay += pauseDelay; // Add a pause after punctuation
        }
        timeout = setTimeout(typeNextCharacter, delay);
      }
    };

    const handleAbort = () => {
      clearTimeout(timeout);
      typing = false;
      signal?.removeEventListener('abort', handleAbort);
      if (signal?.reason === TypeAbortReason.FAST_FORWARD) {
        onUpdate(text, false);
      }
    };

    if (signal) {
      signal.addEventListener('abort', handleAbort);
    }

    typeNextCharacter();
  }
}
