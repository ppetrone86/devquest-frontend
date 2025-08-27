import { createReducer, on } from '@ngrx/store';
import { clearGlobalMessage, setGlobalMessage } from './ui.actions';
import { initialUIState } from './ui.state';

export const uiReducer = createReducer(
  initialUIState,
  on(setGlobalMessage, (state, { messageType, message }) => ({
    ...state,
    globalMessage: { messageType, message },
  })),
  on(clearGlobalMessage, (state) => ({
    ...state,
    globalMessage: { messageType: null, message: null },
  }))
);
