import { formActionReducer, initialFormActionState } from '@components/shared/forms/state/form-action-reducer';
import { initialState as initialToastState, toastReducer } from '@components/shared/notifications/toast/toast.reducer';
import { chatReducer, initialState as initialChatState } from '@modules/ai/chat.reducer';
import { logoutSuccess } from '@modules/auth/auth.actions';
import { authReducer, initialState as initialAuthState } from '@modules/auth/auth.reducer';
import { initialState as initialOrderState, orderReducer } from '@modules/order/order.reducer';
import { initialState as initialPostState, postReducer } from '@modules/post/post.reducer';
import { initialState as initialProductState, productReducer } from '@modules/product/product.reducer';
import { themeReducer } from '@modules/theme/theme.reducer';
import { initialState as initialUserState, userReducer } from '@modules/user/user.reducer';
import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { uiReducer } from '@src/app/store/ui/ui.reducer';
import { initialUIState } from '@src/app/store/ui/ui.state';

export const reducers: ActionReducerMap<any> = {
  uiState: uiReducer,
  themeState: themeReducer,
  authState: authReducer,
  productState: productReducer,
  userState: userReducer,
  postState: postReducer,
  orderState: orderReducer,
  toastState: toastReducer,
  chatState: chatReducer,
  formActionState: formActionReducer,
};

export function clearState(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state, action) {
    if (action.type === logoutSuccess.type) {
      return {
        ...state,
        uiState: initialUIState,
        themeState: state.themeState,
        authState: initialAuthState,
        productState: initialProductState,
        userState: initialUserState,
        postState: initialPostState,
        orderState: initialOrderState,
        toastState: initialToastState,
        chatState: initialChatState,
        formActionState: initialFormActionState,
      };
    }
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [clearState];
