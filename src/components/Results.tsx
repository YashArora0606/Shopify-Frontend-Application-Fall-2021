import React, { useContext, useEffect, useState } from 'react';
import './Results.scss';
import Container from './Container';
import Label from './Label';
import { ThemeContext } from 'styled-components';
import { ThemeType } from '../styling/themes';
import { MovieModel } from '../models/movie.model';
import { ButtonType } from './Button';

// Todo: type search results
type ResultsProps = {
    searchResults: MovieModel[]
    currentQuery: string
    nominationsList: MovieModel[];
    onNomination: (movie: MovieModel) => void
}

const Results = ({ searchResults, nominationsList, currentQuery, onNomination } : ResultsProps) => {

    const theme = useContext<ThemeType>(ThemeContext);

    const [results, setResults] = useState<MovieModel[]>([]);
    const [nominations, setNominations] = useState<MovieModel[]>([]);

    const [text, setText] = useState<string>("");
    
    const style = {
        color: theme.secondary
    }

    useEffect(() => {
        setResults(searchResults);
        setNominations(nominationsList);
        
        if (currentQuery === "") {
            setText("Your search results will show up here!");
        } else if (!searchResults || searchResults.length === 0) {
            setText(`Sorry, we couldn't find any search results for "${currentQuery}"`);
        } else {
            setText(`Showing results for "${currentQuery}"`);
        }

    }, [searchResults, currentQuery, nominationsList]);

    return (
        <Container>
            <p className="text" style={style}>{ text }</p>
            <div className="entries">
                {results.map((entry: any) => {
                    return (
                        <Label
                            icon="plus"
                            disableButton={nominations.includes(entry)}
                            buttonType={ButtonType.Primary}
                            click={() => {onNomination(entry)}}
                            key={entry.imdbID}
                            data={entry}
                        />
                    );
                })}
            </div>

        </Container>
    );
};

export default Results;
