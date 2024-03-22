import { isDataAnError } from '@/utils/validation';
import { getProfile } from '@redux/actions/auth/getProfile';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { SigninResponse } from '@types_/auth';

export const signinUser = createAsyncThunk<
  SigninResponse,
  { email: string; password: string; rememberMe: boolean }
>('signin', async (body, thunkApi) => {
  return fetch('http://localhost:3001/api/v1/user/login', {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((data: SigninResponse) => {
      if (isDataAnError(data)) {
        throw new Error(data?.message ?? 'An error has occured');
      }

      if (data.body?.token) {
        if (body.rememberMe) {
          localStorage.setItem('userToken', data.body.token);
        }

        getProfile(data.body.token);
      }

      return data;
    })
    .catch((error) => {
      return thunkApi.rejectWithValue(error.message ?? 'An error occurred');
    });
});
