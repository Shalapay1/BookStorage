import React, { useEffect, useState } from 'react';
import { Container, Col, Image, Row, Card, Button } from 'react-bootstrap';
import bigStar from '../assets/bigStar.png'
import {fetchOneDevice} from "../http/api.js";
import {useParams} from 'react-router-dom'

const BookPage = () => {
  const [book, setBook] = useState({info: []})
  const {id} = useParams()

  useEffect(() => {
    fetchOneDevice(id).then(data => setBook(data))
  })
  return (
    <Container className="mt-3">
      <Row>
      <Col md={4}>
      <Image width={300} height={300} src={process.env.REACT_APP_API_URL + book.img}/>
      </Col>      
      <Col md={4}>
        <Row className="d-flex flex-column align-items-center">
          <h2>{book.name}</h2>
          <div
            className="d-flex align-items-center justify-content-center"
            style={{background: `url(${bigStar}) no-repeat center center`, width:240, height: 240, backgroundSize: 'cover', fontSize:64}}>
            {book.rating}
          </div>
        </Row>
      </Col>
      <Col md={4}>
        <Card className="d-flex flex-column align-items-center justify-content-around"
                        style={{width: 300, height: 300, fontSize: 32, border: '5px solid lightgray'}}>
          <h3>Залишилось </h3>
          <h3>{book.price} книг</h3>
          <Button variant='outline-dark'>Додати до кошику</Button>
        </Card>
      </Col>
      <Row className="d-flex flex-column m-3">
                <h1>Характеристики</h1>
                {book.info.map((info, index) =>
                    <Row key={info.id} style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}>
                        {info.title}: {info.description} {info.price}
                    </Row>
                )}
            </Row>
      </Row>
      
    </Container>
  );
}

export default BookPage;
