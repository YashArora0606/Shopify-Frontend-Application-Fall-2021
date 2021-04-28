import React, { ReactFragment, useContext } from 'react';
import './Container.scss';

import { ThemeContext } from 'styled-components';
import { ThemeType } from '../styling/themes';

type ContainerProps = {
    children?: ReactFragment
}

const Container = ({ children } : ContainerProps) => {

    const theme = useContext<ThemeType>(ThemeContext);

    return (
        <div 
            className="container"
            style={{ backgroundColor: theme.containerColor }}>
            {children}
        </div>

    );
};

export default Container;
