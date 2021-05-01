import React, { useContext } from "react";
import { Dropdown } from "react-bootstrap";
import "./CustomDropdown.scss";
import { ThemeModel } from "../models/theme.model";
import { ThemeContext } from "styled-components";

type CustomDropdownProps = {
    title?: string;
    items: string[];
    onItemSelection: (item: string) => void;
};

const CustomDropdown = ({
    title,
    items,
    onItemSelection,
}: CustomDropdownProps) => {
    const theme = useContext<ThemeModel>(ThemeContext);

    return (
        <Dropdown>
            <Dropdown.Toggle
                className="custom-dropdown"
                style={{
                    backgroundColor: theme.accent,
                    color: theme.container,
                }}
            >
                {title && `${title} `}
            </Dropdown.Toggle>
            <Dropdown.Menu
                className="custom-dropdown-menu"
                style={{ backgroundColor: theme.container }}
            >
                {items.map((item) => {
                    return (
                        <Dropdown.Item
                            key={item}
                            as="button"
                            className="custom-dropdown-menu-item"
                            style={{
                                color: theme.text,
                            }}
                            onClick={() => {
                                onItemSelection(item);
                            }}
                        >
                            {item}
                        </Dropdown.Item>
                    );
                })}
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default CustomDropdown;
