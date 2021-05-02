import React, { Fragment, useEffect, useState } from "react";
import GlobalStyles from "../globalStyles";
import { ThemeProvider } from "styled-components";
import { availableThemes } from "../resources/themes";
import { getMovieByImdbID, getMoviesByKeywords } from "../utils/omdbAPI.service";
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
        const checkLocalStorage = () => {
            const storedNominations = JSON.parse(
                window.localStorage.getItem("nominations")!
            );
            if (storedNominations) {
                setMoviesNominationsList(storedNominations);
            }
            const storedTheme = window.localStorage.getItem("theme");
            if (storedTheme) {
                setThemeByTitle(storedTheme);
            }
        };
        checkLocalStorage();
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
        saveNominationsListToLocalStorage([]);
    };

    const nominateMovie = (movie: MovieModel) => {
        setMoviesNominationsList((list) => {
            if (list.length < NOMINATION_LIMIT) {
                return [...list, movie];
            }
            return list;
        });
    };

    const searchForMovie = async (keywords: string) => {
        const omdbReponse = await getMoviesByKeywords(keywords);
        setMoviesSearchResults(omdbReponse);
        setLastKeywords(keywords);
    };

    const setThemeByTitle = (selectedThemeTitle: string) => {
        const themeToEnable = availableThemes.find((theme) => {
            return theme.title === selectedThemeTitle;
        })!;
        window.localStorage.setItem("theme", selectedThemeTitle);
        setEnabledTheme(themeToEnable);
    };

    const showMovieInfo = async (id: string) => {
        const detailedMovieInfo = await getMovieByImdbID(id);
        console.log(detailedMovieInfo)
    }  

    return (
        <ThemeProvider theme={enabledTheme}>
            <GlobalStyles />
            <Fragment>
                <div className="App">
                    <div className="head-bar">
                        <div>
                            <CustomDropdown
                                items={availableThemes.map(
                                    (theme) => theme.title
                                )}
                                onItemSelection={setThemeByTitle}
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
