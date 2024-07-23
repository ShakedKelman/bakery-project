import React from 'react';
import './App.css';
import NavbarWeb from './components/navigation/NavbarWeb';
import ContactUs from './components/ContactForm';
import { Router } from 'react-router-dom';
import SiteRoutes from './components/navigation/SiteRoutes';
import { ProductModel } from './models/productInterface';
import ProductCard from './components/products/ProductCard';
import { OrderModel } from './models/OrderModel';
import '../src/css/card.css';
import { OrderProvider } from './components/OrderContext';
import Products from './components/products/Products';



function App() {
    const orderedItems: OrderModel[] = []; // Replace with actual logic to fetch ordered items

    return (
        <OrderProvider>
            <div className="App">
                <NavbarWeb  />
                <SiteRoutes />
            </div>
        </OrderProvider>
    );
}

export default App;
