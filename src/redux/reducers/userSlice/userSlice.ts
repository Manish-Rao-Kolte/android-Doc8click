import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {user} from '../../../types/schemas/user/user';
import axios from 'axios';
import {API_BASE_URL, ENV, API_DEV_BASE_URL} from '@env';

const initialState = {
  loading: false,
  error: '' as string | undefined,
};

type updateUserPayload = {
  user?: user;
  data: FormData;
};

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (payload: updateUserPayload, {rejectWithValue}) => {
    try {
      const token = `Bearer ${payload.user?.token}`;
      axios.defaults.headers.common['Authorization'] = token;
      let response = await axios.put(
        `${API_BASE_URL}/user/update`,
        payload.data,
        {headers: {'Content-Type': 'multipart/form-data'}},
      );
      // if (ENV === 'production') {
      //   response = await axios.put(
      //     `${API_BASE_URL}/user/update`,
      //     payload.data,
      //     {headers: {'Content-Type': 'multipart/form-data'}},
      //   );
      // } else {
      //   response = await axios.put(
      //     `${API_DEV_BASE_URL}/user/update`,
      //     payload.data,
      //     {headers: {'Content-Type': 'multipart/form-data'}},
      //   );
      // }
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response && error.response.data) {
        return rejectWithValue(error.response.data.msg);
      } else {
        return rejectWithValue('An unexpected error occurred');
      }
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(updateUser.pending, state => {
        state.loading = true;
        state.error = '';
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const userReducer = userSlice.reducer;
export const userSelector = (state: any) => state.user;
