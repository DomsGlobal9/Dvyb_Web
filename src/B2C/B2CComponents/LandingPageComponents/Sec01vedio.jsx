import React, { useEffect, useRef } from 'react';
import B2c_HeroImage from '../../../assets/B2cAssets/LandingPageImges/B2c_HeroImage.png';
import FashionTryOnSection from './Sec02FashionTryOn';

const VideoSection = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      const playPromise = video.play();

      video.muted = true;
      video.loop = true;

      setTimeout(() => {
        if (video.requestFullscreen) {
          video.requestFullscreen().catch(err => {
            console.error('Fullscreen request failed:', err);
          });
        }
      }, 500);

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log('Video is playing');
          })
          .catch(error => {
            console.error('Autoplay error:', error);
          });
      }
    }
  }, []);

  return (
    <div className="relative w-full h-1/2">
      <section className="relative w-full h-1/2">
        <div className="relative w-full h-1/2">
        <img
            src={
              window.innerWidth < 768
                ? 'https://res.cloudinary.com/doiezptnn/image/upload/v1759315075/Rectangle_34624281_e5ipdm.png'
                : B2c_HeroImage
            }
            className="w-full h-auto lg:h-full object-cover"
            alt="Background Image"
          />
          {/* Overlay the FashionTryOnSection */}
          <div className="absolute inset-0 flex items-center justify-center sm:pt-96 md:pt-16 lg:items-start lg:justify-start lg:pl-12 lg:pt-16">
            <FashionTryOnSection />
          </div>
        </div>
      </section>
    </div>
  );
};

export default VideoSection;