import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { ThemeType } from '../styling/themes';
import "./Banner.scss"
import Container from './Container';

type BannerProps = {
    text: string;
}

const Banner = ({ text } : BannerProps) => {

    const theme = useContext<ThemeType>(ThemeContext);

    return (
        <Container background={theme.accent}>
            <div className="text">{text}</div>
        </Container>
    );
}

export default Banner;
