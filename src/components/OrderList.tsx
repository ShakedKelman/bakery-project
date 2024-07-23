import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { useOrder } from './OrderContext';
import ProductCard from './products/ProductCard';

const OrderList: React.FC = () => {
  const { orderedItems } = useOrder();

  return (
    <Container>
      <h2>Order List</h2>
      <Row xs={1} md={2} lg={3} className="g-4">
        {orderedItems.map((orderItem) => (
          <ProductCard key={orderItem.productId} product={orderItem.product} />
        ))}
      </Row>
    </Container>
  );
};

export default OrderList;
