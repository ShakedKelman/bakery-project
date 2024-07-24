import React, { useState, useEffect } from 'react';
import { Col, Card, Button } from 'react-bootstrap';
import { ProductModel } from '../../models/ProductModel';
import { SvgIcon } from '@mui/material';
import { useOrder } from '../OrderContext';
// src/components/ProductCard.tsx
import Product from './Product';

type ProductCardProps = {
    product: ProductModel;
};

function ProductCard({ product }: ProductCardProps) {
    const { addToOrder, removeFromOrder, orderedItems } = useOrder();
    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        const orderItem = orderedItems.find(item => item.productId === product.id);
        setQuantity(orderItem ? orderItem.quantity : 0);
    }, [orderedItems, product.id]);

    const handleAddToCard = () => {
        addToOrder(product);
    };

    const handleRemoveFromCard = () => {
        removeFromOrder(product.id);
        console.log(`Rendering ProductCard for ${product.name}`);

    };

    return (
        <Col>
            <Card className="custom-card-style">
                <Product product={product} />
                <div className='button-wrapper'>
                    {quantity === 0 ? (
                        <Button variant="outline-light" onClick={handleAddToCard} className="mt-3 add-button" size="sm">
                            Add to Order
                        </Button>
                    ) : (
                        <div className="button-wrapper">
                            <div className="card-add add-button" onClick={handleRemoveFromCard}>
                                <SvgIcon>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                </SvgIcon>
                            </div>
                            <div className="counter-display">
                                {quantity}
                            </div>
                            <div className="card-add add-button" onClick={handleAddToCard}>
                                <SvgIcon>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                </SvgIcon>
                            </div>
                        </div>
                    )}
                </div>
               
            </Card>
        </Col>
    );
}

export default ProductCard;