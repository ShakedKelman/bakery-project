// src/components/Products.tsx

import React, { useEffect, useState } from 'react';
import { getProducts } from '../../api/products-api';
import ProductCard from './ProductCard';
import { ProductModel } from '../../models/productInterface';
import { Container, Row } from 'react-bootstrap';
import '../../css/navbar.css';



const Products: React.FC = () => {
    const [products, setProducts] = useState<ProductModel[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const fetchedProducts = await getProducts();
                console.log('Fetched products:', fetchedProducts);
                if (Array.isArray(fetchedProducts)) {
                    setProducts(fetchedProducts);
                } else {
                    console.error('getProducts did not return an array:', fetchedProducts);
                    setProducts([]);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
                setProducts([]);
            }
        };

        fetchProducts();
        console.log('Rendering Products component');

    }, []);

    return (
        <Container>
            <Row xs={1} md={2} lg={3} className="g-4">
                {products.map((product) => (
                    <ProductCard key={product.name + product.price} product={product}   />
                ))}
            </Row>
        </Container>
    );
};

export default Products;
