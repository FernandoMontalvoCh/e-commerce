import React, { useEffect } from 'react';
import { Offcanvas, Button } from 'react-bootstrap';
import { buyCartThunk, deleteCartThunk, getCartThunk } from '../store/slices/cart.slice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../styles/cart.css'

const Cart = ({ show, handleClose }) => {

    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart);

    const navigate = useNavigate();


    useEffect(() => {
        dispatch(getCartThunk());
    }, [])

    const getTotal = (cart) => {
        let total = 0;
        cart.forEach(crt => {
            total += Number(crt.price * crt.productsInCart.quantity)
        });
        return total;
    }

    return (
        <Offcanvas show={show} onHide={handleClose} placement='end'>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <ul>
                    {
                        cart.map(crt => (
                            <li onClick={() => navigate(`/products/${crt.id}`)} key={crt.id}>
                                {crt.title}
                                <p><b>Quantity: </b>{crt.productsInCart.quantity}</p>
                                <p><b>Price: </b>${crt.price * crt.productsInCart.quantity}</p>
                                <div className='div'>
                                    <Button
                                        onClick={() => dispatch(deleteCartThunk(crt.id))}
                                        style={{ background: 'red' }}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </li>
                        )
                        )}
                </ul>
                <h5><b>Total: </b>${getTotal(cart)}</h5>
                <Button onClick={() => dispatch(buyCartThunk())}>Buy Cart</Button>
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default Cart;