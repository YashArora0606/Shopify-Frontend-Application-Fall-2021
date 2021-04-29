import React, { useContext } from 'react';
import './ResultCard.scss';
import { ThemeType } from '../styling/themes';
import { ThemeContext } from 'styled-components';
import Container from './Container';

type NominationsProps = {
    nominationsList: any
}

const Nominations = ({ nominationsList } : NominationsProps) => {

    const theme = useContext<ThemeType>(ThemeContext);

    const style = {
        color: theme.secondary
    }

    return (
        <Container>
            { nominationsList.length > 0 ? nominationsList.map((entry: any) => {
                return (
                    <div key={entry.imdbID} style={style}>{entry.Title}</div>
                    // <Nomination></Nomination>
                );
            }) : <p style={style}>Your nominations will appear here!</p> }
        </Container>
    );
};

export default Nominations;
