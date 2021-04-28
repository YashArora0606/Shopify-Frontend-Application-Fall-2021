import React, { useContext } from 'react';
import './Button.css';

import { ThemeContext } from 'styled-components';
import { ThemeType } from '../styling/themes';

interface ButtonProps {
    text?: string;
    click: () => void;
    type: ButtonType;
    additionalClassName?: string;
}

export enum ButtonType {
    Primary,
    Secondary
}

const Button = ({ text, click, type, additionalClassName } : ButtonProps) => {

    const theme = useContext<ThemeType>(ThemeContext);
    
    return (
        <div>
            <button
                className={"button " + additionalClassName}
                onClick={click}
                style={{ 
                    backgroundColor: type === ButtonType.Primary ? theme.primary : theme.secondary,
                    color: type === ButtonType.Primary ? theme.primaryTextColor : theme.secondaryTextColor
                }}
            >
            <b>
                {text}
            </b>
            </button>
        </div>

    );
};

export default Button;
