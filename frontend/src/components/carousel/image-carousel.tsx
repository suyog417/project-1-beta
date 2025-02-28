import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { LineWave } from 'react-loader-spinner';

      const ImageCarousel = () => {
        const [images, setImages] = useState<string[]>([]);
        const [currentImageIndex, setCurrentImageIndex] = useState(0);

        useEffect(() => {
          const fetchImages = async () => {
            try {
              const response = await fetch(
                `https://api.unsplash.com/photos/random?client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}&count=20&query=finance`
              );
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
              const data = await response.json();
              const imageUrls = data.map((item: any) => item.urls.regular);
              setImages(imageUrls);
            } catch (error) {
              console.error("Could not fetch images:", error);
              // Fallback images in case the API fails
              setImages([
                '/assets/Asset_3.webp',
              ]);
            }
          };

          fetchImages();
        }, []);

        useEffect(() => {
          const intervalId = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
          }, 5000); // Change image every 5 seconds

          return () => clearInterval(intervalId); // Clear interval on unmount
        }, [images.length]);

        if (images.length === 0) {
          return <div className="items-center flex justify-center align-middle h-full">
            <LineWave
              visible={true}
              height="100"
              width="100"
              color="#0073A6"
              ariaLabel="line-wave-loading"
              wrapperStyle={{}}
              wrapperClass=""
              firstLineColor=""
              middleLineColor=""
              lastLineColor=""
            />
          </div>
        }

        return (
          <Image
            src={images[currentImageIndex]}
            alt="Carousel Image"
            width={700}
            height={400}
            className="object-cover w-full rounded-lg opacity-30"
            style={{
              aspectRatio: "700 / 400",
              objectFit: "cover",
            }}
          />
        );
      };

      export default ImageCarousel;