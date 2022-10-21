import { AuthState } from '@/features/authentication/stores/AuthState';
import { PayloadAction } from '@reduxjs/toolkit';
import { updateUser } from '../features/authentication/stores/authSlice';

interface ILogSanitizers {
  [key: string]:
    | {
        actionSanitizer?: (action: PayloadAction<any>) => PayloadAction;
        stateSanitizer?: (state: any) => any;
      }
    | undefined;
}

export const logSanitizers: ILogSanitizers = {
  auth: {
    actionSanitizer: (action: PayloadAction<any>): PayloadAction => {
      if (updateUser.match(action)) {
        if (action.payload) {
          action.payload = {
            displayName: 'redacted',
            id: 'redacted',
          };
        }
      }
      return action;
    },
    stateSanitizer: (state: AuthState): AuthState => {
      if (state.user) {
        state.user = {
          displayName: 'redacted',
          id: 'redacted',
        };
      }
      return state;
    },
  },
};
