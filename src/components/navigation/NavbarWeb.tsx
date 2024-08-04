// src/components/navigation/NavbarWeb.tsx
import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'; 
import { useOrder } from '../OrderContext';
import '../../css/navbar.css';

const NavbarWeb = () => {
    const { orderedItems } = useOrder();

    return (
        <Navbar className="navbar-lilac" variant="light">
            <Container>
                {/* Navbar Brand with Icon */}
                <Navbar.Brand as={Link} to="/home">
                    <HomeOutlinedIcon fontSize="large" />
                </Navbar.Brand>

                {/* Nav Links */}
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/menu">Menu</Nav.Link>
                    <Nav.Link as={Link} to="/contact">Contact Us</Nav.Link>
                </Nav>

                <Nav className="ms-auto">
                    {orderedItems.length > 0 && (
                        <Nav.Link as={Link} to="/orders" className="cart-icon">
                            <ShoppingCartOutlinedIcon />
                            <span className="cart-item-count">
                                {orderedItems.reduce((total, item) => total + item.quantity, 0)}
                            </span>
                        </Nav.Link>
                    )}
                </Nav>
            </Container>
        </Navbar>
    );
};

export default NavbarWeb;

