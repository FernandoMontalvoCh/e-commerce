import React, { useEffect, useState } from 'react';
import { getProductsThunk, filterProductThunk, filterCategoryThunk } from '../store/slices/products.slice';
import { useDispatch, useSelector } from 'react-redux';
import '../styles/home.css';
import { useNavigate } from 'react-router-dom';
import { InputGroup, Form, Button, ListGroup, Row, Col, Card } from "react-bootstrap";
import axios from 'axios';
import { addCartThunk } from '../store/slices/cart.slice';

const Home = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState("");
    const [categories, setCategories] = useState([]);
    const [quantity, setQuantity] = useState(1);

    const products = useSelector(state => state.products);


    useEffect(() => {
        dispatch(getProductsThunk())

        axios.get("https://ecommerce-api-react.herokuapp.com/api/v1/products/categories")
            .then(res => setCategories(res.data.data.categories))
    }, [])

    const addProduct = (id) => {
        const addProduct = {
            id,
            quantity
        }
        dispatch(addCartThunk(addProduct));
    }

    return (
        <div>
            <h1>Home</h1>
            <Row>
                <Col lg={3}>
                    <ListGroup>
                        {categories.map((category) => (
                            <ListGroup.Item
                                style={{ cursor: 'pointer'}}
                                key={category.id}
                                onClick={() => dispatch(filterCategoryThunk(category.id))}
                            >
                                {category.name}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
                <Col>
                    <InputGroup className="mb-3">
                        <Form.Control
                            placeholder="Search your product"
                            aria-label="Search your product"
                            aria-describedby="basic-addon2"
                            onChange={(e) => setSearchValue(e.target.value)}
                            value={searchValue}
                        />
                        <Button
                            variant="outline-secondary"
                            onClick={() => dispatch(filterProductThunk(searchValue))}
                        >
                            Button
                        </Button>
                    </InputGroup>

                    <Row xs={1} md={2} xl={3} className="g-4">
                        {products.map((product) => (
                            <Col key={product.id}>
                                <Card>
                                    <Card.Img
                                        variant="top"
                                        src={product.productImgs}
                                        style={{ height: '200px', width: '200px', marginLeft: '3rem', cursor: 'pointer' }}
                                        onClick={() => navigate(`/products/${product.id}`)}
                                    />
                                    <Card.Body>
                                        <Card.Title>{product.title}</Card.Title>
                                        <Card.Text><b>Price: </b>{product.price}</Card.Text>
                                        <Button onClick={() => addProduct(product.id)}>
                                            Add to Cart
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export default Home;