// src/api/products-api.ts

import apiCall from './apiCall';
import { ProductModel } from '../models/ProductModel';
import { OrderModel } from '../models/OrderModel';
import axios from 'axios';

export async function getProducts(): Promise<ProductModel[]> {
    const storeId = 83;
    try {
        const res = await apiCall(`store?storeid=${storeId}`, "GET");
        if (res.status) {
            console.log('API response data:', res.data);
            if (res.data && Array.isArray(res.data.products)) {
                return res.data.products;
            } else {
                console.error("API returned data does not contain a products array:", res.data);
                return [];
            }
        } else {
            console.error("Failed to fetch products:", res.errorMessage);
            return [];
        }
    } catch (error) {
        console.error("Error in getProducts:", error);
        return [];
    }
}

// Function to get unique categories
export async function getCategories(): Promise<string[]> {
    try {
        const products = await getProducts();
        const categories = products.map(product => product.category);

        const uniqueCategories: string[] = [];
        for (const category of categories) {
            if (!uniqueCategories.includes(category)) {
                uniqueCategories.push(category);
            }
        }

        return uniqueCategories;
    } catch (error) {
        console.error("Error in getCategories:", error);
        return [];
    }
}

export async function submitOrder(orderData: { items: OrderModel[], totalAmount: number }, formData: any) {
    try {
        console.log('Order Items:', orderData.items);

        const orderItems = orderData.items.reduce((acc, item) => {
            acc[`${item.productMKT}`] = item.quantity;
            return acc;
        }, {} as Record<string, number>);

        const params = {
            order: orderItems,
            store_id: 83, // Ensure this is correct
            client_name: formData.client_name,
            client_telephone: formData.client_telephone,
            client_email: formData.client_email,
            order_comments: formData.order_comments,
        };

        console.log('Submitting order with data:', params);

        const response = await axios.post('https://genericgs.com/api/v1/order/new', params, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                'Authorization': `Bearer your-auth-token`, // Add authorization header if required
            }
        });

        console.log('Order submitted successfully:', response.data);
        alert('Order submitted successfully!');
    } catch (error: any) {
        const errorText = error.response?.data?.message || error.message || 'Unknown error';
        console.error('Failed to submit order:', error.response?.status, errorText);
        alert(`Failed to submit order: ${errorText}`);
    }
}


export async function sendContactMessage(params: {
    store_id: number,
    name: string,
    telephone: string,
    email: string,
    content: string,
}): Promise<void> {
    try {
        const options = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(params),
        };

        const response = await fetch("https://genericgs.com/api/v1/contact", options);
        
        if (!response.ok) {
            const errorData = await response.json();
            console.error("Failed to send contact message:", errorData);
            alert(`Failed to send contact message: ${errorData.message}`);
        } else {
            alert('Contact message sent successfully!');
        }
    } catch (error) {
        console.error('An error occurred while sending the contact message:', error);
        alert('An error occurred while sending the contact message.');
    }
}