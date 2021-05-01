import React, { Fragment, useEffect, useState } from "react";
import GlobalStyles from "../globalStyles";
import { ThemeProvider } from "styled-components";
import { availableThemes } from "../themes";
import { getMoviesByKeywords } from "../services/omdb.service";
import "./App.scss";
import Search from "./Search";
import Results from "./Results";
import Nominations from "./Nominations";
import { MovieModel } from "../models/movie.model";
import Banner from "./Banner";
import { ThemeModel } from "../models/theme.model";
import ThemeSelector from "./ThemeSelector";

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

    const removeNomination = (movie: MovieModel) => {
        setMoviesNominationsList((list) => {
            return list.filter((element) => {
                return element.imdbID !== movie.imdbID;
            });
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
                return [...list, movie];
            }
            return list;
        });
    };

    const makeMovieSearchQuery = async (keywords: string) => {
        const omdbReponse = await getMoviesByKeywords(keywords);
        // console.log(omdbReponse);
        setMoviesSearchResults(omdbReponse);
        setLastKeywords(keywords);
    };

    return (
        <ThemeProvider theme={enabledTheme}>
            <GlobalStyles />
            <Fragment>
                <div className="App">
                    <div className="head-bar">
                        <ThemeSelector
                            onThemeSelection={(selectedTheme) => {
                                setEnabledTheme(selectedTheme);
                            }}
                        />
                        <header className="header">
                            Welcome to the{" "}
                            <span
                                style={{
                                    color: enabledTheme.accent,
                                }}
                            >
                                <b>Shoppies!</b>
                            </span>
                        </header>
                        <div className="subtitle">
                            Nominate your <b>5 favourite movies</b> for this
                            year's award show!{" "}
                        </div>
                    </div>
                    <div className="content">
                        <Search onSubmit={makeMovieSearchQuery} />
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
