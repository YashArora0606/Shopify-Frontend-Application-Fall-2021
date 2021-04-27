import axios from 'axios'

// See http://www.omdbapi.com/ for API documentation
const OMDB_URL = "http://www.omdbapi.com/";
const OMDB_API_KEY = process.env.REACT_APP_OMDB_API_KEY;

export const getMoviesByKeywords = async (keywords: string) => {

    keywords = keywords.trim().replace(/\s+/g, '+');

    return axios.get(OMDB_URL, {
        params: {
            apikey: OMDB_API_KEY,
            s: keywords,
            type: "movie"
        }
   })
   .then((response) => {
        return response;
   })
   .catch((error) => {
        return error;
   });
   
};