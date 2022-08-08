import React, { useEffect, useState } from 'react';
import { getProductsThunk, filterProductThunk, filterCategoryThunk } from '../store/slices/products.slice';
import { useDispatch, useSelector } from 'react-redux';
import '../styles/home.css';
import { useNavigate } from 'react-router-dom';
import { InputGroup, Form, Button, ListGroup } from "react-bootstrap";
import axios from 'axios';

const Home = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [ searchValue, setSearchValue ] = useState("");
    const [ categories, setCategories ] = useState([]);

    const products = useSelector(state => state.products);
    

    useEffect(() => {
        dispatch(getProductsThunk())

        axios.get("https://ecommerce-api-react.herokuapp.com/api/v1/products/categories")
            .then(res => setCategories(res.data.data.categories))
    }, [])
    
    return (
        <div>
            <h1>Home</h1>
                <ListGroup>
                    {
                        categories.map(category => (
                            <ListGroup.Item key={category.id} onClick={() => dispatch(filterCategoryThunk(category.id))}>
                                {category.name}
                            </ListGroup.Item>
                        ))
                    }
                </ListGroup>
            <InputGroup className="mb-3">
                <Form.Control
                 placeholder="Search your product"
                aria-label="Search your product"
                aria-describedby="basic-addon2"
                value={searchValue}
                onChange={ e => setSearchValue(e.target.value)}
                />
                <Button variant="outline-secondary" id="button-addon2" onClick={() => dispatch(filterProductThunk(searchValue))}>
                Button
                </Button>
            </InputGroup>
            <div className='products-flex'>
                {
                    products.map(product => (
                        <div key={product.id} className='products-container' onClick={() => navigate(`/products/${product.id}`)}>
                            <div>{product.title}</div>
                            <img src={product.productImgs} alt="" className='products-img'/>
                            <div>{product.price}</div>
                        </div>

                    ))
                }
            </div>
        </div>
    );
};

export default Home;