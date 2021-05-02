import React, { useContext, useEffect, useState } from "react";
import "./MovieInfo.scss";
import { Modal } from "@shopify/polaris";
import { getDetailedMovieByImdbID } from "../utils/omdbAPI.service";
import { DetailedMovieModel } from "../models/detailedMovie.model";
import { ThemeModel } from "../models/theme.model";
import { ThemeContext } from "styled-components";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button, { ButtonType } from "./shared/Button";
import { MovieModel } from "../models/movie.model";

library.add(faStar);

type MovieInfoProps = {
    imdbID: string;
    onCloseMovieInfo: () => any;
    nominateByID: (id: string) => any;
    nominationsList: MovieModel[];
};

const NOT_AVAILABLE = "N/A";

const MovieInfo = ({
    imdbID,
    onCloseMovieInfo,
    nominateByID,
    nominationsList,
}: MovieInfoProps) => {
    const [movie, setMovieData] = useState<DetailedMovieModel>();

    const theme = useContext<ThemeModel>(ThemeContext);

    useEffect(() => {
        const getMovieData = async (id: string) => {
            const data = await getDetailedMovieByImdbID(id);
            setMovieData(data);
        };

        if (imdbID.length > 0) {
            getMovieData(imdbID);
        }
    }, [imdbID, nominationsList]);

    const inNominationsList = (id: string) => {
        return (
            nominationsList.filter((element: MovieModel) => {
                return element.imdbID === id;
            }).length === 0
        );
    };

    const available = (value: string) => {
        return value !== NOT_AVAILABLE;
    };

    return movie ? (
        <div style={{ backgroundColor: theme.container, color: theme.text }}>
            <Modal
                large
                open={imdbID.length > 0}
                onClose={() => {
                    onCloseMovieInfo();
                    setMovieData(undefined);
                }}
                title={movie.Title}
                titleHidden
            >
                <Modal.Section>
                    <div className="movie-info-area">
                        {available(movie.Poster) && (
                            <img
                                className="movie-poster"
                                style={{ border: `10px solid ${theme.accent}` }}
                                src={movie.Poster}
                                alt="Movie Poster"
                            />
                        )}
                        <div className="movie-info-text-area">
                            <div className="movie-title">{movie.Title}</div>
                            <div
                                className="movie-year"
                                style={{ color: theme.accent }}
                            >
                                {movie.Year}
                            </div>
                            {available(movie.imdbRating) && (
                                <div>
                                    {Array.apply(
                                        0,
                                        Array(
                                            Math.round(
                                                parseFloat(movie.imdbRating)
                                            )
                                        )
                                    ).map((x, i) => {
                                        return (
                                            <FontAwesomeIcon
                                                key={i}
                                                style={{ color: theme.accent }}
                                                icon={faStar}
                                            />
                                        );
                                    })}
                                    {Array.apply(
                                        0,
                                        Array(
                                            10 -
                                                Math.round(
                                                    parseFloat(movie.imdbRating)
                                                )
                                        )
                                    ).map((x, i) => {
                                        return (
                                            <FontAwesomeIcon
                                                key={10 - i}
                                                style={{
                                                    color: theme.background,
                                                }}
                                                icon={faStar}
                                            />
                                        );
                                    })}
                                </div>
                            )}
                            {available(movie.Actors) && (
                                <div className="movie-actors">
                                    {`Featuring: ${movie.Actors}`}
                                </div>
                            )}
                            {available(movie.Director) && (
                                <div className="movie-director">
                                    {`Directed by: ${movie.Director}`}
                                </div>
                            )}

                            <div>{available(movie.Plot) && movie.Plot}</div>

                            {available(movie.Rated) && (
                                <div>{`Rated ${movie.Rated}`}</div>
                            )}
                            <div className="movie-nomination-button">
                                <Button
                                    type={ButtonType.Primary}
                                    onClick={() => {
                                        onCloseMovieInfo();
                                        setMovieData(undefined);
                                        nominateByID(movie.imdbID);
                                    }}
                                    text="Nominate"
                                    disabled={!inNominationsList(movie.imdbID)}
                                />
                            </div>
                        </div>
                    </div>
                </Modal.Section>
            </Modal>
        </div>
    ) : null;
};

export default MovieInfo;
