import React, { useState } from 'react';
import { Alert, Button, Container, Row, Spinner } from 'react-bootstrap';
import { useOrder } from './OrderContext';
import ProductCard from './products/ProductCard';
import { submitOrder } from '../api/products-api';


const OrderList: React.FC = () => {
    const { orderedItems, calculateTotalAmount } = useOrder();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmitOrder = async () => {
        setLoading(true);
        setError(null);

        const totalAmount = calculateTotalAmount();
        const orderData = {
            items: orderedItems,
            totalAmount: totalAmount
        };

        try {
            await submitOrder(orderData);
            alert(`Order submitted successfully! Total Amount: $${totalAmount}`);
        } catch (err) {
            setError('An error occurred while submitting the order.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ margin: '20px' }}>
            <Button
                variant="primary"
                size="lg"
                onClick={handleSubmitOrder}
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
                    {orderedItems.map((orderItem) => (
                        <ProductCard key={orderItem.productId} product={orderItem.product} />
                    ))}
                </Row>
            </Container>
        </div>
    );
};

export default OrderList;