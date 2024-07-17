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



function App() {
    const orderedItems: OrderModel[] = []; // Replace with actual logic to fetch ordered items

    return (
        <div className="App">

            <NavbarWeb orderedItems={orderedItems} />
            <SiteRoutes />
        </div>
    );
}

export default App;
