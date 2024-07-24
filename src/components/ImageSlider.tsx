import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import '../../../fullstack-project/src/css/homepage.css';

import image1 from '../assets/harim-bakery.webp';
import image2 from '../assets/cake.png';
import image3 from '../assets/pate&paff.avif';
import image4 from '../assets/Cupcakes-homepage.jpg';
import image5 from '../assets/culinarypastry.png';
import image6 from '../assets/estetic-pastry.jpg';

const images = [image1, image2, image3, image4, image5, image6];

const ImageSlider: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        setIsTransitioning(false);
      }, 1000); // Duration of fade effect
    }, 3000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      <Row
        className="align-items-center py-5 mb-5 text-white rounded home-image"
        style={{
          height: '500px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: index === currentImageIndex ? 1 : 0,
              transition: 'opacity 1s ease-in-out',
              zIndex: index === currentImageIndex ? 1 : 0,
            }}
          />
        ))}
        <div 
          className="text-center welcome-text" 
          style={{ 
            position: 'relative', 
            zIndex: 2,
        
          }}
        >
          <h1 className="display-4 fw-bold">Welcome to Shaked's Bakery</h1>
          <p className="lead mb-4">Discover amazing pastries</p>
        </div>
      </Row>
    </Container>
  );
};

export default ImageSlider;