import React, { Fragment, useEffect, useState } from 'react';
import GlobalStyles from '../styling/globalStyles';
import { ThemeProvider } from 'styled-components';
import { availableThemes } from '../styling/themes';

import { getMoviesByKeywords } from '../services/omdb.service';
import './App.scss';
import Search from './Search';
import Results from './Results';
import Nominations from './Nominations';
import { MovieModel } from '../models/movie.model';
import Banner from './Banner';
import { Dropdown } from 'react-bootstrap';
import { ThemeModel } from '../models/theme.model';

const App = () => {

  const maxNominations = 5;

  const [enabledTheme, setEnabledTheme] = useState<ThemeModel>(availableThemes[0]);
  const [moviesSearchResults, setMoviesSearchResults] = useState<MovieModel[]>([]);
  const [moviesNominationsList, setMoviesNominationsList] = useState<MovieModel[]>([]);
  const [lastKeywords, setLastKeywords] = useState<string>("");
  const [showBanner, setShowBanner] = useState<boolean>(false);

  // const availableThemes: ThemeModel[] = [lightTheme, darkTheme];

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

  const makeMovieSearchQuery = async (keywords: string) => {
    setLastKeywords(keywords);
    const omdbReponse = await getMoviesByKeywords(keywords);
    console.log(omdbReponse);
    setMoviesSearchResults(omdbReponse);
  }

  return (
    <ThemeProvider theme={enabledTheme}>
      <GlobalStyles />
      <Fragment>
        <div className="App">
          <div className="headBar">
            <Dropdown>
              <Dropdown.Toggle className="themeSelector" style={{ backgroundColor: enabledTheme.accent, color: enabledTheme.container}}/>
              <Dropdown.Menu className="themeSelectorMenu" style={{ backgroundColor: enabledTheme.container}}>
                {availableThemes.map((theme) => {
                  return (
                    <Dropdown.Item key={theme.title} as="button" className="themeSelectorMenuItem" style={{ color: enabledTheme.text }}>
                      <div onClick={() => {setEnabledTheme(theme)}}>
                        {theme.title}
                      </div>                  
                    </Dropdown.Item>
                  );
                })}
              </Dropdown.Menu>
            </Dropdown>
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
