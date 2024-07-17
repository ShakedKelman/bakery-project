import React, { useState } from 'react';
import { Card, Button, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Product from './Product'; // Assuming Product component is in './Product'
import { ProductModel } from '../../models/productInterface';
import '../../css/navbar.css';
import { SvgIcon } from '@mui/material';

type ProductCardProps = {
    product: ProductModel;
};

function ProductCard({ product }: ProductCardProps) {

    const navigate = useNavigate();
    const [currentProduct,setCurrentProduct] = useState(product);

    const handleAddToCard = () => {

        currentProduct.counter = currentProduct.counter == undefined ? 1 : currentProduct.counter + 1;
        setCurrentProduct(product);
        console.log(`Item ${product.id} ${product.name} added to order total count: ${currentProduct.counter}`);
        // navigate('/orders', { state: { product } });

    };

    return (
        <Col > {/* Add margin bottom to create space between ProductCards */}
            <Card className="custom-card-style">
                <Product product={product} />

                <div className='card-wrapper'>
                    {currentProduct.counter == undefined || currentProduct.counter == 0 ? (
                        <Button variant="primary" onClick={handleAddToCard} className="mt-3">
                            Add to Order
                        </Button>
                    ) : (
                        <div className="button-wrapper">
                            <div className="card-add" onClick={handleAddToCard}>
                                <SvgIcon>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                </SvgIcon>
                            </div>
                            <div className="card-add">
                                <SvgIcon>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1-18 0Z" />
                                    </svg>
                                </SvgIcon>
                            </div>
                        </div>
                    )}




                </div>
                <div className="card-footer">
                    {/* Footer content */}
                </div>
            </Card>
        </Col>
    );
}

export default ProductCard;
