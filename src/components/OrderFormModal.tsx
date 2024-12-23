import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useOrder } from './OrderContext';
import { OrderFormData } from '../models/OrderFormDataModel';
import { OrderModel } from '../models/OrderModel';
import DeleteIcon from '@mui/icons-material/Delete';

type OrderFormModalProps = {
    showModal: boolean;
    setShowModal: (show: boolean) => void;
    formData: OrderFormData;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmitOrder: () => void;
};

const OrderFormModal: React.FC<OrderFormModalProps> = ({
    showModal,
    setShowModal,
    formData,
    handleInputChange,
    handleSubmitOrder
}) => {
    const { orderedItems, updateItemQuantity, removeItemFromOrder } = useOrder();

    const subtotal = orderedItems.reduce((total, item) => total + item.total, 0);

    const renderOrderItems = () => (
        orderedItems.map((orderItem: OrderModel) => (
            <div key={orderItem.productId} className="mb-3 d-flex align-items-center">
                <Form.Label className="me-2">{orderItem.product.name}</Form.Label>
                <Form.Control
                    type="number"
                    min="1"
                    value={orderItem.quantity}
                    onChange={(e) => updateItemQuantity(orderItem.productId, parseInt(e.target.value))}
                    style={{ width: '80px' }}
                />
                <Button
                    variant="link"
                    onClick={() => removeItemFromOrder(orderItem.productId)}
                    className="ms-2 p-0"
                    style={{ color: 'gray' }}
                >
                    <DeleteIcon />
                </Button>
            </div>
        ))
    );

    return (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Order Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="client_name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="client_name"
                            value={formData.client_name}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="client_telephone">
                        <Form.Label>Telephone</Form.Label>
                        <Form.Control
                            type="text"
                            name="client_telephone"
                            value={formData.client_telephone}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="client_email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="client_email"
                            value={formData.client_email}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="order_comments">
                        <Form.Label>Comments</Form.Label>
                        <Form.Control
                            type="text"
                            name="order_comments"
                            value={formData.order_comments}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    {renderOrderItems()}
                    <div className="mt-4">
                        <Form.Label>Subtotal:</Form.Label>
                        <div>${subtotal.toFixed(2)}</div>
                    </div>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmitOrder}>
                    Submit Order
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default OrderFormModal;
