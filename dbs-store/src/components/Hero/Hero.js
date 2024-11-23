import React, { useState, useEffect } from 'react';
import './Hero.css';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import kids_banner from '../assets/images/banners/kids_banner.png';
import men_banner from '../assets/images/banners/men_banner.png';
import women_banner from '../assets/images/banners/women_banner.png';

// Image banner object
const bannerImages = {
  women_banner: [women_banner, women_banner, women_banner],
  men_banner: [men_banner, men_banner, men_banner],
  kids_banner: [kids_banner, kids_banner, kids_banner],
};

const Hero = (props) => {
  const [currentBannerImages, setCurrentBannerImages] = useState([]);

  // Update the banner based on the selected category
  useEffect(() => {
    if (props.banner && bannerImages[props.banner]) {
      setCurrentBannerImages(bannerImages[props.banner]);
    } else {
      setCurrentBannerImages([]); // Default to an empty array if no match
    }
  }, [props.banner]);

  return (
    <Carousel className="hero-carousal">
      {currentBannerImages.length > 0 ? (
        currentBannerImages.map((image, index) => (
          <Carousel.Item key={index}>
            <img className="d-block w-100" src={image} alt={`Slide ${index + 1}`} />
            <Carousel.Caption>
              <h3>{`Exclusive ${props.banner.replace('_', ' ')}`}</h3>
              <p>Discover the latest collections for everyone!</p>
              <button className="btn btn-primary">Shop Now</button>
            </Carousel.Caption>
          </Carousel.Item>
        ))
      ) : (
        <Carousel.Item>
          <img className="d-block w-100" src={women_banner} alt="Default slide" />
          <Carousel.Caption>
            <h3>Discover More</h3>
            <p>Check out the latest trends.</p>
            <button className="btn btn-primary">Shop Now</button>
          </Carousel.Caption>
        </Carousel.Item>
      )}
    </Carousel>
  );
};

export default Hero;
