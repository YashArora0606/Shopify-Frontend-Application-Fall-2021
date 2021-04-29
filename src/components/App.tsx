import React, { Fragment, useEffect, useState } from 'react';
import GlobalStyles from '../styling/globalStyles';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme, ThemeType } from '../styling/themes';

import { getMoviesByKeywords } from '../services/omdb.service';
import './App.scss';
import Search from './Search';
import Results from './Results';
import Nominations from './Nominations';
import { MovieModel } from '../models/movie.model';

const App = () => {

  const [enabledTheme, setEnabledTheme] = useState<ThemeType>(lightTheme);
  const [moviesSearchResults, setMoviesSearchResults] = useState<MovieModel[]>([]);
  const [moviesNominationsList, setMoviesNominationsList] = useState<MovieModel[]>([]);
  const [lastKeywords, setLastKeywords] = useState<string>("");

  enum Theme {
    Light,
    Dark,
    Rainbow,
    Shopify
  }

  const nominateMovie = (movie: MovieModel) => {
    // Ensure movie cannot be nominated if already nominated
    // This is to prevent users from bypassing the disabled button
    if (moviesNominationsList.filter((element: MovieModel) => { return element.imdbID === movie.imdbID; }).length === 0) {
      setMoviesNominationsList(moviesNominationsList => [...moviesNominationsList, movie])
    }
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
    const omdbReponse = await getMoviesByKeywords(keywords);
    console.log(omdbReponse);
    setMoviesSearchResults(omdbReponse);
    // applyTheme(Theme.Dark);
  }

  return (
    <ThemeProvider theme={enabledTheme}>
      <GlobalStyles />
      <Fragment>
        <div className="App">
          <div className="headBar" style={{color: enabledTheme.secondary}}>
            <header className="header">
                Welcome to the <span style={{ color: enabledTheme.primary }}><b>Shoppies!</b></span>
            </header>
            <div className="subtitle">Nominate your <b>5 favourite movies</b> for this year's award show! </div>
          </div>
          <div className="content">
            <Search onSubmit={makeMovieSearchQuery}/>
            {/* {moviesNominationsList.length === 5 && <div>Fulll</div>} */}

            <div className="twoColumnWrapper">
                <Results 
                  searchResults={moviesSearchResults} 
                  currentQuery={lastKeywords}
                  onNomination={nominateMovie}
                />
                <Nominations nominationsList={moviesNominationsList}/>
            </div>

          </div>
        </div>
      </Fragment>
    </ThemeProvider>

  );
}

export default App;
