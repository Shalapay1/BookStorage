import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "../index";
import { Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

const AutorBar = observer( () => {
    const {book} = useContext(Context)
    console.log("SPERMA!!!!!", {book})
    return (
        <Row className='d-flex flex-row'>  
      {book.autors.map(autor => (
        <Card key={autor.id} className={"p-3"}>
          {autor.name}
        </Card>
      ))}
    </Row>
  );
});

export default AutorBar;