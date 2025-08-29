import { BugSeverity } from '@models/bug.model';

export enum CardType {
  TASK = 'TASK',
  ACTION = 'ACTION',
  EVENT = 'EVENT',
  ROLE = 'ROLE',
}

export interface Card {
  id: string;
  type: CardType;
  name: string;
  description: string;
}

export interface TaskCard extends Card {
  type: CardType.TASK;
  duration: number;
  point: number;
  category: string;
}

export enum EffectType {
  ACCELERATE,
  HEAL_BUGS,
  INCREASE_KARMA,
  EXCHANGE_TASK,
  ADD_BUG,
  DECREASE_KARMA,
  RESET_TASK,
}

export interface ActionCard extends Card {
  type: CardType.ACTION;
  effectType: EffectType;
  effectValue?: number;
  conditions?: any;
}

export interface EventCard extends Card {
  type: CardType.EVENT;
  effectType: EffectType;
  severity?: BugSeverity;
  target?: 'SELF' | 'OTHER';
}

export interface RoleCard extends Card {
  type: CardType.ROLE;
}
