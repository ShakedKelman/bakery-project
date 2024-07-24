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

        // Deduplicate categories manually
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

// export async function sendOrder(orderData: OrderModel): Promise<{ success: boolean; message: string }> {
//     try {
//       const res = await apiCall('order/new', 'POST', {
//         'Content-Type': 'application/json',
//       }, orderData);
  
//       if (res.status) {
//         console.log('Order sent successfully:', res.data);
//         return { success: true, message: 'Order placed successfully' };
//       } else {
//         console.error('Failed to send order:', res.errorMessage);
//         return { success: false, message: res.errorMessage || 'Failed to place order' };
//       }
//     } catch (error) {
//       console.error('Error in sendOrder:', error);
//       return { success: false, message: 'An unexpected error occurred' };
//     }
//   }