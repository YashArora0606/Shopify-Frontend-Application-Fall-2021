import React, { useContext } from "react";
import { ThemeContext } from "styled-components";
import { ThemeModel } from "../../models/theme.model";
import "./Banner.scss";
import Container from "./Container";

type BannerProps = {
    text: string;
};

const Banner = ({ text }: BannerProps) => {
    const theme = useContext<ThemeModel>(ThemeContext);

    return (
        <Container background={theme.accent}>
            <div className="text">{text}</div>
        </Container>
    );
};

export default Banner;
