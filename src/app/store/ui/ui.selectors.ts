import { createSelector } from '@ngrx/store';

export const selectUIState = (state: any) => state.uiState;

export const selectGlobalMessage = createSelector(selectUIState, (state) => state.globalMessage);
