import React, { useState, useEffect } from 'react';
import '../Css/Carousel.css';
import fd1 from '../images/pexels-magda-ehlers-pexels-4267963.jpg'
import fd2 from '../images/pexels-vitaliy-haiduk-326720599-17308455.jpg'
import fd8 from '../images/pexels-vitaliy-haiduk-326720599-17308457.jpg'
import fd7 from '../images/pexels-vitaliy-haiduk-326720599-17308495.jpg'
import fd6 from '../images/pexels-vitaliy-haiduk-326720599-17308513.jpg'
import fd5 from '../images/pexels-vitaliy-haiduk-326720599-17308531.jpg'
import fd4 from '../images/pexels-vitaliy-haiduk-326720599-17308533.jpg'
import fd3 from '../images/pexels-vitaliy-haiduk-326720599-17308569.jpg'

function Carousel() {
  const images = [
    {
      src: fd4,
      alt: 'Pizza',
      caption: 'A slice of heaven with melted cheese, savory toppings, and a crispy crust – the ultimate pizza experience!',
    },
    {
      src: fd2,
      alt: 'Samosa',
      caption: 'Crispy on the outside, perfectly spiced on the inside – a samosa is a burst of flavor in every bite!',
    },
    {
      src: fd3,
      alt: 'Trending Food',
      caption: 'The hottest food trend right now, packed with flavors and textures that are sure to excite your taste buds!',
    },
    {
      src: fd1,
      alt: 'Pizza Again',
      caption: 'Can’t get enough of this golden, cheesy goodness – a second helping of pizza that never disappoints!',
    },
    {
      src: fd5,
      alt: 'Pizza',
      caption: 'A slice of heaven with melted cheese, savory toppings, and a crispy crust – the ultimate pizza experience!',
    },
    {
      src: fd6,
      alt: 'Samosa',
      caption: 'Crispy on the outside, perfectly spiced on the inside – a samosa is a burst of flavor in every bite!',
    },
    {
      src: fd7,
      alt: 'Trending Food',
      caption: 'The hottest food trend right now, packed with flavors and textures that are sure to excite your taste buds!',
    },
    {
      src: fd8,
      alt: 'Pizza Again',
      caption: 'Can’t get enough of this golden, cheesy goodness – a second helping of pizza that never disappoints!',
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationClass, setAnimationClass] = useState('');

  useEffect(() => {
    setAnimationClass(''); // Reset animation class
    const timer = setTimeout(() => {
      setAnimationClass('fadeInUp'); // Reapply animation class after 50ms
    }, 50); // Short delay to reset the animation
    return () => clearTimeout(timer); // Clean up timeout
  }, [currentIndex]); // Run this effect every time `currentIndex` changes

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="carousel">
      <button className="carousel-button prev" onClick={handlePrev}>
        &lt;
      </button>
      <div className="carousel-track" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {images.map((image, index) => (
          <div className="carousel-slide" key={index}>
            <img src={image.src} alt={image.alt} />
            <p className={`caption ${animationClass}`}>{image.caption}</p>
          </div>
        ))}
      </div>
      <button className="carousel-button next" onClick={handleNext}>
        &gt;
      </button>
    </div>
  );
}

export default Carousel;
