import { createSlice } from "@reduxjs/toolkit";
import { movie } from "../../../types/schemas//movie/movie";

const initialState = {
    isLoading : false,
    isError: false,
    moviesData: [] as movie[]
}

const movieSlice = createSlice({
    name: 'movie',
    initialState,
    reducers: {
        setMovies: (state, action) => {
            return action.payload;
        }
    }
});




export const { setMovies } = movieSlice.actions;
export const movieReducer =  movieSlice.reducer;
export const moviesSelector = (state: { movies: any; }) => state.movies;