import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Example Data
const stories = [
  {
    id: 1,
    name: "Anjali",
    title: "Bulk Order Made Easily",
    quote:
      "I was thrilled to discover how effortless I can now take advantage of amazing bulk order offers, transforming my online shopping experience completely!",
    image:
      "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 2,
    name: "Arjun",
    title: "Bulk Order Made Events More Special",
    quote:
      "I was excited to find out how easy it is to take advantage of fantastic bulk order deals! I happily ordered in bulk for my sister's wedding, and now my entire family is on board with the same theme!",
    image:
      "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    id: 3,
    name: "Riya",
    title: "Seamless Ordering Experience",
    quote:
      "The bulk order feature saved me so much time! I could order for multiple family functions without any hassle.",
    image:
      "https://randomuser.me/api/portraits/women/68.jpg",
  },
];

const ImpactStories = () => {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);
    
    return () => clearInterval(interval);
  }, [current, isAutoPlaying]);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % stories.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + stories.length) % stories.length);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }
  };

  // Get stories to display based on screen size
  const getStoriesForDisplay = () => {
    if (isMobile) {
      // Mobile: show only current story
      return [stories[current]];
    } else {
      // Desktop: show current and next story (wrap around)
      const nextIndex = (current + 1) % stories.length;
      return [stories[current], stories[nextIndex]];
    }
  };

  const displayedStories = getStoriesForDisplay();

  return (
    <section className="py-8 md:py-10 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-xl md:text-2xl font-semibold text-gray-800 mb-6 md:mb-8">
          "DVYB Impact Stories"
        </h2>
        
        <div className="relative max-w-6xl mx-auto">
          {/* Desktop Navigation Arrows */}
          <button
            onClick={prevSlide}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
            className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-[#637068]  rounded-full shadow-lg hover:bg-gray-700 hover:shadow-xl transition-all duration-200 z-10"
            aria-label="Previous story"
          >
            <FaChevronLeft className="text-white" />
          </button>

          <button
            onClick={nextSlide}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
            className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-[#637068]  text-white rounded-full shadow-lg hover:bg-gray-700 hover:shadow-xl transition-all duration-200 z-10"
            aria-label="Next story"
          >
            <FaChevronRight className="text-white" />
          </button>

          {/* Stories Container */}
          <div 
            className="mx-4 md:mx-16"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            {/* Mobile: Single card layout */}
            <div className="md:hidden">
              <div className="bg-[#CFD9E0] rounded-xl shadow-lg p-6 max-w-sm mx-auto">
                <div className="flex flex-col items-center text-center mb-4">
                  <img
                    src={displayedStories[0].image}
                    alt={displayedStories[0].name}
                    className="w-20 h-20 rounded-full object-cover mb-3"
                  />
                  <h3 className="font-semibold text-gray-800 text-lg mb-2">
                    {displayedStories[0].title}
                  </h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  "{displayedStories[0].quote}"
                </p>
                <p className="font-semibold text-black text-center">
                  – {displayedStories[0].name}
                </p>
              </div>
            </div>

            {/* Desktop: Two card layout */}
            <div className="hidden md:flex gap-6 justify-center">
              {displayedStories.map((story) => (
                <div
                  key={story.id}
                  className="flex-1 max-w-md bg-[#CFD9E0] rounded-xl shadow-lg p-6 flex flex-col hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={story.image}
                      alt={story.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <h3 className="font-semibold text-gray-800 text-lg">
                      {story.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-4">
                    "{story.quote}"
                  </p>
                  <p className="font-semibold text-black ">– {story.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Navigation Buttons */}
          <div className="flex md:hidden justify-center gap-4 mt-6">
            <button
              onClick={prevSlide}
              className="p-3 bg-white rounded-full shadow-lg active:scale-95 transition-transform"
              aria-label="Previous story"
            >
              <FaChevronLeft className="text-gray-600" />
            </button>
            <button
              onClick={nextSlide}
              className="p-3 bg-white rounded-full shadow-lg active:scale-95 transition-transform"
              aria-label="Next story"
            >
              <FaChevronRight className="text-gray-600" />
            </button>
          </div>

          {/* Dot Indicators */}
          {/* <div className="flex justify-center gap-2 mt-6">
            {stories.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  current === index
                    ? "bg-blue-900 w-8"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to story ${index + 1}`}
              />
            ))}
          </div> */}

          {/* Auto-play indicator */}
          <div className="hidden md:flex justify-center mt-4">
            {/* <div className="flex items-center gap-2 text-xs text-gray-500">
              <div className={`w-2 h-2 rounded-full ${isAutoPlaying ? 'bg-blue-900 animate-pulse' : 'bg-gray-300'}`}></div>
              <span>{isAutoPlaying ? 'Auto-playing' : 'Paused'}</span>
            </div> */}
          </div>
        </div> 
      </div>
    </section>
  );
};

export default ImpactStories;