/* eslint-disable @typescript-eslint/no-explicit-any */
import { editProfile } from '@redux/actions/auth/editProfile';
import { getProfile } from '@redux/actions/auth/getProfile';
import { signinUser } from '@redux/actions/auth/signin';
import { createSlice } from '@reduxjs/toolkit';
import { User } from '@types_/user';

interface SliceState {
  loading: boolean;
  userInfo: User | null | undefined;
  userToken: string | null | undefined;
  error: string | null | undefined;
  success: boolean;
}

const userToken = localStorage.getItem('userToken') ? localStorage.getItem('userToken') : undefined;

const initialState: SliceState = {
  loading: false,
  userInfo: undefined,
  userToken: userToken,
  error: undefined,
  success: !!userToken,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signout: (state) => {
      localStorage.removeItem('userToken');
      state.loading = false;
      state.userInfo = undefined;
      state.userToken = undefined;
      state.error = undefined;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    // signin
    builder.addCase(signinUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(signinUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.userToken = payload.body?.token;
    });
    builder.addCase(signinUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.success = false;
      state.error = payload as string;
    });
    // getProfile
    builder.addCase(getProfile.fulfilled, (state, { payload }) => {
      state.userInfo = payload.body;
    });
    builder.addCase(getProfile.rejected, (state, { payload }) => {
      state.error = payload as string;
      localStorage.removeItem('userToken');
      state.loading = false;
      state.userInfo = undefined;
      state.userToken = undefined;
      state.success = false;
    });
    // edit profile
    builder.addCase(editProfile.fulfilled, (state, { payload }) => {
      if (state.userInfo && payload.body) {
        state.userInfo.firstName = payload.body.firstName;
        state.userInfo.lastName = payload.body.lastName;
      }
    });
  },
});

export const { signout } = slice.actions;
export default slice.reducer;
