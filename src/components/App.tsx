import React, { useEffect, useState } from 'react';
import { getMoviesByKeywords } from '../services/omdb.service';
import './App.css';
import Search from './Search';

const App = () => {

  const [moviesSearchResults, setMoviesSearchResults] = useState<any>([]);

  useEffect(() => {
    
  }, [])

  const makeMovieSearchQuery = async (keywords: string) => {
    const omdbReponse = await getMoviesByKeywords(keywords);
    setMoviesSearchResults(omdbReponse.data.Search);
    console.log(moviesSearchResults);
  }

  return (
    <div className="App">
      <div className="content">

        <Search
          onSubmit={makeMovieSearchQuery}
          defaultText="Avatar"
        ></Search>

        {moviesSearchResults && moviesSearchResults.map((entry: any) => {
          return <span key={entry.imdbID}>{entry.Title}</span>
        })}
      </div>
    </div>
  );
}

export default App;
