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
                    // Filter out empty or null categories
                    setCategories(fetchedCategories.filter(category => category && category.trim() !== ''));
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
        if (selectedCategory && categories.includes(selectedCategory)) {
            // Filter products only if a valid category is selected
            setFilteredProducts(products.filter(product => product.category === selectedCategory));
        } else {
            // Show all products if no valid category is selected
            setFilteredProducts(products);
        }
    }, [products, selectedCategory, categories]);

    return (
        <div style={{ margin: '20px' }}>
            <Container>
                <div className="category-button-group">
                    {/* "All" Button */}
                    <Button
                        className={`category-button ${selectedCategory === null ? 'active' : 'outline'}`}
                        onClick={() => setSelectedCategory(null)}
                    >
                        All
                    </Button>
                    {/* Render Category Buttons, excluding empty categories */}
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
                {/* Display Products */}
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
