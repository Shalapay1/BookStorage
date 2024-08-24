import React from "react";
import { Card, Col } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import Star from "../assets/star.png";
import {useNavigate} from 'react-router-dom';
import { BOOK_ROUTE } from "../utils/const";

const BookItem = ({ book }) => {   
    const navigate = useNavigate();
    return (
        <Col md={4} className={"mt-3"} onClick={() => navigate(BOOK_ROUTE + '/' + book.id)}>
            <Card style={{ width: 150, cursor: 'pointer' }} border={"light"}>
                <Image width={150} height={150} src={process.env.REACT_APP_API_URL + book.img} alt={book.name} /> {/* Добавлено свойство alt для улучшения доступности */}
                <div className="text-black-50 mt-1 d-flex justify-cjntent-between align-items-center">
                    <div>kiga...</div>
                    <div className="d-flex align-items-right">{book.rating}</div>
                    <Image width={18} height={18} src={Star} />
                </div>
                <div>{book.name}</div>
            </Card>
        </Col>
    )
}

export default BookItem;