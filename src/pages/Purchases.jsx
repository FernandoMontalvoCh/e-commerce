import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getPurchasesThunk } from '../store/slices/purchases.slice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

const Purchases = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const purchases = useSelector(state => state.purchases)

    useEffect(() => {
        dispatch(getPurchasesThunk())
    }, [])

    const getTotal = (products) => {
        let total = 0;

        products.forEach(product => {
            total += Number(product.price)
        });
        return total;
    }

    console.log(purchases);
    console.log(purchases[0]?.cart.products);
    return (
        <Container>
            <Row className='justify-content-md-center'>

                <Col xs lg='8'>
                    <h1>Purchases</h1>
                    {
                        purchases.map((purchase) => (
                            <div key={purchase.createdAt} className="card text-white mb-5">
                                <div className='card-header bg-primary'>{purchase.id} {" - Purchase :"}{purchase.createdAt}</div>
                                <div className='card-body textmuted'>

                                    {
                                        purchase.cart.products.map((product) => (
                                            <div key={product.cart?.products.title} style={{ padding: '15px 8px', borderBottom: 'solid 1px', color: 'black' }}>
                                                <div
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={() => navigate(`/products/${product.id}`)}
                                                    className='card-title'
                                                >
                                                    {product.title}
                                                </div>
                                                <div>Qty : {product.productsInCart.quantity}{" Price : "} {product.price} $</div>
                                            </div>
                                        ))
                                    }
                                    <h5 style={{ color: 'black'}}> ${getTotal(purchase.cart.products)}</h5>
                                </div>
                            </div>
                        ))
                    }
                </Col>
            </Row>
        </Container>
    );
};

export default Purchases;