import React, { useState } from 'react';
import Button, { ButtonType } from './Button';
import Container from './Container';
import './Search.css';

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
    click: () => {},
    text: "Reset",
    type: ButtonType.Secondary,
    additionalClassName: "resetButton" 
  }

  return (
      <Container>
        <input className="searchBar"
        value={keywords}
        placeholder={defaultText}
        onChange={(e) => setKeywords(e.target.value)}
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
