import React, { useState } from 'react';
import { useOrder } from './OrderContext';
import { submitOrder } from '../api/products-api';
import { OrderFormData } from '../models/OrderFormDataModel';
import OrderFormModal from './OrderFormModal';
import { useNavigate } from 'react-router-dom';

type Props = {
    showModal: boolean;
    setShowModal: (show: boolean) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
}

const OrderForm: React.FC<Props> = ({ showModal, setShowModal, setLoading, setError }) => {
    const { orderedItems, calculateTotalAmount, resetOrder } = useOrder();
    const navigate = useNavigate();

    const [formData, setFormData] = useState<OrderFormData>({
        client_name: '',
        client_telephone: '',
        client_email: '',
        order_comments: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmitOrder = async () => {
        setLoading(true);
        setError(null);

        const totalAmount = calculateTotalAmount();
        const orderData = {
            items: orderedItems,
            totalAmount: totalAmount
        };

        try {
            await submitOrder(orderData, formData);
            setShowModal(false);
            resetOrder(); // Reset the order context
            alert(`Order submitted successfully! Total Amount: $${totalAmount}`);
            navigate('/home'); 

        } catch (err) {
            setError('An error occurred while submitting the order.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <OrderFormModal
            showModal={showModal}
            setShowModal={setShowModal}
            formData={formData}
            handleInputChange={handleInputChange}
            handleSubmitOrder={handleSubmitOrder}
        />
    );
}

export default OrderForm;