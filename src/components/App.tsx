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
import Banner from './Banner';

const App = () => {

  const maxNominations = 5;

  const [enabledTheme, setEnabledTheme] = useState<ThemeType>(lightTheme);
  const [moviesSearchResults, setMoviesSearchResults] = useState<MovieModel[]>([]);
  const [moviesNominationsList, setMoviesNominationsList] = useState<MovieModel[]>([]);
  const [lastKeywords, setLastKeywords] = useState<string>("");
  const [showBanner, setShowBanner] = useState<boolean>(false);

  enum Theme {
    Light,
    Dark,
    Rainbow,
    Shopify
  }

  useEffect(() => {
    setShowBanner(moviesNominationsList.length === maxNominations);
  }, [moviesNominationsList]);

  const removeNomination = (movie: MovieModel) => {
    setMoviesNominationsList(list => {
      return list.filter((element) => {
        return element.imdbID !== movie.imdbID
      });
    });
  };

  const nominateMovie = (movie: MovieModel) => {
    setMoviesNominationsList(list => {
      if (list.length >= maxNominations) {
        console.log("can't add since list is full")
      } else if (list.filter((entry) => { return entry.imdbID === movie.imdbID; }).length === 0) {
        if (list.length === maxNominations - 1) {
          console.log("list is now full")
        }
        return [...list, movie];
      }
      return list;
    });
  };

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
          <div className="headBar">
            <header className="header">
                Welcome to the <span style={{ color: enabledTheme.accent }}><b>Shoppies!</b></span>
            </header>
            <div className="subtitle">Nominate your <b>5 favourite movies</b> for this year's award show! </div>
          </div>
          <div className="content">
            <Search onSubmit={makeMovieSearchQuery}/>
            {showBanner && <Banner text="You've reached the maximum number of movie nominations."/>}

            <div className="twoColumnWrapper">
                <Results 
                  nominationsList={moviesNominationsList}
                  searchResults={moviesSearchResults} 
                  currentQuery={lastKeywords}
                  onNomination={nominateMovie}
                />
                <Nominations 
                  nominationsList={moviesNominationsList}
                  onRemoveNomination={removeNomination}
                />
            </div>

          </div>
        </div>
      </Fragment>
    </ThemeProvider>

  );
}

export default App;
