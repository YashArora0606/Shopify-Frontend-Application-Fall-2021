import axios from "axios";
import { MovieModel } from "../models/movie.model";

// See http://www.omdbapi.com/ for API documentation
const OMDB_URL = "http://www.omdbapi.com/";
const OMDB_API_KEY = process.env.REACT_APP_OMDB_API_KEY;

export const getMoviesByKeywords = async (keywords: string) => {
    keywords = keywords.trim().replace(/\s+/g, "+");

    return axios
        .get(OMDB_URL, {
            params: {
                apikey: OMDB_API_KEY,
                s: keywords,
                type: "movie",
            },
        })
        .then((response) => {
            const movies: [MovieModel] = response.data.Search;

            // Return empty list instead of undefined
            if (!movies) {
                return [];
            }

            // Filter for unique movies, since OMDB API has
            // non-unique elements that can cause keyerrors.
            const uniqueMovies = movies.filter((movie, index, self) => {
                return (
                    self.findIndex(
                        (element) => element.imdbID === movie.imdbID
                    ) === index
                );
            });

            return uniqueMovies;
        })
        .catch((error) => {
            return error;
        });
};
