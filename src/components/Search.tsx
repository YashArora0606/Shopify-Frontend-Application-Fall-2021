import React, { useState } from 'react';
import './Search.css';

interface SearchProps {
  onSubmit: (keywords: string) => Promise<void>;
  defaultText: string;
}

const Search = ({ onSubmit, defaultText } : SearchProps) => {

  const [keywords, setKeywords] = useState<string>("");

  return (
    <div>
      <input 
      value={keywords}
      placeholder={defaultText}
      onChange={(e) => setKeywords(e.target.value)}
      ></input>
      <button 
        onClick={() => {onSubmit(keywords)}}>
        Submit
      </button>
    </div>

  );
}

export default Search;
