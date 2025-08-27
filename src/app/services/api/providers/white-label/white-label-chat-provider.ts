import { Injectable } from '@angular/core';
import { WhiteLabelBaseProvider } from '@services/api/providers/white-label/white-label-base-provider';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WhiteLabelChatProvider extends WhiteLabelBaseProvider {
  constructor() {
    super();
    this.endpoint = 'rest/services/chatbot';
  }

  /**
   * Retrieves a list of items from the API.
   *
   * @returns Observable<T[]> containing the list of retrieved items.
   */
  list<T>(): Observable<T[]> {
    return this.httpService.post<T[]>(`${this.baseUrl}/${this.endpoint}/list`, {});
  }

  /**
   * Submits an evaluation for a given item.
   *
   * @param id The ID of the item to evaluate.
   * @param rate The evaluation rating to submit.
   * @returns Observable<T> containing the evaluation response.
   */
  evaluate<T>(id: number | string, rate: number): Observable<T> {
    return this.httpService.post<T>(`${this.baseUrl}/${this.endpoint}/evaluate`, {
      id: id,
      evaluation: rate,
    });
  }

  /**
   * Creates a new chat session.
   *
   * @returns Observable<Chat> containing the created chat session.
   */
  create<T>(): Observable<T> {
    return this.httpService.post<T>(`${this.baseUrl}/${this.endpoint}/create`, {});
  }

  /**
   * Deletes an entity by its ID.
   *
   * @param chatId The unique identifier of the entity to delete.
   * @returns Observable<T> containing the deletion response.
   */
  delete<T>(chatId: number | string): Observable<T> {
    return this.httpService.post<T>(`${this.baseUrl}/${this.endpoint}/delete`, { id: chatId });
  }

  /**
   * Fetches messages from an existing chat session.
   *
   * @param chatId The ID of the chat to retrieve messages from.
   * @returns Observable<T> containing the list of chat messages.
   */
  fetchMessages<T>(chatId: string): Observable<T> {
    return this.httpService.post<T>(`${this.baseUrl}/${this.endpoint}/load`, { id: chatId });
  }

  /**
   * Sends a message in an existing chat session.
   *
   * @param chatId The ID of the chat session.
   * @param content The message content.
   * @returns Observable<T> containing the sent message.
   */
  sendMessage<T>(chatId: string, content: string): Observable<T> {
    return this.httpService.post<T>(`${this.baseUrl}/${this.endpoint}/sendMessage`, {
      id: chatId,
      message: content,
    });
  }
}
