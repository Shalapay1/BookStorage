import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "../index";
import ListGroup from 'react-bootstrap/ListGroup';

const GenreBar = observer( () => {
    const {book} = useContext(Context)
    return (
        <ListGroup>
            {book.genres.map(genre =>
            <ListGroup.Item 
            active={genre.id === book.selectedGenre.id}
            onClick={() => book.setSelectedGenre(genre)} 
            key={genre.id}>
                {genre.name}
            </ListGroup.Item>
            )}
            
            
        </ListGroup>
    )
})

export default GenreBar;