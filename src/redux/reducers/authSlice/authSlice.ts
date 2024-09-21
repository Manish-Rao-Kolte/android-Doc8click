import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { user } from "../../../types/schemas/user/user";
import { updateUser } from "../userSlice/userSlice";
import axios from "axios";
import { API_BASE_URL, ENV, API_DEV_BASE_URL } from "@env";

const initialState = {
    isLoading: false,
    isError: '' as string | undefined,
    userData: null as user | null,
    sendingOtp: false,
    otpSent : false 
};

export const login = createAsyncThunk(
    'auth/login',
    async (payload: user, {rejectWithValue}) => {       
        try {           
            let response;
            if(ENV === "production") {
                response = await axios.post(`${API_BASE_URL}/auth/login`, payload, { headers: { 'Content-Type': 'application/json' } });
            } else {
                response = await axios.post(`${API_DEV_BASE_URL}/auth/login`, payload, { headers: { 'Content-Type': 'application/json' } });
            }
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response && error.response.data) {               
                return rejectWithValue(error.response.data.msg);
            } else {
                return rejectWithValue('An unexpected error occurred'); 
            }
        }
    }
);

export const signup = createAsyncThunk(
    'auth/signup',
    async (payload: user, {rejectWithValue}) => {
        try {
            let response;
            if(ENV === "production") {
                response = await axios.post(`${API_BASE_URL}/auth/signup`, payload, { headers: { 'Content-Type': 'application/json' } });
            } else {
                response = await axios.post(`${API_DEV_BASE_URL}/auth/signup`, payload, { headers: { 'Content-Type': 'application/json' } });
            }          
            return response.data;
        } catch (error) {        
            if (axios.isAxiosError(error) && error.response && error.response.data) {               
                return rejectWithValue(error.response.data.msg);
            } else {
                return rejectWithValue('An unexpected error occurred'); 
            }
        }
    }
);

export const sendOTP = createAsyncThunk(
    'auth/sendOTP',
    async (payload: { phoneNumber: string }) => {
        try {
            return true;
        } catch (error) {
            throw error;
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {       
            state.userData = action.payload;
        },
        removeUser: (state) => {            
            state.userData = null;
        },
        resetError: (state) => {
            state.isError = '';
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.isLoading = true;
            state.isError = '';
        }).addCase(login.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = '';
            state.userData = action.payload;
        }).addCase(login.rejected, (state, action) => {          
            state.isLoading = false;
            state.isError = action.payload as string;
        }).addCase(signup.pending, (state) => {
            state.isLoading = true;
            state.isError = '';
        }).addCase(signup.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = '';
            state.userData = action.payload;
        }).addCase(signup.rejected, (state, action) => {
            state.isLoading = false;            
            state.isError = action.payload as string;
        }).addCase(sendOTP.pending, (state) => {
            state.sendingOtp = true;
            state.isError = '';
        }).addCase(sendOTP.fulfilled, (state) => {
            state.sendingOtp = false;
            state.isError = '';
            state.otpSent = true;
        }).addCase(sendOTP.rejected, (state, action) => {
            state.sendingOtp = false;
            state.isError = action.payload as string;
        }).addCase(updateUser.fulfilled, (state, action) => {
            state.userData = action.payload;
        });
    }
});


export const { setUser, removeUser, resetError } = authSlice.actions;
export const authReducer =  authSlice.reducer;
export const authSelector = (state: any) => state.auth;