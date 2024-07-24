import React from 'react';
import { Link } from 'react-router-dom';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Carousel } from 'react-bootstrap';
import '../../../fullstack-project/src/css/homepage.css';
import { Container, Navbar, Nav, Button, Row, Col } from 'react-bootstrap';
import ImageSlider from './ImageSlider';


type Props = {};

const Home = (props: Props) => {

    return (
        <div>
            <ImageSlider />

            <Container>

                <Row className="mb-5">
                    <Col>
                        <h2 className="text-center mb-4">Featured Products</h2>
                        <Row>
                            {/* Add your product components here */}
                            <Col md={3} className="mb-4">
                                <div className="border p-3 text-center">Product 1</div>
                            </Col>
                            <Col md={3} className="mb-4">
                                <div className="border p-3 text-center">Product 2</div>
                            </Col>
                            <Col md={3} className="mb-4">
                                <div className="border p-3 text-center">Product 3</div>
                            </Col>
                            <Col md={3} className="mb-4">
                                <div className="border p-3 text-center">Product 4</div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>

            <footer className="bg-light py-4 mt-5">
                <Container>
                    <p className="text-center text-muted mb-0">&copy; 2024 ShopNow. All rights reserved.</p>
                </Container>
            </footer>
            {/* <Link to="/menu">
        <Button variant="contained" color="primary" style={{ marginTop: '20px' }}>
          Go to Menu
        </Button>
      </Link>
      <Link to="/contact">
        <Button variant="contained" color="secondary" style={{ marginTop: '20px', marginLeft: '10px' }}>
          Contact Us
        </Button>
      </Link> */}
        </div >
    );
};

export default Home;




