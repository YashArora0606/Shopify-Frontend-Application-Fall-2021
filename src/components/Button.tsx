import React, { useContext, useEffect } from 'react';
import './Button.scss';

import { ThemeContext } from 'styled-components';
import { ThemeType } from '../styling/themes';
import { useState } from 'react';

interface ButtonProps {
    text?: string;
    click: () => any;
    type: ButtonType;
    additionalClassName?: string;
}

export enum ButtonType {
    Primary,
    Secondary,
    Blank
}

const Button = ({ text, click, type, additionalClassName } : ButtonProps) => {

    const [style, setStyle] = useState({});    
    const theme = useContext<ThemeType>(ThemeContext);

    useEffect(() => {

        const styleButton = (buttonType: ButtonType) => {
            switch (buttonType) {
                case ButtonType.Primary: {
                    setStyle({ 
                        backgroundColor: theme.primary,
                        color: theme.primaryTextColor
                    });
                  break;
                }
                case ButtonType.Secondary: {
                    setStyle({ 
                        backgroundColor: theme.secondary,
                        color: theme.secondaryTextColor
                    });
                  break;
                }
                case ButtonType.Blank: {
                    setStyle({ 
                        backgroundColor: theme.containerColor,
                        color: theme.primary
                    });
                  break;
                }
                default: {
                    setStyle({ 
                        backgroundColor: theme.primary,
                        color: theme.primaryTextColor
                    });
                }
            }
        }

        styleButton(type);
    }, [type, theme]);

    
    return (
        <div>
            <button
                className={"button " + additionalClassName}
                onClick={click}
                style={style}
            >
                {text}
            </button>
        </div>

    );
};

export default Button;
