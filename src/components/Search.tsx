import React, { useState } from 'react';
import Button, { ButtonType } from './Button';
import Container from './Container';
import './Search.scss';
import FadeIn from 'react-fade-in';

interface SearchProps {
  onSubmit: (keywords: string) => Promise<void>;
  defaultText: string;
}

const Search = ({ onSubmit, defaultText } : SearchProps) => {

  const [keywords, setKeywords] = useState<string>("");

  var submitButtonProps = {
    click: () => {onSubmit(keywords)},
    text: "Submit",
    type: ButtonType.Primary,
    additionalClassName: "submitButton",
  }

  var resetButtonProps = {
    click: () => {setKeywords("")},
    text: "Reset",
    type: ButtonType.Blank,
    additionalClassName: "resetButton",
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
        <input className="searchBar"
        value={keywords}
        placeholder={defaultText}
        onChange={(e) => {
          handleKeywordChange(e)
        }}
        onKeyDown={submitOnEnter}
        ></input>
        {keywords.length > 0 && 
        
        <FadeIn>
          <div className="buttonArea">
            <Button
              {...resetButtonProps}
            />
            <Button
              {...submitButtonProps}
            />
          </div>
        </FadeIn>

        
        }


      </Container>
  );
}

export default Search;
