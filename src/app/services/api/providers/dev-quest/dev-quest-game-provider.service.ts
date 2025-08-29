import { Injectable } from '@angular/core';
import { DevQuestBaseProvider } from '@services/api/providers/dev-quest/dev-quest-base-provider.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DevQuestGameProvider extends DevQuestBaseProvider {
  constructor() {
    super();
    this.endpoint = 'rest/services/games';
  }

  /**
   * Creates a new game.
   * Endpoint: POST /games
   *
   * @param payload The title and maximum number of players for the game.
   * @returns An observable containing the created game data.
   */
  createGame<T>(payload: CreateGameDTO): Observable<T> {
    return this.httpService.post<T>(`${this.baseUrl}/${this.endpoint}`, payload);
  }

  /**
   * Joins an existing game using an access code.
   * Endpoint: POST /games/join
   *
   * @param payload Contains the game access code.
   * @returns An observable containing the updated game state.
   */
  joinGame<T>(payload: JoinGameDTO): Observable<T> {
    return this.httpService.post<T>(`${this.baseUrl}/${this.endpoint}/join`, payload);
  }

  /**
   * Starts a game (allowed only for the creator).
   * Endpoint: POST /games/{id}/start
   *
   * @param gameId The identifier of the game to start.
   * @returns An observable containing the game state after initialization.
   */
  startGame<T>(gameId: string): Observable<T> {
    return this.httpService.post<T>(`${this.baseUrl}/${this.endpoint}/${gameId}/start`, {});
  }

  /**
   * Leaves a game that has not yet started.
   * Endpoint: POST /games/{id}/leave
   *
   * @param gameId The identifier of the game to leave.
   * @returns An observable reflecting the updated state or success message.
   */
  leaveGame<T>(gameId: string): Observable<T> {
    return this.httpService.post<T>(`${this.baseUrl}/${this.endpoint}/${gameId}/leave`, {});
  }

  /**
   * Retrieves the current state of a game.
   * Endpoint: GET /games/{id}
   *
   * @param gameId The identifier of the game to fetch.
   * @returns An observable containing the game state.
   */
  getGame<T>(gameId: string): Observable<T> {
    return this.httpService.get<T>(`${this.baseUrl}/${this.endpoint}/${gameId}`);
  }

  /**
   * Fetches the list of games the current user is involved in.
   * Endpoint: GET /games?user=current
   *
   * @returns An observable containing an array of the user's games.
   */
  getUserGames<T>(): Observable<T> {
    return this.httpService.get<T>(`${this.baseUrl}/${this.endpoint}?user=current`);
  }

  /**
   * Draws an action or event card from the common deck.
   * Endpoint: POST /games/{id}/draw-card
   *
   * @param gameId The identifier of the game.
   * @returns An observable with the updated player hand and deck state.
   */
  drawCard<T>(gameId: string): Observable<T> {
    return this.httpService.post<T>(`${this.baseUrl}/${this.endpoint}/${gameId}/draw-card`, {});
  }

  /**
   * Plays a card from the player's hand.
   * Endpoint: POST /games/{id}/play-card
   *
   * @param gameId The identifier of the game.
   * @param payload Information about which card is played and any target or extra data.
   * @returns An observable reflecting the game state after the card is played.
   */
  playCard<T>(gameId: string, payload: PlayCardDTO): Observable<T> {
    return this.httpService.post<T>(`${this.baseUrl}/${this.endpoint}/${gameId}/play-card`, payload);
  }

  /**
   * Moves a task across the player's board columns.
   * Endpoint: POST /games/{id}/move-task
   *
   * @param gameId The identifier of the game.
   * @param payload Details about the task move, including source and destination columns.
   * @returns An observable containing the updated game state.
   */
  moveTask<T>(gameId: string, payload: MoveTaskDTO): Observable<T> {
    return this.httpService.post<T>(`${this.baseUrl}/${this.endpoint}/${gameId}/move-task`, payload);
  }

  /**
   * Ends the current player's turn.
   * Endpoint: POST /games/{id}/end-turn
   *
   * @param gameId The identifier of the game.
   * @returns An observable reflecting the updated game state.
   */
  endTurn<T>(gameId: string): Observable<T> {
    return this.httpService.post<T>(`${this.baseUrl}/${this.endpoint}/${gameId}/end-turn`, {});
  }
}
