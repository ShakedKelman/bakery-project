// export default ProductCard;

import React, { useState, useEffect } from 'react';
import { Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Product from './Product';
import { ProductModel } from '../../models/productInterface';
import { SvgIcon } from '@mui/material';

type ProductCardProps = {
    product: ProductModel;
};

function ProductCard({ product }: ProductCardProps) {
    const navigate = useNavigate();
    const [currentProduct, setCurrentProduct] = useState(product);
    const [showButtons, setShowButtons] = useState(false);

    useEffect(() => {
        setShowButtons(currentProduct.counter !== undefined && currentProduct.counter > 0);
    }, [currentProduct.counter]);

    const handleAddToCard = () => {
        const newCounter = currentProduct.counter === undefined ? 1 : currentProduct.counter + 1;
        setCurrentProduct(prevProduct => ({
            ...prevProduct,
            counter: newCounter
        }));
        console.log(`Item ${product.id} ${product.name} added to order total count: ${newCounter}`);
    };


    const handleRemoveFromCard = () => {
        if (currentProduct.counter && currentProduct.counter > 0) {
            const newCounter = currentProduct.counter - 1;
            setCurrentProduct(prevProduct => ({
                ...prevProduct,
                counter: newCounter
            }));
            console.log(`Item ${product.id} ${product.name} removed from order. Total count: ${newCounter}`);
        }
    };

    return (
        <Col>
            <Card className="custom-card-style">
                <Product product={product} />
                <div className='card-wrapper'>
                    {!showButtons ? (
                        <Button variant="primary" onClick={handleAddToCard} className="mt-3">
                            Add to Order
                        </Button>
                    ) : (
                        <div className="button-wrapper">
                            <div className="card-add" onClick={handleRemoveFromCard}>
                                <SvgIcon>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                </SvgIcon>
                            </div>
                            <div className="counter-display">
                                {currentProduct.counter}
                            </div>
                            <div className="card-add" onClick={handleAddToCard}>
                                <SvgIcon>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
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