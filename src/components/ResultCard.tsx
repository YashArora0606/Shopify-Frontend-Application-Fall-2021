import React, { useContext } from 'react';
import './ResultCard.scss';
import { ThemeType } from '../styling/themes';
import { ThemeContext } from 'styled-components';
import Button, { ButtonType } from './Button';

type ResultCardProps = {
    data: any;
    click: () => any;
}

const ResultCard = ({ data, click} : ResultCardProps) => {

    const theme = useContext<ThemeType>(ThemeContext);

    const style = {
        color: theme.secondary,
        // outline: "2px dashed red"
    }

    var nominateButtonProps = {
        click: click,
        type: ButtonType.Primary,
        icon: "plus"
      }

    return (
        <div className="resultCard" style={style}>
            <Button { ...nominateButtonProps } />
            <div className="cardText">{data.Title}</div>
            

        </div>

    );
};

export default ResultCard;
