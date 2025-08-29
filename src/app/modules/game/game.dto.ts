interface CreateGameDTO {
  title: string;
  maxPlayers: number;
}

interface JoinGameDTO {
  code: string;
}

interface PlayCardDTO {
  cardId: string;
  targetPlayerId?: string;
  extraData?: any;
}

interface MoveTaskDTO {
  taskId: string;
  fromColumn: 'todo' | 'doing' | 'done';
  toColumn: 'todo' | 'doing' | 'done';
}
