import { BugSeverity, BugStatus } from '@models/bug.model';
import { ActionCard, EventCard, RoleCard, TaskCard } from '@models/card.model';
import { Player } from '@models/user.model';

export interface Board {
  todo: TaskCard[];
  doing?: TaskCard[] | null;
  done: TaskCard[];
}

type PlayableCard = ActionCard | EventCard;

export interface BugInstance {
  id: string;
  player?: PlayerGame;
  sourceCard?: PlayableCard;
  severity: BugSeverity;
  status: BugStatus;
  createdAt: Date;
  resolvedAt?: Date;
  note?: string;
}

export interface PlayerGame {
  player: Player;
  role: RoleCard;
  karma: number;
  handCards: PlayableCard[];
  bugs: BugInstance[];
  board: Board;
}

export enum GameStatus {
  WAITING = 'WAITING',
  IN_PROGRESS = 'IN_PROGRESS',
  FINISHED = 'FINISHED',
}

export interface GameDecks {
  roleDeck: RoleCard[];
  taskDeck: TaskCard[];
  drawDeck: PlayableCard[];
  discardDeck: PlayableCard[];
}

export interface Game {
  id: string;
  players: PlayerGame[];
  turnOrder: PlayerGame[]; // Players order game
  currentTurn: PlayerGame;
  status: GameStatus;
  decks: GameDecks;
  logs: any[];
  createdAt: Date;
  updatedAt: Date;
}
