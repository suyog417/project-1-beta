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
  const isTransitioning = useRef(false);

  useEffect(() => {
    const updateNextImageIndex = (currentIndex: number) => {
        setNextImageIndex((currentIndex + 1) % imageUrls.length);
    };

    const startCarousel = () => {
        if (isTransitioning.current) return;
        isTransitioning.current = true;

        setTransition('slide-out');

        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
          setCurrentImageIndex((prevIndex) => {
              const newIndex = (prevIndex + 1) % imageUrls.length;
              updateNextImageIndex(newIndex);
              return newIndex;
          });
          setTransition('slide-in');

          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }
          timeoutRef.current = setTimeout(() => {
            setTransition('none');
            isTransitioning.current = false;
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
      return 'translate-x-[-100%] transition-transform duration-500 absolute';
    } else if (transition === 'slide-in' && index === nextImageIndex) {
      return 'translate-x-[0%] transition-transform duration-500 absolute';
    } else if (index === currentImageIndex && transition === 'none') {
        return 'translate-x-[0%] transition-transform duration-500 absolute';
    }
    else if(index === nextImageIndex && transition === 'none') {
      return 'translate-x-[100%] transition-transform duration-500 absolute';
    }
    return 'translate-x-[0%] absolute';
  };

  const getZIndex = (index: number) => {
    if(index === currentImageIndex) return "z-[10]";
    return "z-[5]"
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
        
        <Image
          key={`current-${currentImageIndex}`}
          src={imageUrls[currentImageIndex]}
          alt={alt}
          width={4000}
          height={2400}
          className={`object-cover rounded-lg w-full h-full ${getTransitionClasses(currentImageIndex)} ${getZIndex(currentImageIndex)}`}
          style={{ aspectRatio: "500 / 300", objectFit: 'cover' }}
        />
        <Image
          key={`next-${nextImageIndex}`}
          src={imageUrls[nextImageIndex]}
          alt={alt}
          width={4000}
          height={2400}
          className={`object-cover rounded-lg w-full h-full ${getTransitionClasses(nextImageIndex)} ${getZIndex(nextImageIndex)}`}
          style={{ aspectRatio: "500 / 300", objectFit: 'cover' }}
        />
      </div>
    </div>
  );
};

export default TeamImageCarousel;
