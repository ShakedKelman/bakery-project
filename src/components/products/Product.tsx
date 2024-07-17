import React from 'react';
import { ProductModel } from '../../models/productInterface';
import '../../css/navbar.css';

type Props = {
  product: ProductModel;
};

const Product = ({ product }: Props) => {
  return (
    <div className="product-card"> {/* Add margin bottom to create space between products */}
      <div className="card-header">
        <h5 className="card-title">{product.name}</h5>
        <img className="card-img-top" src={product.imageUrl} alt={product.name} />
      </div>
      <div className="card-body">
        <p className="card-text">
          <strong>Price: ${product.price}</strong>
        </p>
      </div>
    </div>
  );
};


export default Product;
