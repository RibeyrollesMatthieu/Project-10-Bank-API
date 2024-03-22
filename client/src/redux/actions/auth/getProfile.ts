import { isDataAnError } from '@/utils/validation';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { GetProfileResponse } from '@types_/auth';

export const getProfile = createAsyncThunk<GetProfileResponse, string>(
  'getProfile',
  async (token, thunkApi) => {
    return fetch('http://localhost:3001/api/v1/user/profile', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data: GetProfileResponse) => {
        if (isDataAnError(data)) {
          throw new Error(data?.message ?? 'An error occurred');
        }
        return data;
      })
      .catch((error) => {
        return thunkApi.rejectWithValue(error.message ?? 'An error occurred');
      });
  }
);
