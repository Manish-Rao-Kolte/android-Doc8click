import {API_BASE_URL, API_DEV_BASE_URL, ENV} from '@env';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {doctor} from '../../../types/schemas/doctor/doctor';

const initialState = {
  doctors: [] as doctor[],
  specialty: 'General',
  isLoading: false,
  isError: '',
};

export const getDoctors = createAsyncThunk(
  'doctor/getDoctors',
  async (payload: {specialty: string}, {rejectWithValue}) => {
    try {
      let response;
      if (ENV === 'production') {
        response = await axios.get(`${API_BASE_URL}/doctor`, {params: payload});
      } else {
        response = await axios.get(`${API_DEV_BASE_URL}/doctor`, {
          params: payload,
        });
      }
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.data) {
        return rejectWithValue(error.response.data.msg);
      } else {
        return rejectWithValue('An unexpected error occurred');
      }
    }
  },
);

const doctorSlice = createSlice({
  name: 'doctor',
  initialState,
  reducers: {
    setSpecialty: (state, action) => {
      state.specialty = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getDoctors.pending, state => {
      state.isLoading = true;
      state.isError = '';
    });
    builder.addCase(getDoctors.fulfilled, (state, action) => {
      state.doctors = action.payload;
      state.isLoading = false;
      state.isError = '';
    });
    builder.addCase(getDoctors.rejected, (state, action) => {
      state.isError = action.payload as string;
      state.isLoading = false;
    });
  },
});

export const doctorReducer = doctorSlice.reducer;
export const {setSpecialty} = doctorSlice.actions;
export const doctorSelector = (state: any) => state.doctor;
