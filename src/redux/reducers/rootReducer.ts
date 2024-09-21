import { combineReducers } from "@reduxjs/toolkit";
import { movieReducer } from "./movieSlice/movieSlice";
import { authReducer } from "./authSlice/authSlice";
import {userReducer} from "./userSlice/userSlice";

const rootReducer = combineReducers({
    movies: movieReducer,
    auth: authReducer,
    user: userReducer,
    // Add more reducers here...
});

export default rootReducer;