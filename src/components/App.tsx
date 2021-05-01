import React, { Fragment, useEffect, useState } from "react";
import GlobalStyles from "../globalStyles";
import { ThemeProvider } from "styled-components";
import { availableThemes } from "../resources/themes";
import { getMoviesByKeywords } from "../services/omdb.service";
import "./App.scss";
import Search from "./Search";
import Results from "./Results";
import Nominations from "./Nominations";
import { MovieModel } from "../models/movie.model";
import Banner from "./Banner";
import { ThemeModel } from "../models/theme.model";
import CustomDropdown from "./CustomDropdown";

const App = () => {
    const NOMINATION_LIMIT = 5;

    const [enabledTheme, setEnabledTheme] = useState<ThemeModel>(
        availableThemes[0]
    );
    const [moviesSearchResults, setMoviesSearchResults] = useState<
        MovieModel[]
    >([]);
    const [moviesNominationsList, setMoviesNominationsList] = useState<
        MovieModel[]
    >([]);
    const [lastKeywords, setLastKeywords] = useState<string>("");
    const [showBanner, setShowBanner] = useState<boolean>(false);

    useEffect(() => {
        setShowBanner(moviesNominationsList.length === NOMINATION_LIMIT);
    }, [moviesNominationsList]);

    // Check localstorage in useEffect without dependancy array to avoid infinite loop
    useEffect(() => {
      const checkForLocallyStoredNominations = () => {
          const storedNominations = getNominationsListFromLocalStorage();
          if (storedNominations) {
              setMoviesNominationsList(storedNominations);
          }
      }
      checkForLocallyStoredNominations();
    }, []);

    const saveNominationsListToLocalStorage = (nominationsList: MovieModel[]) => {
        window.localStorage.setItem('nominations', JSON.stringify(nominationsList));
    };

    const getNominationsListFromLocalStorage = () => {
        return JSON.parse(window.localStorage.getItem('nominations')!);
    };

    const removeNomination = (movie: MovieModel) => {
        setMoviesNominationsList((list) => {
            const filtered = list.filter((element) => {
                return element.imdbID !== movie.imdbID;
            });
            saveNominationsListToLocalStorage(filtered)
            return filtered
        });
    };

    const nominateMovie = (movie: MovieModel) => {
        setMoviesNominationsList((list) => {
            if (list.length >= NOMINATION_LIMIT) {
                // console.log("can't add since list is full");
            } else if (
                list.filter((entry) => {
                    return entry.imdbID === movie.imdbID;
                }).length === 0
            ) {
                const appended = [...list, movie];
                saveNominationsListToLocalStorage(appended)
                return appended;
            }
            return list;
        });
    };

    const searchForMovie = async (keywords: string) => {
        const omdbReponse = await getMoviesByKeywords(keywords);
        // console.log(omdbReponse);
        setMoviesSearchResults(omdbReponse);
        setLastKeywords(keywords);
    };

    const selectThemeByTitle = (selectedThemeTitle: string) => {
      const themeToEnable = availableThemes.find((theme) => {
          return theme.title === selectedThemeTitle
      })!;
      setEnabledTheme(themeToEnable);
    }

    return (
        <ThemeProvider theme={enabledTheme}>
            <GlobalStyles />
            <Fragment>
                <div className="App">
                    <div className="head-bar">
                      <div>
                          <CustomDropdown
                              items={availableThemes.map((theme) => theme.title)}
                              onItemSelection={selectThemeByTitle}
                          />
                      </div>
                        
                        <header className="header">
                            {"Welcome to the  "}
                            <span
                                style={{
                                    color: enabledTheme.accent,
                                }}
                            >
                                <b>{"Shoppies!"}</b>
                            </span>
                        </header>
                        <div className="subtitle">
                            {"Nominate your "}
                            <b>{"5 favourite movies"}</b>
                            {" for this year's award show!"}
                        </div>
                    </div>
                    <div className="content">
                        <Search onSubmit={searchForMovie} />
                        {showBanner && (
                            <Banner text="You've reached the maximum number of movie nominations." />
                        )}
                        <div className="two-column-wrapper">
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
};

export default App;
