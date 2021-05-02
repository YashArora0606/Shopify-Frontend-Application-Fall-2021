import React, { useCallback, useContext, useState } from "react";
import "./CustomDropdown.scss";
import { ThemeModel } from "../models/theme.model";
import { ThemeContext } from "styled-components";
import { ActionList, Popover } from "@shopify/polaris";
import Button, { ButtonType } from "./shared/Button";

type DropdownItemType = {
    content: string;
    onAction: any;
}

type CustomDropdownProps = {
    items: DropdownItemType[];
};

const CustomDropdown = ({
    items
}: CustomDropdownProps) => {
    const theme = useContext<ThemeModel>(ThemeContext);

    const [popoverActive, setPopoverActive] = useState(true);

    const togglePopoverActive = useCallback(
      () => setPopoverActive((popoverActive) => !popoverActive),
      [],
    );

    const style = {
        backgroundColor: theme.background
    }
  
    const activator = (
        <div className="custom-dropdown">
            <Button 
                onClick={() => {togglePopoverActive()}}
                icon="caret-down"
                type={ButtonType.Primary}
                disabled={false}
            />
        </div>
    );

    return (
    
    
    <div style={style}>
        <Popover
            active={popoverActive}
            activator={activator}
            onClose={togglePopoverActive}
            preferredAlignment="right"
        >
            <ActionList
                items={items} />
        </Popover>
    </div>

    )

    // return (
    //     <Dropdown>
    //         <Dropdown.Toggle
    //             className="custom-dropdown"
    //             style={{
    //                 backgroundColor: theme.accent,
    //                 color: theme.container,
    //             }}
    //         >
    //             {title && `${title} `}
    //         </Dropdown.Toggle>
    //         <Dropdown.Menu
    //             className="custom-dropdown-menu"
    //             style={{ backgroundColor: theme.container }}
    //         >
    //             {items.map((item) => {
    //                 return (
    //                     <Dropdown.Item
    //                         key={item}
    //                         as="button"
    //                         className="custom-dropdown-menu-item"
    //                         style={{
    //                             color: theme.text,
    //                         }}
    //                         onClick={() => {
    //                             onItemSelection(item);
    //                         }}
    //                     >
    //                         {item}
    //                     </Dropdown.Item>
    //                 );
    //             })}
    //         </Dropdown.Menu>
    //     </Dropdown>
    // );
};

export default CustomDropdown;
