import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface TeamImageCarouselProps {
  imageUrls: string[];
  alt: string;
}

const TeamImageCarousel: React.FC<TeamImageCarouselProps> = ({ imageUrls, alt }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [nextImageIndex, setNextImageIndex] = useState(1);
  const [transition, setTransition] = useState<'slide-in' | 'slide-out' | 'none'>('none');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const startCarousel = () => {
      setTransition('slide-out');
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
        setNextImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
        setTransition('slide-in');
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
          setTransition('none');
        }, 500); // Transition duration
      }, 500); // Transition duration
    };

    const intervalId = setInterval(startCarousel, 7000); // Change image every 7 seconds

    return () => {
      clearInterval(intervalId);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [imageUrls.length]);

  const getTransitionClasses = (index: number) => {
    if (transition === 'slide-out' && index === currentImageIndex) {
      return 'translate-x-full transition-transform duration-500';
    } else if (transition === 'slide-in' && index === nextImageIndex) {
      return '-translate-x-full transition-transform duration-500';
    } else if (index === currentImageIndex && transition === 'none') {
        return 'translate-x-0 transition-transform duration-500';
    }
    return 'translate-x-0';
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', width: '200%', height: '100%', display: 'flex' }}>
        <Image
          key={`current-${currentImageIndex}`}
          src={imageUrls[currentImageIndex]}
          alt={alt}
          width={4000}
          height={2400}
          className={`object-cover rounded-lg w-1/2 h-full ${getTransitionClasses(currentImageIndex)}`}
          style={{ aspectRatio: "500 / 300", objectFit: 'cover' }}
        />
        <Image
          key={`next-${nextImageIndex}`}
          src={imageUrls[nextImageIndex]}
          alt={alt}
          width={4000}
          height={2400}
          className={`object-cover rounded-lg w-1/2 h-full ${getTransitionClasses(nextImageIndex)}`}
          style={{ aspectRatio: "500 / 300", objectFit: 'cover' }}
        />
      </div>
    </div>
  );
};

export default TeamImageCarousel;