import React, { useContext, useState } from 'react';
import Button, { ButtonType } from './Button';
import Container from './Container';
import './Search.scss';
import FadeIn from 'react-fade-in';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { ThemeType } from '../styling/themes';
import { ThemeContext } from 'styled-components';

interface SearchProps {
  onSubmit: (keywords: string) => Promise<void>;
}

const Search = ({ onSubmit } : SearchProps) => {

  const theme = useContext<ThemeType>(ThemeContext);
  const [keywords, setKeywords] = useState<string>("");

  var submitButtonProps = {
    click: () => {onSubmit(keywords)},
    text: "Submit",
    type: ButtonType.Primary,
    additionalClassName: "submitButton",
  }

  var resetButtonProps = {
    click: () => {setKeywords("")},
    // text: "X",
    type: ButtonType.Blank,
    additionalClassName: "resetButton",
    icon: "times"
  }

  const submitOnEnter = (event: { key: string; }) => {
    if (event.key === 'Enter') {
      onSubmit(keywords);
    }
  }

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newKeywords = e.target.value
    setKeywords(newKeywords);
  }

  return (
      <Container>
        <FontAwesomeIcon 
          className="searchIcon" 
          icon={faSearch} 
          size="2x"
          color={theme.backgroundColor}
        />
        <input className="searchBar"
          value={keywords}
          placeholder={"Search for a movie!"}
          onChange={(e) => {
            handleKeywordChange(e)
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
