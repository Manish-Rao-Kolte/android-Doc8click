import {combineReducers} from '@reduxjs/toolkit';
import {movieReducer} from './movieSlice/movieSlice';
import {authReducer} from './authSlice/authSlice';
import {userReducer} from './userSlice/userSlice';
import {doctorReducer} from './doctorSlice/doctorSlice';

const rootReducer = combineReducers({
  movies: movieReducer,
  auth: authReducer,
  user: userReducer,
  doctor: doctorReducer,
  // Add more reducers here...
});

export default rootReducer;
