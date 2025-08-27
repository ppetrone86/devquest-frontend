export type GlobalMessageType = 'error' | 'info' | 'warning' | 'success';

export interface UIState {
  globalMessage: {
    messageType: GlobalMessageType | null;
    message: string | null;
  };
}

export const initialUIState: UIState = {
  globalMessage: {
    messageType: null,
    message: null,
  },
};
