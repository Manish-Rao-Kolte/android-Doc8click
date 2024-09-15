import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { user } from "../../../types/schemas/user/user";
import { API } from "../../../services/apiCall/apiCall";
import { set } from "zod";

const initialState = {
    isLoading: false,
    isError: false,
    userData: null as user | null,
    sendingOtp: false,
    otpSent : false 
};

export type loginPayload = {
    username: string,
    password: string
}

export const login = createAsyncThunk(
    'auth/login',
    async (payload: loginPayload) => {
        try {
            const response = await API.post('auth/login', payload);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

export const sendOTP = createAsyncThunk(
    'auth/sendOTP',
    async (payload: { phone: string }) => {
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
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        }).addCase(login.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.userData = action.payload;
        }).addCase(login.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
        }).addCase(sendOTP.pending, (state) => {
            state.sendingOtp = true;
            state.isError = false;
        }).addCase(sendOTP.fulfilled, (state) => {
            state.sendingOtp = false;
            state.isError = false;
            state.otpSent = true;
        }).addCase(sendOTP.rejected, (state) => {
            state.sendingOtp = false;
            state.isError = true;
        });
    }
});

type t = {
    emilys: string,
    emilyspass: string
}


export const { setUser, removeUser } = authSlice.actions;
export const authReducer =  authSlice.reducer;
export const authSelector = (state: any) => state.auth;