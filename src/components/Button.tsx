import React, { useContext, useEffect } from 'react';
import './Button.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ThemeContext } from 'styled-components';
import { ThemeType } from '../styling/themes';
import { useState } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTimes, faPlus } from '@fortawesome/free-solid-svg-icons'

library.add(faTimes, faPlus)

export interface ButtonProps {
    text?: string;
    click: () => any;
    type: ButtonType;
    additionalClassName?: string;
    icon?: string;
}

export enum ButtonType {
    Primary,
    Secondary,
    Blank
}

const Button = ({ text, click, type, additionalClassName, icon} : ButtonProps) => {

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

        // const styleAsDisabled = () => {
        //     setStyle({
        //         backgroundColor: theme.backgroundColor,
        //         color: theme.primaryTextColor
        //     });
        // }

        // setDisabled(buttonDisabled);
        // console.log(buttonDisabled)

        styleButton(type);
    }, [type, theme]);

    return (
        <div>
            <button
                className={"button " + additionalClassName}
                onClick={click}
                style={style}
            >
                {icon && <FontAwesomeIcon icon={icon as IconProp} />}
                {text}
            </button>
        </div>

    );
};

export default Button;
