import { combineReducers } from "@reduxjs/toolkit";
import { movieReducer } from "./movieSlice/movieSlice";
import { authReducer } from "./authSlice/authSlice";

const rootReducer = combineReducers({
    movies: movieReducer,
    auth: authReducer,
    // Add more reducers here...
});

export default rootReducer;