import React, { useEffect, useState } from 'react';
import './Label.scss';
import Button, { ButtonProps, ButtonType } from './Button';

type LabelProps = {
    data: any;
    click: () => any;
    icon: string;
    buttonType: ButtonType;
    disableButton: boolean;
}

const Label = ({ data, icon, buttonType, click, disableButton }  : LabelProps) => {

    const [buttonProps, setButtonProps] = useState<ButtonProps>({        
        click: click,
        type: buttonType,
        icon: icon,
        disabled: false
    })

    useEffect(() => {
        setButtonProps(props => ({
            ...props,
            disabled: disableButton
        }));
    }, [disableButton]);

    return (
        <div className="label">
            <Button { ...buttonProps } />
            <div className="cardText">{data.Title}</div>
        </div>

    );
};

export default Label;
