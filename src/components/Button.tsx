import React, { useContext } from 'react';
import './Button.css';

import { ThemeContext } from 'styled-components';

interface ButtonProps {
    text?: string;
    backgroundColor?: string;
    textColor?: string;
    click: () => void;
}

const Button = ({ text, click } : ButtonProps) => {

    const theme = useContext(ThemeContext);

    return (
        <div>
            <button
                className="button"
                onClick={click}
                style={{ 
                    backgroundColor: theme.backgroundColor,
                    color: theme.textColor
                }}
            >
                {text}
            </button>
        </div>

    );
};

export default Button;
