import React, { useContext } from 'react';
import './ResultCard.scss';
import { ThemeType } from '../styling/themes';
import { ThemeContext } from 'styled-components';

type ResultProps = {
    data: any
}

const ResultCard = ({ data } : ResultProps) => {

    const theme = useContext<ThemeType>(ThemeContext);

    const style = {
        color: theme.secondary
    }

    return (
        <div className="resultCard" style={style}>
            <span>{data.Title}</span>
        </div>

    );
};

export default ResultCard;
