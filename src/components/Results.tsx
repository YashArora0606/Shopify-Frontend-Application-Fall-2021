import React, { useContext, useEffect, useState } from 'react';
import './Results.scss';
import Container from './Container';
import ResultCard from './ResultCard';
import { ThemeContext } from 'styled-components';
import { ThemeType } from '../styling/themes';

// Todo: type search results
type ResultsProps = {
    searchResults: any
    currentQuery: string
}

const Results = ({ searchResults, currentQuery } : ResultsProps) => {

    const theme = useContext<ThemeType>(ThemeContext);

    const [results, setResults] = useState<any>([]);
    const [text, setText] = useState<string>("");
    
    const style = {
        color: theme.secondary
    }

    useEffect(() => {
        setResults(searchResults);
        
        if (!searchResults) {
            setText(`Sorry, we couldn't find any search results for "${currentQuery}"`);
        } else if (searchResults.length === 0) {
            setText("Your search results will show up here!");
        } else {
            setText(`Showing results for "${currentQuery}"`);
        }

    }, [searchResults, currentQuery]);

    return (
        <Container>
            <p style={style}>{ text }</p>
            {results && results.map((entry: any) => {
                return (
                    <ResultCard
                        key={entry.imdbID}
                        data={entry}
                    />
                );
            })}
        </Container>
    );
};

export default Results;
