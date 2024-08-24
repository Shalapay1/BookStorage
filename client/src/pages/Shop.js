import React, { useContext, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import GenreBar from '../components/GenreBar';
import BookList from '../components/BookList.js';
import { observer } from 'mobx-react-lite';
import { Context } from '../index.js';
import {fetchDevices, fetchTypes} from "../http/api.js";


const Shop = observer(() => {
  const {book} = useContext(Context)

  useEffect(() => {
    fetchTypes().then(data => book.setGenres(data))
    fetchDevices().then(data => book.setBook(data.rows))
  })
    
 


  return (
    <Container >
        <Row className="mt-2">
          <Col md={3}>
            <GenreBar/>
          </Col>
          <Col md={9} className='d-flex flex-row align-items-start'>
            <BookList/>
          </Col>

        </Row>
    </Container>
  );
});

export default Shop;
