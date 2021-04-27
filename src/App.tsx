import React, { useEffect, useState } from 'react';
import { getMoviesByKeywords } from './services/omdb.service';
import './App.css';

const App = () => {

  const [moviesList, setMoviesList] = useState<any>([]);

  useEffect(() => {
    
  }, [])

  const getAvatar = async () => {
    const stuff = await getMoviesByKeywords("avatar");
    setMoviesList(stuff.data.Search);
  }

  return (
    <div className="App">
      <div className="content">
        <button onClick={getAvatar}>
          Get Avatar Movies
        </button>
        {moviesList.map((entry: any) => {
          return <p>{entry.Title}</p>
        })}
      </div>
    </div>
  );
}

export default App;
