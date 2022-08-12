import React, { useState } from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Cart from './Cart';

const NavBar = () => {

  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const token = localStorage.getItem("token");

  const handleClose = () => setShow(false);
  const handleShow = () => {
    if(token){
      setShow(true);
    } else {
      navigate("/login")
    }
    
  }

  const logOut = () => {
    localStorage.setItem("token", "")
    navigate("/login");
  }

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/#/">e-commerce</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/#/">Home</Nav.Link>
              <Nav.Link href="/#/purchases">Purchases</Nav.Link>
              {
                token ? (
                  <Nav.Link as={Button} onClick={logOut} style={{ background: "white" }}>Log out</Nav.Link>
                ) : (
                  <Nav.Link href="/#/login">Login</Nav.Link>
                )
              }
              <Nav.Link as={Button} onClick={handleShow} style={{ background: "white" }}>Cart</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Cart show={show} handleClose={handleClose}/>
    </>
  );
};

export default NavBar;