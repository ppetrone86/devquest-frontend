import { inject, Injectable } from '@angular/core';
import { ApiService } from '@services/api/api.service';

import { DevQuestProvider } from '@services/api/providers/dev-quest/dev-quest-provider.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameService extends ApiService {
  protected provider = inject(DevQuestProvider);

  /**
   * Creates a new game.
   * @param request Contains the game title and the maximum number of players.
   */
  createGame<T>(request: CreateGameDTO): Observable<T> {
    return this.provider.game().createGame<T>(request);
  }

  /**
   * Joins an existing game using its access code.
   * @param request Contains the code of the game to join.
   */
  joinGame<T>(request: JoinGameDTO): Observable<T> {
    return this.provider.game().joinGame<T>(request);
  }

  /**
   * Starts a game (allowed only for the creator).
   * @param gameId Identifier of the game to start.
   */
  startGame<T>(gameId: string): Observable<T> {
    return this.provider.game().startGame<T>(gameId);
  }

  /**
   * Leaves a game that has not been started yet.
   * @param gameId Identifier of the game to leave.
   */
  leaveGame<T>(gameId: string): Observable<T> {
    return this.provider.game().leaveGame<T>(gameId);
  }

  /**
   * Retrieves the current state of a game.
   * @param gameId Identifier of the game to fetch.
   */
  getGame<T>(gameId: string): Observable<T> {
    return this.provider.game().getGame<T>(gameId);
  }

  /**
   * Retrieves the list of games associated with the current user.
   */
  getUserGames<T>(): Observable<T> {
    return this.provider.game().getUserGames<T>();
  }

  /**
   * Draws an action/event card from the common deck.
   * @param gameId Identifier of the game.
   */
  drawCard<T>(gameId: string): Observable<T> {
    return this.provider.game().drawCard<T>(gameId);
  }

  /**
   * Plays a card from the player's hand.
   * @param gameId Identifier of the game.
   * @param request Contains card information and optional target/extra data.
   */
  playCard<T>(gameId: string, request: PlayCardDTO): Observable<T> {
    return this.provider.game().playCard<T>(gameId, request);
  }

  /**
   * Moves a task across the player's board columns.
   * @param gameId Identifier of the game.
   * @param request Contains task and column move details.
   */
  moveTask<T>(gameId: string, request: MoveTaskDTO): Observable<T> {
    return this.provider.game().moveTask<T>(gameId, request);
  }

  /**
   * Ends the current player's turn.
   * @param gameId Identifier of the game.
   */
  endTurn<T>(gameId: string): Observable<T> {
    return this.provider.game().endTurn<T>(gameId);
  }
}
