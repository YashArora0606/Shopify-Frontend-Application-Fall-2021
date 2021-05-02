import React, { useEffect, useState } from "react";
import "./Nominations.scss";
import Container from "./shared/Container";
import Label from "./shared/Label";
import { MovieModel } from "../models/movie.model";
import Button, { ButtonType } from "./shared/Button";
import Banner from "./Banner";

type NominationsProps = {
    onRemoveNomination: (entry: MovieModel) => any;
    onClearNominations: () => any;
    onSaveNominations: (nominations: MovieModel[]) => any;
    displayMovieInfo: (imdbID: string) => any;
    nominationsList: MovieModel[];
};

const Nominations = ({
    nominationsList,
    onRemoveNomination,
    onClearNominations,
    onSaveNominations,
    displayMovieInfo,
}: NominationsProps) => {
    const [text, setText] = useState<string>("");
    const [
        showSavedSuccessfullyBanner,
        setShowSavedSuccessfullyBanner,
    ] = useState<boolean>(false);

    useEffect(() => {
        setShowSavedSuccessfullyBanner(false);
        if (nominationsList.length === 0) {
            setText("Nominate a movie to get started!");
        } else {
            setText("Your movie nominations:");
        }
    }, [nominationsList]);

    return (
        <Container>
            <p className="text">{text}</p>
            <div className="entries">
                {nominationsList.map((entry: any) => {
                    return (
                        <Label
                            icon="minus"
                            disableButton={false}
                            buttonType={ButtonType.Secondary}
                            onButtonClick={() => {
                                onRemoveNomination(entry);
                            }}
                            onTextClick={() => {
                                displayMovieInfo(entry.imdbID);
                            }}
                            key={entry.imdbID}
                            data={entry}
                        />
                    );
                })}
            </div>
            {nominationsList.length > 0 && (
                <div className="nominations-list-operation-buttons">
                    <Button
                        type={ButtonType.Blank}
                        icon="times"
                        onClick={onClearNominations}
                        disabled={false}
                    />
                    <Button
                        type={ButtonType.Primary}
                        text="Save"
                        onClick={() => {
                            onSaveNominations(nominationsList);
                            setShowSavedSuccessfullyBanner(true);
                        }}
                        disabled={false}
                    />
                </div>
            )}
            {showSavedSuccessfullyBanner && (
                <Banner text="Your nominations have been saved successfully!" />
            )}
        </Container>
    );
};

export default Nominations;
