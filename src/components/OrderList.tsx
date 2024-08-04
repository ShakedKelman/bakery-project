import React, { useState } from 'react';
import { Alert, Button, Container, Row, Spinner } from 'react-bootstrap';
import { useOrder } from './OrderContext';
import ProductCard from './products/ProductCard';
import { OrderModel } from '../models/OrderModel';
import OrderForm from './OrderForm';

const OrderList: React.FC = () => {
    const { orderedItems } = useOrder();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);

    const handleConfirmOrder = () => {
        setShowModal(true);
    };

    return (
        <div style={{ margin: '20px' }}>
            {orderedItems.length === 0 ? (
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <h4>Your cart is empty</h4>
                </div>
            ) : (
                <>
                    <Button
                        variant="primary"
                        size="lg"
                        onClick={handleConfirmOrder}
                        disabled={loading}
                        className="mb-4"
                    >
                        {loading ? (
                            <>
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                                {' '}Submitting...
                            </>
                        ) : (
                            'Confirm Order'
                        )}
                    </Button>

                    {error && <Alert variant="danger">{error}</Alert>}

                    <Container>
                        <Row xs={1} md={2} lg={3} className="g-4">
                            {orderedItems.map((orderItem: OrderModel) => (
                                <ProductCard key={orderItem.productId} product={orderItem.product} />
                            ))}
                        </Row>
                    </Container>

                    <OrderForm 
                        showModal={showModal} 
                        setShowModal={setShowModal}
                        setLoading={setLoading}
                        setError={setError}
                    />
                </>
            )}
        </div>
    );
};

export default OrderList;
