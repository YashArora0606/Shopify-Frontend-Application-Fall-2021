import React, { useContext, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import './ThemeSelector.scss';
import { availableThemes } from '../styling/themes';
import { ThemeModel } from '../models/theme.model';
import { ThemeContext } from 'styled-components';


type ThemeSelectorProps = {
    onThemeSelection: (theme: ThemeModel) => void;
}

const ThemeSelector = ({ onThemeSelection }: ThemeSelectorProps) => {

    const theme = useContext<ThemeModel>(ThemeContext);
    
    return (
        <Dropdown>
            <Dropdown.Toggle className="theme-selector" style={{ backgroundColor: theme.accent, color: theme.container}}/>
            <Dropdown.Menu className="theme-selector-menu" style={{ backgroundColor: theme.container}}>
                {availableThemes.map((availableTheme) => {
                        return (
                            <Dropdown.Item 
                                key={availableTheme.title} 
                                as="button" 
                                className="theme-selector-menu-item" 
                                style={{ color: theme.text }}
                                onClick={() => {onThemeSelection(availableTheme)}}>
                                {availableTheme.title}
                            </Dropdown.Item>
                        );
                })}
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default ThemeSelector;