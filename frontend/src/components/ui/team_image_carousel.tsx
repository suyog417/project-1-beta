import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface TeamImageCarouselProps {
  imageUrls: string[];
  alt: string;
}

const TeamImageCarousel: React.FC<TeamImageCarouselProps> = ({ imageUrls, alt }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsFading(true); // Start fade out
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
        setIsFading(false); // Start fade in after image change
      }, 1000); // Match the transition duration
    }, 7000); // Change image every 5 seconds

    return () => clearInterval(intervalId); // Clear interval on unmount
  }, [imageUrls.length]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <Image
        key={currentImageIndex} // Add key to trigger transition
        src={imageUrls[currentImageIndex]}
        alt={alt}
        width={4000} // Adjust as needed
        height={2400} // Adjust as needed
        className={`object-cover rounded-lg w-full h-full ${isFading ? 'opacity-0 transition-opacity duration-500' : 'opacity-100 transition-opacity duration-500'}`}
        style={{
          aspectRatio: "500 / 300",
          objectFit: 'cover',
          transition: 'opacity 0.5s ease-in-out', // Smooth transition
        }}
      />
    </div>
  );
};

export default TeamImageCarousel;