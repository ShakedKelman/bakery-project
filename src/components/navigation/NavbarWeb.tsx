import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { OrderModel } from '../../models/OrderModel';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'; 
import '../../css/navbar.css';

type Props = {
    orderedItems: OrderModel[]; // Define type for ordered items as an array of OrderModel
  };

const NavbarWeb = ({ orderedItems }: Props) => {
    // const [showOrderLink, setShowOrderLink] = useState(false); // State to toggle showing "Order" link
    // React.useEffect(() => {
    //     setShowOrderLink(orderedItems.length > 0);
    //   }, [orderedItems]);
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

        {/* Cart Icon */}
        <Nav className="ms-auto">
          {orderedItems.length > 0 && (
            <Nav.Link as={Link} to="/orders" className="cart-icon">
              <ShoppingCartOutlinedIcon />
              <span className="cart-item-count">{orderedItems.length}</span>
            </Nav.Link>
          )}
  </Nav>
    </Container>
</Navbar>
);
};

export default NavbarWeb;
