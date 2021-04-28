import React, { useState } from 'react';
import Button, { ButtonType } from './Button';
import Container from './Container';
import './Search.scss';

interface SearchProps {
  onSubmit: (keywords: string) => Promise<void>;
  defaultText: string;
}

const Search = ({ onSubmit, defaultText } : SearchProps) => {

  const [keywords, setKeywords] = useState<string>("");

  const submitButtonProps = {
    click: () => {onSubmit(keywords)},
    text: "Submit",
    type: ButtonType.Primary,
    additionalClassName: "submitButton" 
  }

  const resetButtonProps = {
    click: () => {setKeywords("")},
    text: "Reset",
    type: ButtonType.Secondary,
    additionalClassName: "resetButton" 
  }

  const submitOnEnter = (event: { key: string; }) => {
    if (event.key === 'Enter') {
      onSubmit(keywords);
    }
  }

  return (
      <Container>
        <input className="searchBar"
        value={keywords}
        placeholder={defaultText}
        onChange={(e) => setKeywords(e.target.value)}
        onKeyDown={submitOnEnter}
        ></input>
        <div className="buttonArea">
          <Button
            {...resetButtonProps}
          />
          <Button
            {...submitButtonProps}
          />
        </div>


      </Container>
  );
}

export default Search;
