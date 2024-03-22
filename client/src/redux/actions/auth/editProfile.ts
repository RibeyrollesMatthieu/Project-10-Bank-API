import { isDataAnError } from '@/utils/validation';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { EditProfileResponse } from '@types_/auth';

export const editProfile = createAsyncThunk<
  EditProfileResponse,
  { token: string; firstName: string; lastName: string }
>('editProfile', async ({ token, ...body }, thunkApi) => {
  return fetch('http://localhost:3001/api/v1/user/profile', {
    method: 'PUT',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((data: EditProfileResponse) => {
      if (isDataAnError(data)) {
        throw new Error(data?.message ?? 'An error occurred');
      }
      return data;
    })
    .catch((error) => {
      return thunkApi.rejectWithValue(error.message ?? 'An error occurred');
    });
});
