import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { firebaseUserListener } from '../api/authApiCalls';
import { AuthState } from './AuthState';

const initialState: AuthState = {
  isLoading: true,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    updateUser(
      state,
      action: PayloadAction<{ displayName?: string; id: string } | undefined>
    ) {
      if (action.payload) {
        state.user = {
          displayName: action.payload.displayName,
          id: action.payload.id,
        };
        state.isLoading = false;
        state.error = undefined;
      } else {
        state.user = undefined;
        state.isLoading = false;
        state.error = undefined;
      }
    },
    updateError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { updateLoading, updateUser, updateError } = authSlice.actions;

export const createFirebaseUserListener = (dispatch: Dispatch) =>
  firebaseUserListener(
    (user) => {
      dispatch(
        updateUser(
          user
            ? { displayName: user?.displayName || undefined, id: user.uid }
            : undefined
        )
      );
    },
    (error) => {
      updateError(error.message);
    }
  );
