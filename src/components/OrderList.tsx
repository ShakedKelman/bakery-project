import React, { useState } from 'react';
import { Alert, Button, Container, ListGroup, Spinner } from 'react-bootstrap';
import { useOrder } from './OrderContext';
import ProductCard from './products/ProductCard';
import { OrderModel } from '../models/OrderModel';
import OrderForm from './OrderForm';
import '../css/orderList.css'; // Import the CSS file

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
                <Container>
                    <div className="orderListBorderContainer">
                        <div className='orderListContainer'>
                            <ListGroup>
                                {orderedItems.map((orderItem: OrderModel) => (
                                    <ListGroup.Item key={orderItem.productId} className="d-flex align-items-center">
                                        <ProductCard
                                            product={orderItem.product}
                                            className="order-list-card" // Apply specific class
                                        />
                                        <div className="ms-3">
                                            <h5>{orderItem.product.name}</h5>
                                            <p>Quantity: {orderItem.quantity}</p>
                                            <p>Total: ${orderItem.total.toFixed(2)}</p>
                                        </div>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </div>

                        <div className="button-container">
                            <Button
                                variant="light"  /* Match custom styles */
                                onClick={handleConfirmOrder}
                                disabled={loading}
                                className="order-button"
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
                        </div>

                        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
                    </div>

                    <OrderForm 
                        showModal={showModal} 
                        setShowModal={setShowModal}
                        setLoading={setLoading}
                        setError={setError}
                    />
                </Container>
            )}
        </div>
    );
};

export default OrderList;
