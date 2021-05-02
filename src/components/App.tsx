import React, { Fragment, useEffect, useState } from "react";
import GlobalStyles from "../globalStyles";
import { ThemeProvider } from "styled-components";
import { availableThemes } from "../resources/themes";
import {
    getDetailedMovieByImdbID,
    getMoviesByKeywords,
} from "../utils/omdbAPI.service";
import "./App.scss";
import Search from "./Search";
import Results from "./Results";
import Nominations from "./Nominations";
import { MovieModel } from "../models/movie.model";
import Banner from "./shared/Banner";
import { ThemeModel } from "../models/theme.model";
import CustomDropdown from "./CustomDropdown";
import MovieInfo from "./MovieInfo";

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
    const [bannerMessage, setBannerMessage] = useState<string>("");

    const [movieInfoID, setMovieInfoID] = useState<string>("");

    useEffect(() => {
        moviesNominationsList.length === NOMINATION_LIMIT
            ? setBannerMessage(
                  `You've reached the limit of ${NOMINATION_LIMIT} movie nominations.`
              )
            : setBannerMessage("");
    }, [moviesNominationsList]);

    // Check localstorage in useEffect without dependancy array to avoid infinite loop
    useEffect(() => {
        const checkLocalStorage = () => {
            const storedNominations = JSON.parse(
                window.localStorage.getItem("nominations")!
            );
            if (storedNominations) {
                setMoviesNominationsList(storedNominations);
            }
            const storedTheme = JSON.parse(
                window.localStorage.getItem("theme")!
            );
            if (storedTheme) {
                applyTheme(storedTheme);
            }
        };
        try {
            checkLocalStorage();
        } catch (e) {
            localStorage.clear();
        }
    }, []);

    const saveNominationsListToLocalStorage = (
        nominationsList: MovieModel[]
    ) => {
        window.localStorage.setItem(
            "nominations",
            JSON.stringify(nominationsList)
        );
    };

    const removeNomination = (movie: MovieModel) => {
        setMoviesNominationsList((list) => {
            return list.filter((element) => {
                return element.imdbID !== movie.imdbID;
            });
        });
    };

    const clearNominations = () => {
        setMoviesNominationsList([]);
    };

    const nominateMovie = (movie: MovieModel) => {
        setMoviesNominationsList((list) => {
            if (list.length >= NOMINATION_LIMIT) {
                setBannerMessage(
                    "Your list is full! Remove some nominations before adding more."
                );
            } else if (list.length < NOMINATION_LIMIT) {
                return [...list, movie];
            }
            return list;
        });
    };

    const nominateMovieByID = async (id: string) => {
        const detailedMovie = await getDetailedMovieByImdbID(id);
        nominateMovie(detailedMovie);
    };

    const searchForMovie = async (keywords: string) => {
        const omdbReponse = await getMoviesByKeywords(keywords);
        setMoviesSearchResults(omdbReponse);
        setLastKeywords(keywords);
    };

    const applyTheme = (themeToApply: ThemeModel) => {
        window.localStorage.setItem("theme", JSON.stringify(themeToApply));
        setEnabledTheme(themeToApply);
    };

    const showMovieInfo = (id: string) => {
        setMovieInfoID(id);
    };

    const closeMovieInfo = () => {
        setMovieInfoID("");
    };

    return (
        <ThemeProvider theme={enabledTheme}>
            <GlobalStyles />
            <Fragment>
                <div>
                    <MovieInfo
                        imdbID={movieInfoID}
                        onCloseMovieInfo={closeMovieInfo}
                        nominateByID={nominateMovieByID}
                        nominationsList={moviesNominationsList}
                    />
                </div>
                <div className="App">
                    <div className="head-bar">
                        <div>
                            <CustomDropdown
                                items={availableThemes.map((theme) => {
                                    return {
                                        content: theme.title,
                                        onAction: () => {
                                            applyTheme(theme);
                                        },
                                    };
                                })}
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
                        {bannerMessage.length > 0 && (
                            <Banner text={bannerMessage} />
                        )}
                        <div className="two-column-wrapper">
                            <Results
                                displayMovieInfo={showMovieInfo}
                                nominationsList={moviesNominationsList}
                                searchResults={moviesSearchResults}
                                currentQuery={lastKeywords}
                                onNomination={nominateMovie}
                            />
                            <Nominations
                                displayMovieInfo={showMovieInfo}
                                nominationsList={moviesNominationsList}
                                onRemoveNomination={removeNomination}
                                onClearNominations={clearNominations}
                                onSaveNominations={
                                    saveNominationsListToLocalStorage
                                }
                            />
                        </div>
                    </div>
                </div>
            </Fragment>
        </ThemeProvider>
    );
};

export default App;
