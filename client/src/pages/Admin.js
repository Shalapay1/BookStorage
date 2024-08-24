import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Modal, Table } from "react-bootstrap";
import AddUserModal from '../modals/AddUserModal';
import {
  getBooksByReader,
  getBookByCipher,
  getCipherByBookTitle,
  getBookAssignmentDate,
  getReadersWithOldBooks,
  getReadersWithFewBooks,
  getNumberOfReaders,
  deleteBookById,
  getBookByCipher as fetchBookByCipher,
  
} from '../http/api';

const Admin = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [tableData, setTableData] = useState([]);
  const [showAddUserModal, setShowAddUserModal] = useState(false);

  const handleShowModal = (title, data) => {
    setModalTitle(title);
    setTableData(data);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleGetBooksByReader = async () => {
    const readerId = prompt("Введите ID читателя:");
    if (readerId) {
      const data = await getBooksByReader(readerId);
      console.log(data);
      handleShowModal('Книги закріплені за читачем', data);
    }
  };

  const handleGetBookByCipher = async () => {
    const cipher = prompt("Введіть шифр книги:");
    if (cipher) {
      const data = await getBookByCipher(cipher);
      navigate('/book/' + data.id);
    }
  };

  const handleGetCipherByBookTitle = async () => {
    const title = prompt("Введить назву книги:");
    if (title) {
      const data = await getCipherByBookTitle(title);
      console.log(data);
      if (data && data.id) {
        prompt("Шифр заданої книги - " + data.id);
      } else {
        alert('Книга не найдена');
      }
    }
  };

  const handleGetBookAssignmentDate = async () => {
    const bookId = prompt("Введите ID книги:");
    const readerId = prompt("Введите ID читателя:");
    if (bookId && readerId) {
      const data = await getBookAssignmentDate(bookId, readerId);
      console.log(data);
      if (data) {
        handleShowModal('Дата закріплення книги', [data]);
      } else {
        alert('Запись не найдена');
      }
    }
  };

  const handleGetReadersWithOldBooks = async () => {
    const data = await getReadersWithOldBooks();
    console.log(data);
    const filteredData = data.map(item => ({
      email: item.user.email,
      bookName: item.book.name
    }));
    handleShowModal('Читачі, що взяли книгу більше місяця тому', filteredData);
  };

  const handleGetReadersWithFewBooks = async () => {
    const data = await getReadersWithFewBooks();
    console.log(data);
    const filteredData = data.map(item => ({
      email: item.email
    }));
    handleShowModal('Читачі з менше ніж двома книгами', filteredData);
  };

  const handleGetNumberOfReaders = async () => {
    try {
      const { totalCount } = await getNumberOfReaders();
      handleShowModal('Число читачів, які користуються бібліотекою', [{ 'Всього_читачів': totalCount }]);
    } catch (error) {
      console.error(error);
      alert('Ошибка при получении числа читачей');
    }
  };

  const handleAddNewReader = () => {
    setShowAddUserModal(true);
  };
  

  const handleDeleteBookByCipher = async () => {
    const cipher = prompt("Введите шифр книги для удаления:");
    if (cipher) {
      await deleteBookById(cipher);
      console.log(cipher);
      
    }
  };

  return (
    <Container className="d-flex flex-column">
      <Button variant={"outline-dark"} className="mt-4 p-2" onClick={handleGetBooksByReader}>
        Які книги закріплені за певним читачем
      </Button>
      <Button variant={"outline-dark"} className="mt-4 p-2" onClick={handleGetBookByCipher}>
        Як називається книга із заданим шифром
      </Button>
      <Button variant={"outline-dark"} className="mt-4 p-2" onClick={handleGetCipherByBookTitle}>
        Який шифр книги із заданою назвою
      </Button>
      <Button variant={"outline-dark"} className="mt-4 п-2" onClick={handleGetReadersWithOldBooks}>
        Хто з читачів узяв книгу більше місяця тому
      </Button>
      <Button variant={"outline-dark"} className="mt-4 p-2" onClick={handleGetReadersWithFewBooks}>
        За ким з читачів закріплені книги, кількість примірників яких в бібліотеці не перевищує 2
      </Button>
      <Button variant={"outline-dark"} className="mt-4 p-2" onClick={handleGetNumberOfReaders}>
        Яке число читачів користується бібліотекою
      </Button>
      <Button variant={"outline-dark"} className="mt-4 p-2" onClick={handleAddNewReader}>
        Записати в бібліотеку нового читача
      </Button>
      <Button variant={"outline-dark"} className="mt-4 p-2" onClick={handleDeleteBookByCipher}>
        Списати стару або втрачену книгу
      </Button>
      

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                {tableData.length > 0 && Object.keys(tableData[0]).map(key => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((value, i) => (
                    <td key={i}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Закрыть
          </Button>
        </Modal.Footer>
      </Modal>

      <AddUserModal show={showAddUserModal} handleClose={() => setShowAddUserModal(false)} />
    </Container>
  );
};

export default Admin;
