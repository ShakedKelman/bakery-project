import React from 'react';
import '../../css/navbar.css';
import '../../css/card.css';
import { ProductModel } from '../../models/ProductModel';

type Props = {
  product: ProductModel;
};

const Product = ({ product }: Props) => {
  const defaultImageUrl = "/fullstack-project/assets/custom-order-numbers-e1438361586475.png";
  // Check if product.imageUrl is undefined or an empty string, and use defaultImageUrl if true
  const imageUrl = product.imageUrl && product.imageUrl.trim() !== "" ? product.imageUrl : defaultImageUrl;

  return (
    <div className="product-card"> {/* Add margin bottom to create space between products */}
      <div className='text-wrapper'>
        <h5 className="card-title">{product.name}</h5>
        <img className="card-img-top" src={imageUrl} alt={product.name} />
        <div className="card-body">
          <p className="card-text">
            <strong>Price: ${product.price}</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Product;
