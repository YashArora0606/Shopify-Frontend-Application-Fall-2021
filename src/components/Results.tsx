import React, { useEffect, useState } from 'react';
import './Results.scss';
import Container from './shared/Container';
import Label from './shared/Label';
import { MovieModel } from '../models/movie.model';
import { ButtonType } from './shared/Button';

type ResultsProps = {
    searchResults: MovieModel[];
    currentQuery: string;
    nominationsList: MovieModel[];
    onNomination: (movie: MovieModel) => void;
}

const Results = ({ searchResults, nominationsList, currentQuery, onNomination } : ResultsProps) => {

    const [text, setText] = useState<string>("");

    const shouldButtonBeDisabled = (movie: MovieModel) => {
        return nominationsList.filter((entry) => { 
            return entry.imdbID === movie.imdbID; 
        }).length !== 0;
    }

    useEffect(() => {        
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
            <p className="text">{ text }</p>
            <div className="entries">
                {searchResults.map((entry: MovieModel) => {
                    return (
                        <Label
                            icon="plus"
                            disableButton={shouldButtonBeDisabled(entry)}
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
