import React, { useState } from 'react';
import '../../css/navbar.css';
import '../../css/card.css';
import { ProductModel } from '../../models/ProductModel';
import defaultImage from '../../assets/lets-bake.jpg';

type Props = {
  product: ProductModel & { images?: { url: string }[] };
};

const Product = ({ product }: Props) => {
  const defaultImageUrl = defaultImage;
  const [imageError, setImageError] = useState(false);

  const initialImageUrl = (product.images && product.images.length > 0)
    ? product.images[0].url
    : defaultImageUrl;

  const handleImageError = () => {
    setImageError(true);
  };

  const backgroundImageUrl = imageError ? defaultImageUrl : initialImageUrl;

  return (
    <div 
      className="product-card"
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '300px', // Adjust as needed
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '20px',
        borderRadius: '10px',
        color: 'white',
        textShadow: '2px 2px 4px rgba(0,0,0,0.7)'
      }}
    >
      <h5 className="card-title">{product.name}</h5>
      <div className="card-body">
        <p className="card-text">
          <strong> ${product.price}</strong>
        </p>
      </div>
      <img 
        src={backgroundImageUrl} 
        alt={product.name}
        onError={handleImageError}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default Product;