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
        <div style={{ margin: '20px', backgroundColor: '#FFFDD0;' }}>
            <ImageSlider />

            <Container>

                <Row className="mb-5">
                    <Col>
                        <h2 className="text-center mb-3">Featured Products</h2>
                        <Row>
                            {/* Add your product components here */}
                            <Col md={4} className="mb-3">
                                <div className="border p-3 text-center">  <Link to="/orders">
                                    <Button variant="contained" color="secondary" style={{ marginTop: '20px', marginLeft: '10px' }}>
                                        Contact Us
                                    </Button>
                                </Link></div>
                            </Col>
                            <Col md={4} className="mb-3">
                                <div className="border p-3 text-center">    <Link to="/contact">
                                    <Button variant="contained" color="secondary" style={{ marginTop: '20px', marginLeft: '10px' }}>
                                        go to shopping cart
                                    </Button>
                                </Link>
                                </div>
                            </Col>
                            <Col md={4} className="mb-3">
                                <div className="border p-3 text-center">    <Link to="/menu">
                                    <Button variant="contained" color="primary" style={{ marginTop: '20px' }}>
                                        Go to Menu
                                    </Button>
                                </Link>
                                </div>

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


        </div >
    );
};

export default Home;




