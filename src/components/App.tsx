import React, { Fragment, useEffect, useState } from 'react';
import GlobalStyles from '../styling/globalStyles';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme, ThemeType } from '../styling/themes';

import { getMoviesByKeywords } from '../services/omdb.service';
import './App.scss';
import Search from './Search';

const App = () => {

  const [enabledTheme, setEnabledTheme] = useState<ThemeType>(lightTheme);
  const [moviesSearchResults, setMoviesSearchResults] = useState<any>([]);

  enum Theme {
    Light,
    Dark,
    Rainbow,
    Shopify
  }

  const applyTheme = (theme: Theme) => {

    switch (theme) {
      case Theme.Light: {
        setEnabledTheme(lightTheme);
        break;
      }
      case Theme.Dark: {
        setEnabledTheme(darkTheme);
        break;
      }
      default: {
        setEnabledTheme(lightTheme);
      }
    }
  }

  useEffect(() => {

  }, [])

  const makeMovieSearchQuery = async (keywords: string) => {
    const omdbReponse = await getMoviesByKeywords(keywords);
    setMoviesSearchResults(omdbReponse.data.Search);
    console.log(omdbReponse);
    applyTheme(Theme.Dark);
  }

  return (
    <ThemeProvider theme={enabledTheme}>
      <GlobalStyles />
      <Fragment>
        <div className="App">
          <div className="headBar">
            <header className="header" style={{color: enabledTheme.secondary}}>
                The Shoppies
            </header>
          </div>
          <div className="content">
            <Search
              onSubmit={makeMovieSearchQuery}
              defaultText="Search for a movie!"
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
