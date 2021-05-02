import React, { useContext, useEffect, useState } from "react";
import "./Label.scss";
import Button, { ButtonProps, ButtonType } from "./Button";
import { MovieModel } from "../../models/movie.model";
import { ThemeModel } from "../../models/theme.model";
import { ThemeContext } from "styled-components";

type LabelProps = {
    data: MovieModel;
    onButtonClick: () => any;
    onTextClick: () => any;
    icon: string;
    buttonType: ButtonType;
    disableButton: boolean;
};

const Label = ({
    data,
    icon,
    buttonType,
    onButtonClick,
    onTextClick,
    disableButton,
}: LabelProps) => {
    const theme = useContext<ThemeModel>(ThemeContext);

    const [buttonProps, setButtonProps] = useState<ButtonProps>({
        onClick: onButtonClick,
        type: buttonType,
        icon: icon,
        disabled: false,
    });

    useEffect(() => {
        setButtonProps((props) => ({
            ...props,
            disabled: disableButton,
        }));
    }, [disableButton]);

    return (
        <div className="label">
            <Button {...buttonProps} />
            <div>
                <button
                    className="label-data"
                    onClick={() => {
                        onTextClick();
                    }}
                >
                    <div className="label-title" style={{ color: theme.text }}>
                        {data.Title}
                    </div>
                    <div
                        className="label-subtitle"
                        style={{ color: theme.accent }}
                    >
                        {`${data.Year}`}
                    </div>
                </button>
            </div>
        </div>
    );
};

export default Label;
