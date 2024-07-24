// src/components/Products.tsx

import React, { useEffect, useState } from 'react';
import { getProducts, getCategories } from '../../api/products-api';
import ProductCard from './ProductCard';
import { ProductModel } from '../../models/ProductModel';
import { Container, Row, Button } from 'react-bootstrap';
import '../../css/navbar.css';
import '../../css/category.css';  // Import the custom CSS

const Products: React.FC = () => {
    const [products, setProducts] = useState<ProductModel[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<ProductModel[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

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

        const fetchCategories = async () => {
            try {
                const fetchedCategories = await getCategories();
                console.log('Fetched categories:', fetchedCategories);
                if (Array.isArray(fetchedCategories)) {
                    setCategories(fetchedCategories);
                } else {
                    console.error('getCategories did not return an array:', fetchedCategories);
                    setCategories([]);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
                setCategories([]);
            }
        };

        fetchProducts();
        fetchCategories();
        console.log('Rendering Products component');

    }, []);

    useEffect(() => {
        if (selectedCategory) {
            setFilteredProducts(products.filter(product => product.category === selectedCategory));
        } else {
            setFilteredProducts(products);
        }
    }, [products, selectedCategory]);

    return (
        <div style={{ margin: '20px' }}>
            <Container>
                <div className="category-button-group">
                    <Button
                        className={`category-button ${selectedCategory === null ? 'active' : 'outline'}`}
                        onClick={() => setSelectedCategory(null)}
                    >
                        All
                    </Button>
                    {categories.map(category => (
                        <Button
                            key={category}
                            className={`category-button ${selectedCategory === category ? 'active' : 'outline'}`}
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category}
                        </Button>
                    ))}
                </div>
                <Row xs={1} md={2} lg={3} className="g-4">
                    {filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </Row>
            </Container>
        </div>
    );
};

export default Products;
