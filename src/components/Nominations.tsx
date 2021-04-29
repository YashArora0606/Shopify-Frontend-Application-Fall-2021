import React, { useContext, useEffect, useState } from 'react';
import './Nominations.scss';
import { ThemeType } from '../styling/themes';
import { ThemeContext } from 'styled-components';
import Container from './Container';
import Label from './Label';
import { MovieModel } from '../models/movie.model';
import { ButtonType } from './Button';

type NominationsProps = {
    onRemoveNomination: (entry: MovieModel) => any;
    nominationsList: MovieModel[];
}

const Nominations = ({ nominationsList, onRemoveNomination } : NominationsProps) => {

    const theme = useContext<ThemeType>(ThemeContext);

    const style = {
        color: theme.secondary
    }

    useEffect(() => {
    }, [nominationsList]);

    return (
        <Container>
            <p className="text" style={style}>{ "Your nominations will appear here!" }</p>
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
