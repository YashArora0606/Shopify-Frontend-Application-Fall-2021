import React, { useContext, useState } from "react";
import Button, { ButtonType } from "./shared/Button";
import Container from "./shared/Container";
import "./Search.scss";
import FadeIn from "react-fade-in";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { ThemeModel } from "../models/theme.model";
import { ThemeContext } from "styled-components";

type SearchProps = {
    onSubmit: (keywords: string) => Promise<void>;
};

const Search = ({ onSubmit }: SearchProps) => {
    const theme = useContext<ThemeModel>(ThemeContext);
    const [keywords, setKeywords] = useState<string>("");

    var submitButtonProps = {
        onClick: () => {
            onSubmit(keywords);
        },
        text: "Go",
        type: ButtonType.Primary,
        disabled: false,
    };

    var resetButtonProps = {
        onClick: () => {
            setKeywords("");
        },
        type: ButtonType.Blank,
        icon: "times",
        disabled: false,
    };

    const submitOnEnter = (event: { key: string }) => {
        if (event.key === "Enter") {
            onSubmit(keywords);
        }
    };

    const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newKeywords = e.target.value;
        setKeywords(newKeywords);
    };

    return (
        <Container>
            <FontAwesomeIcon
                onClick={() => {
                    onSubmit(keywords);
                }}
                className="search-icon"
                icon={faSearch}
                size="2x"
                color={theme.background}
            />
            <input
                className="search-bar"
                style={{
                    background: theme.container,
                    color: theme.text,
                }}
                value={keywords}
                placeholder={"Search for a movie!"}
                onChange={(e) => {
                    handleKeywordChange(e);
                }}
                onKeyDown={submitOnEnter}
            />
            {keywords.length > 0 && (
                <FadeIn>
                    <div className="button-area">
                        <Button {...resetButtonProps} />
                        <Button {...submitButtonProps} />
                    </div>
                </FadeIn>
            )}
        </Container>
    );
};

export default Search;
