import React, { useContext, useEffect, useState } from 'react';
import './Label.scss';
import Button, { ButtonProps, ButtonType } from './Button';
import { MovieModel } from '../models/movie.model';
import { ThemeModel } from '../models/theme.model';
import { ThemeContext } from 'styled-components';

type LabelProps = {
    data: MovieModel;
    click: () => any;
    icon: string;
    buttonType: ButtonType;
    disableButton: boolean;
}

const Label = ({ data, icon, buttonType, click, disableButton }  : LabelProps) => {

    const theme = useContext<ThemeModel>(ThemeContext);

    const [buttonProps, setButtonProps] = useState<ButtonProps>({        
        click: click,
        type: buttonType,
        icon: icon,
        disabled: false
    })

    useEffect(() => {
        setButtonProps(props => ({
            ...props,
            disabled: disableButton
        }));
    }, [disableButton]);

    return (
        <div className="label">
            <Button { ...buttonProps } />
            <span>
                <div className="labelTitle">
                    {data.Title}
                </div>
                <div className="labelData" style={ {color: theme.accent} }>
                    {`${data.Year}`}
                </div>
            </span>

        </div>

    );
};

export default Label;
