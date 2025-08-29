import { Card } from 'primeng/card';

export enum DeckType {
  ROLE = 'ROLE_DECK',
  TASK = 'TASK_DECK',
  ACTION = 'ACTION_DECK',
  EVENT = 'EVENT_DECK',
}

export interface Deck {
  id: string;
  type: DeckType;
  cards: Card[];
  name: string;
}
