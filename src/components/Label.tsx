import React, { useContext, useEffect, useState } from 'react';
import './Label.scss';
import { ThemeType } from '../styling/themes';
import { ThemeContext } from 'styled-components';
import Button, { ButtonProps, ButtonType } from './Button';

type LabelProps = {
    data: any;
    click: () => any;
    icon: string;
    buttonType: ButtonType;
    disableButton: boolean;
}

const Label = ({ data, icon, buttonType, click, disableButton }  : LabelProps) => {

    const theme = useContext<ThemeType>(ThemeContext);

    const [buttonProps, setButtonProps] = useState<ButtonProps>({        
        click: click,
        type: buttonType,
        icon: icon
        
    })

    const style = {
        color: theme.secondary,
        // outline: "2px dashed red"
    }

    useEffect(() => {
        if (disableButton) {
            console.log("label knows " + data.Title + " button should be disabled")
        }
    }, [disableButton]);

    return (
        <div className="label" style={style}>
            <Button { ...buttonProps } />
            <div className="cardText">{data.Title}</div>
        </div>

    );
};

export default Label;
