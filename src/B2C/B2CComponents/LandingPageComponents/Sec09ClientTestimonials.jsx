import React, { useState, useEffect } from 'react';
import { Star, Share2, ChevronLeft, ChevronRight } from 'lucide-react';
import Priya from '../../../assets/B2cAssets/LandingPageImges/Priya.png'

import Rajesh from '../../../assets/B2cAssets/LandingPageImges/Rajesh.jpg'
import Anitha from '../../../assets/B2cAssets/LandingPageImges/anitha.jpg'

const ClientTestimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: "PRIYA SHARMA",
      position: "CHIEF EXECUTIVE, LUXURY BRAND",
      location: "MUMBAI",
      image: Priya,
      rating: 5,
      category: "EXECUTIVE COLLECTION",
      quote: "The precision is extraordinary. 3D fitting algorithms captured my exact measurements with surgical accuracy. No alterations needed whatsoever.",
      responseTime: "72 Hours",
      accuracy: "99.7% Accuracy"
    },
    {
      id: 2,
      name: "RAJESH KUMAR",
      position: "CREATIVE DIRECTOR, TECH STARTUP",
      location: "BANGALORE",
      image: Rajesh,
      rating: 5,
      category: "PREMIUM COLLECTION",
      quote: "Revolutionary experience! The AI-powered fitting technology eliminated all guesswork. Perfect fit delivered exactly as promised.",
      responseTime: "48 Hours",
      accuracy: "99.9% Accuracy"
    },
    {
      id: 3,
      name: "ANITA MENON",
      position: "FASHION ENTREPRENEUR",
      location: "DELHI",
      image: Anitha,
      rating: 5,
      category: "DESIGNER COLLECTION",
      quote: "Absolutely phenomenal precision. The virtual measurements were more accurate than traditional tailoring. Game-changing technology.",
      responseTime: "36 Hours",
      accuracy: "99.8% Accuracy"
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => 
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const goToTestimonial = (index) => {
    setCurrentTestimonial(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 8 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const nextTestimonial = () => {
    const next = currentTestimonial === testimonials.length - 1 ? 0 : currentTestimonial + 1;
    goToTestimonial(next);
  };

  const prevTestimonial = () => {
    const prev = currentTestimonial === 0 ? testimonials.length - 1 : currentTestimonial - 1;
    goToTestimonial(prev);
  };

  const currentData = testimonials[currentTestimonial];

  return (
    <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Stats Section */}

{/*        
        <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-4">
            <span className="uppercase tracking-wider">CLIENT INTELLIGENCE</span>
        <div className="text-center ">
          
          <div className=" mb-2 border flex p-5">
               <div className="w-1 h-1   bg-gray-400 rounded-full"></div>
               <div>

            <h2 className='text-5xl sm:text-6xl md:text-5xl font-bold text-gray-900'>247,907</h2>
            
            <p> PRECISION FITTINGS COMPLETED</p>
               </div>
          </div>
          <div className="text-xs text-start -ml-12 text-gray-500">
            Be part of the fashion community
            </div>
          </div>
        </div> */}


        {/* Main Testimonials Section */}
        <div className="text-center   mt-14 mb-12">
          <h3 className='text-[#98C0D9] text-center  font-semibold'>HEAR OUR VOICES</h3>
          <h2 className="text-3xl mt-4 sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          WHAT OUR USER SAYS
          </h2>
          <p className="text-lg text-gray-600">
         hear it straight from our customers!
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="relative w-auto   ">
          <div className="bg-white rounded-2xl  lg:h-80  shadow-xl overflow-hidden">
            <div className="flex flex-col justify-center lg:flex-row">
              {/* Left Side - Profile */}
              <div className="  text-white p-8 flex flex-col items-center justify-center">
                <div className="relative mb-6">
                  <div className="w-24 h-24  overflow-hidden bg-gray-700">
                    <img 
                      src={currentData.image} 
                      alt={currentData.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-black text-white text-xs px-2 py-1  uppercase font-semibold">
                    VERIFIED
                  </div>
                </div>
                <h3 className="text-lg text-black font-semibold mb-1">{currentData.name}</h3>
                <p className="text-sm text-gray-600 text-center mb-4">
                  {currentData.position}<br />
                  
                </p>
                <p className='text-xs text-gray-600 text-center -pt-5'>{currentData.location}</p>
              </div>

              {/* Right Side - Content */}
              <div className="lg:w-2/3 p-8">
                {/* Rating and Category */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-3">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className="w-5 h-5 fill-black text-black" 
                        />
                      ))}
                    </div>
                    <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                      {currentData.category}
                    </span>
                  </div>

                </div>

                {/* Quote */}
                <blockquote className="text-lg text-gray-800 mb-8 leading-relaxed">
                  "{currentData.quote}"
                </blockquote>
             <div className='border-t border-b-gray-300 w-full'></div>
                {/* Stats */}
             <div className='flex justify-between'>
                <div className="flex flex-col mt-7 sm:flex-row gap-6">
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                      RESPONSE TIME
                    </div>
                    <div className="text-lg font-bold text-gray-900">
                      {currentData.responseTime}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-start text-gray-500 uppercase tracking-wide mb-1">
                      RESULT
                    </div>
                    <div className="text-lg font-bold text-[#7DBBD1]">
                      {currentData.accuracy}
                    </div>
                    
                  </div>
                </div>

                  {/* <div className=''> */}
                                      <button className="flex items-center mt-5 gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors">
                    <span className="uppercase tracking-wide">Share</span>
                    <Share2 className="w-4 h-4" />
                  </button>
                  {/* </div> */}
             </div>

              </div>
            </div>
            
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-10"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-10"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8  gap-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`w-3 h-3  transition-colors ${
                index === currentTestimonial 
                  ? 'bg-gray-900' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))} 
        </div>

        {/* Auto-play indicator */}
        <div className="text-center mt-4">
          <div className="text-xs text-gray-500">
            {/* {isAutoPlaying ? 'Auto-rotating every 4 seconds' : 'Manual control active'} */}
          </div>
        </div>
      </div>

    </div>
  );
};

export default ClientTestimonials;