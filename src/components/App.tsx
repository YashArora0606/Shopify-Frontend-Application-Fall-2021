import React, { Fragment, useEffect, useState } from 'react';
import GlobalStyles from '../styling/globalStyles';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme, ThemeType } from '../styling/themes';

import { getMoviesByKeywords } from '../services/omdb.service';
import './App.scss';
import Search from './Search';
import Results from './Results';
import Nominations from './Nominations';

const App = () => {

  const [enabledTheme, setEnabledTheme] = useState<ThemeType>(lightTheme);
  const [moviesSearchResults, setMoviesSearchResults] = useState<any>([]);
  const [moviesNominationsList, setMoviesNominationsList] = useState<any>([]);
  const [lastKeywords, setLastKeywords] = useState<string>("");

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
    setLastKeywords(keywords);
    console.log("setting keywords to, " + keywords)
    const omdbReponse = await getMoviesByKeywords(keywords);
    console.log(omdbReponse.data.Search)
    setMoviesSearchResults(omdbReponse.data.Search);
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
            <Search onSubmit={makeMovieSearchQuery}/>

            <div className="twoColumnWrapper">
                <Results searchResults={moviesSearchResults} currentQuery={lastKeywords}/>
                <Nominations nominationsList={moviesNominationsList}/>
            </div>

          </div>
        </div>
      </Fragment>
    </ThemeProvider>

  );
}

export default App;
