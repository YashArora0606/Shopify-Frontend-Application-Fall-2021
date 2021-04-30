import React, { useContext, useState } from 'react';
import Button, { ButtonType } from './Button';
import Container from './Container';
import './Search.scss';
import FadeIn from 'react-fade-in';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { ThemeModel } from '../models/theme.model';
import { ThemeContext } from 'styled-components';

interface SearchProps {
  onSubmit: (keywords: string) => Promise<void>;
}

const Search = ({ onSubmit } : SearchProps) => {

  const theme = useContext<ThemeModel>(ThemeContext);
  const [keywords, setKeywords] = useState<string>("");

  var submitButtonProps = {
    click: () => {onSubmit(keywords)},
    text: "Go",
    type: ButtonType.Primary,
    additionalClassName: "submitButton",
    disabled: false
  }

  var resetButtonProps = {
    click: () => {
      setKeywords("");
    },
    type: ButtonType.Blank,
    additionalClassName: "resetButton",
    icon: "times",
    disabled: false
  }

  const submitOnEnter = (event: { key: string; }) => {
    if (event.key === 'Enter') {
      onSubmit(keywords);
    }
  }

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newKeywords = e.target.value;
    setKeywords(newKeywords);
  }

  return (
      <Container>
        <FontAwesomeIcon 
          className="searchIcon" 
          icon={faSearch} 
          size="2x"
          color={theme.background}
        />
        <input 
          className="searchBar"
          style={{ background: theme.container, color: theme.text }}
          value={keywords}
          placeholder={"Search for a movie!"}
          onChange={(e) => {
            handleKeywordChange(e);
          }}
          onKeyDown={submitOnEnter}
        />
        {keywords.length > 0 && 
        
        <FadeIn>
          <div className="buttonArea">
            <Button {...resetButtonProps} />
            <Button {...submitButtonProps} />
          </div>
        </FadeIn>
        }
      </Container>
  );
}

export default Search;
