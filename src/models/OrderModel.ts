// models/orderInterface.ts

import { ProductModel } from "./ProductModel";


export interface OrderModel{
    productId: number;
    quantity: number;
    amount: number;
    total: number;
    product: ProductModel; // Add this line

}

