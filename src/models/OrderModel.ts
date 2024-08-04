// models/orderInterface.ts

import { ProductModel } from "./ProductModel";


export interface OrderModel{
    productId: number;
    productMKT: string;
    quantity: number;
    amount: number;
    total: number;
    product: ProductModel; 

}

