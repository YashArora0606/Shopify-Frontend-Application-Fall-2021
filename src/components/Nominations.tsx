import React, { useEffect, useState } from 'react';
import './Nominations.scss';
import Container from './shared/Container';
import Label from './shared/Label';
import { MovieModel } from '../models/movie.model';
import { ButtonType } from './shared/Button';

type NominationsProps = {
    onRemoveNomination: (entry: MovieModel) => any;
    nominationsList: MovieModel[];
}

const Nominations = ({ nominationsList, onRemoveNomination } : NominationsProps) => {

    const [text, setText] = useState<string>("");

    useEffect(() => {
        if (nominationsList.length === 0) {
            setText("Nominate a movie to get started!")
        } else {
            setText("Your movie nominations:")
        }
    }, [nominationsList]);

    return (
        <Container>
            <p className="text">{ text }</p>
            <div className="entries">
                {nominationsList.map((entry: any) => {
                    return (
                        <Label
                            icon="times"
                            disableButton={false}
                            buttonType={ButtonType.Secondary}
                            click={() => {onRemoveNomination(entry)}}
                            key={entry.imdbID}
                            data={entry}
                        />
                    );
                })}
            </div>
        </Container>
    );
};

export default Nominations;
