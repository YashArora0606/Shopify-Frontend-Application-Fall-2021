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

export type ButtonProps = {
    text?: string;
    click: () => any;
    type: ButtonType;
    additionalClassName?: string;
    icon?: string;
    disabled: boolean;
}

export enum ButtonType {
    Primary,
    Secondary,
    Blank
}

const Button = ({ text, click, type, additionalClassName, icon, disabled} : ButtonProps) => {

    const [style, setStyle] = useState({});  
    const theme = useContext<ThemeType>(ThemeContext);

    useEffect(() => {

        const styleButton = (buttonType: ButtonType) => {
            switch (buttonType) {
                case ButtonType.Primary: {
                    setStyle({ 
                        backgroundColor: theme.accent,
                        color: theme.container
                    });
                  break;
                }
                case ButtonType.Secondary: {
                    setStyle({ 
                        backgroundColor: theme.text,
                        color: theme.container
                    });
                  break;
                }
                case ButtonType.Blank: {
                    setStyle({ 
                        backgroundColor: theme.container,
                        color: theme.accent
                    });
                  break;
                }
                default: {
                    setStyle({ 
                        backgroundColor: theme.accent,
                        color: theme.container
                    });
                }
            }
        }

        const styleAsDisabled = () => {
            setStyle({
                backgroundColor: theme.background,
                color: theme.container,
                pointerEvents: "none"
            });
        }

        disabled ? styleAsDisabled() : styleButton(type);

    }, [type, disabled, theme]);

    return (
        <div>
            <button
                className={"button " + (additionalClassName ? (" " + additionalClassName) : "")}
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
