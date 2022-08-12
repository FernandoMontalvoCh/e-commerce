import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductsThunk } from '../store/slices/products.slice';
import { useDispatch } from 'react-redux';
import { InputGroup, Form, Button, Card } from 'react-bootstrap';
import { addCartThunk } from '../store/slices/cart.slice';
import '../styles/pd.css'

const ProductsDetail = () => {

    const productsList = useSelector(state => state.products);
    const [productDetail, setProductDetail] = useState({});
    const [suggestedProducts, setSuggestedProducts] = useState([]);
    const [quantity, setQuantity] = useState("");

    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const products = productsList.find(productsItem => productsItem.id === Number(id));
        setProductDetail(products);
        const filteredProducts = productsList.filter(productsItem => productsItem.category.id === products.category.id);
        setSuggestedProducts(filteredProducts);
    }, [productsList, id])

    useEffect(() => {
        dispatch(getProductsThunk())
    }, [])

    const addProduct = () => {
        const addProduct = {
            id: productDetail.id,
            quantity
        }
        dispatch(addCartThunk(addProduct));
        reset();
    }

    const reset = () => {
        setQuantity("");
    }

    return (
        <div>
            <h1 className='h1'>Product Detail</h1>
            <h1>{productDetail?.title}</h1>
            <img src={productDetail?.productImgs?.[0]} alt="" className='img-1' />
            <p>{productDetail?.description}</p>
            <p><b>Price: </b>${productDetail?.price}</p>
            <div>
                <h4>Add Product</h4>
                <InputGroup className="mb-3">
                    <Form.Control
                        placeholder="Set your quantity"
                        aria-label="Set your quantity"
                        aria-describedby="basic-addon3"
                        value={quantity}
                        onChange={e => setQuantity(e.target.value)}
                        style={{ height: '52px'}}
                    />
                    <Button 
                    variant="outline-secondary" 
                    id="button-addon3" 
                    onClick={addProduct}
                    >
                        Add to Cart
                    </Button>
                </InputGroup>
            </div>
            <br />
            <h3>Maybe you might be interested</h3>
            <div className='maybe'>
                {
                    suggestedProducts.map(products => (
                        <Card style={{ width: '18rem' }} key={products.id} >
                            <Card.Img 
                            variant="top" 
                            src={products.productImgs} 
                            style={{ height: '200px', width: '200px', marginLeft: '3rem', cursor: 'pointer' }} 
                            onClick={() => navigate(`/products/${products.id}`)}
                            />
                            <Card.Body>
                                <Card.Title>{products.title}</Card.Title>

                            </Card.Body>
                        </Card>
                    ))
                }
            </div>
        </div>
    );
};

export default ProductsDetail;