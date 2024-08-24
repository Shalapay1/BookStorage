import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "../index";
import BookItem from "./BookItem";
import { Row } from 'react-bootstrap'; // Add this import statement

const BookList = observer( () => {
    const {book} = useContext(Context)
    return (
        <Row className="d-flex">
            {book.books.map(book =>
            <BookItem key={book.id} book={book}/>
            )}

        </Row>
    )
})

export default BookList;