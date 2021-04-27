import React, { useState } from 'react';
import Button from './Button';
import './Search.css';

interface SearchProps {
  onSubmit: (keywords: string) => Promise<void>;
  defaultText: string;
}

const Search = ({ onSubmit, defaultText } : SearchProps) => {

  const [keywords, setKeywords] = useState<string>("");

  const submitButtonProps = {
    click: () => {onSubmit(keywords)},
    text: "Submit"
  }

  return (
    <div>
      <input className="searchBar"
      value={keywords}
      placeholder={defaultText}
      onChange={(e) => setKeywords(e.target.value)}
      ></input>
      <Button 
        {...submitButtonProps}
      >
      </Button>
    </div>

  );
}

export default Search;
