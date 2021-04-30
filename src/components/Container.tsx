import React, { ReactFragment, useContext } from 'react';
import './Container.scss';

import { ThemeContext } from 'styled-components';
import { ThemeType } from '../styling/themes';

type ContainerProps = {
    children?: ReactFragment
    background?: string
}

const Container = ({ children, background } : ContainerProps) => {

    const theme = useContext<ThemeType>(ThemeContext);

    return (
        <div 
            className="container"
            style={{ backgroundColor: background ? background : theme.container, 
                     color: background ? theme.container : theme.text}}>
            {children}
        </div>

    );
};

export default Container;
