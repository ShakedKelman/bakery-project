// src/api/products-api.ts

import apiCall from './apiCall';
import { ProductModel } from '../models/ProductModel';
import { OrderModel } from '../models/OrderModel';

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


export async function submitOrder(orderData: { items: OrderModel[], totalAmount: number }) {
    try {
        // Transform orderData to the expected format
        const orderItems = orderData.items.reduce((acc, item) => {
            acc[`mkt${item.productId}`] = item.quantity;
            return acc;
        }, {} as Record<string, number>);

        const params = {
            order: orderItems,
            store_id: 83, // Replace this with the actual store ID
            client_name: 'John Doe', // Replace with actual client name
            client_telephone: '1234567890', // Replace with actual client telephone
            client_email: 'john.doe@example.com', // Replace with actual client email
            order_comments: 'No comments', // Replace with actual comments if any
        };

        console.log('Submitting order with data:', params); // Log the payload

        const token = 'your-auth-token'; // Replace with your actual token if needed

        const response = await apiCall('order/new', 'POST', {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Add authorization header if required
        }, params);

        if (response.status) {
            alert('Order submitted successfully!');
        } else {
            console.error('Failed to submit order:', response.errorMessage, response.data); // Log the error details
            alert(`Failed to submit order: ${response.errorMessage}`);
        }
    } catch (error) {
        console.error('An error occurred while submitting the order:', error); // Log the error details
        alert('An error occurred while submitting the order.');
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