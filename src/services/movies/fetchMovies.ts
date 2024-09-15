const fetchMovies = async () => {
    const response = await fetch('https://freetestapi.com/api/v1/movies');
    const data = await response.json();
    return data;
}

export default fetchMovies;
