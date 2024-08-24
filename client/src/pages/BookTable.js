import React, { useState, useEffect } from 'react';
import { Table, Container, Button, Modal } from 'react-bootstrap';
import { getBooks, getCipherByBookTitle } from '../http/api';

const BookTable = () => {
  const [books, setBooks] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const data = await getBooks();
    setBooks(data);
  };

  const handleGetCipherByBookTitle = async () => {
    const title = prompt("Введить назву книги:");
    const data = await getCipherByBookTitle(title);
    if (data && data.id) {
      setSelectedBook(data);
      setShow(true);
    } else {
      alert('Книга не найдена');
    }
  };

  const handleClose = () => setShow(false);

  return (
    <Container className="mt-3">
      <Button variant="outline-dark" className="mb-3" onClick={fetchBooks}>
        Обновить таблицу
      </Button>
      <Button variant="outline-dark" className="mb-3" onClick={handleGetCipherByBookTitle}>
        Найти книгу по названию
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Название</th>
            <th>Автор</th>
            <th>Жанр</th>
            <th>Шифр</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.genre}</td>
              <td>{book.cipher}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Информация о книге</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedBook ? (
            <Table bordered>
              <tbody>
                <tr>
                  <td>ID</td>
                  <td>{selectedBook.id}</td>
                </tr>
                <tr>
                  <td>Название</td>
                  <td>{selectedBook.title}</td>
                </tr>
                <tr>
                  <td>Автор</td>
                  <td>{selectedBook.author}</td>
                </tr>
                <tr>
                  <td>Жанр</td>
                  <td>{selectedBook.genre}</td>
                </tr>
                <tr>
                  <td>Шифр</td>
                  <td>{selectedBook.cipher}</td>
                </tr>
              </tbody>
            </Table>
          ) : (
            <p>Книга не найдена.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Закрыть
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default BookTable;
