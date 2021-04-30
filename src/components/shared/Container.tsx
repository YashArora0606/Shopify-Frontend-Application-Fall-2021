import React, { ReactFragment, useContext } from 'react';
import './Container.scss';

import { ThemeContext } from 'styled-components';
import { ThemeModel } from '../../models/theme.model';

type ContainerProps = {
    children?: ReactFragment
    background?: string
}

const Container = ({ children, background } : ContainerProps) => {

    const theme = useContext<ThemeModel>(ThemeContext);

    return (
        <div 
            className="custom-container"
            style={{ backgroundColor: background ? background : theme.container, 
                     color: background ? theme.container : theme.text}}>
            {children}
        </div>

    );
};

export default Container;
