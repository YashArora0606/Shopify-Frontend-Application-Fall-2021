import React, { Fragment, useEffect, useState } from 'react';
import GlobalStyles from '../styling/globalStyles';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../styling/themes';

import { getMoviesByKeywords } from '../services/omdb.service';
import './App.css';
import Search from './Search';

const App = () => {

  const [theme, setTheme] = useState('dark');
  const [moviesSearchResults, setMoviesSearchResults] = useState<any>([]);

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }

  useEffect(() => {
    
  }, [])

  const makeMovieSearchQuery = async (keywords: string) => {
    const omdbReponse = await getMoviesByKeywords(keywords);
    setMoviesSearchResults(omdbReponse.data.Search);
    console.log(omdbReponse);
    toggleTheme();
  }

  return (

    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}> 
      <GlobalStyles/>
      <Fragment>
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
      </Fragment>
    </ThemeProvider>

  );
}

export default App;
