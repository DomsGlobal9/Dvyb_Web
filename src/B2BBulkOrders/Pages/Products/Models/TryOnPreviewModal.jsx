import React, { useState, useEffect } from 'react';
import { ArrowLeft, X } from 'lucide-react';
import hall from '../../../../assets/TryOn/hall.jpg';
import beach from '../../../../assets/TryOn/beach.jpg';
import office from '../../../../assets/TryOn/office.jpg';
import mall from '../../../../assets/TryOn/mall.jpg';

const TryOnPreviewModal = ({ isOpen, onClose, tryOnData }) => {
  // ALL HOOKS MUST BE CALLED FIRST - BEFORE ANY CONDITIONAL RETURNS
  const [tryOnResult, setTryOnResult] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [selectedColor, setSelectedColor] = useState('green');
  const [selectedBackground, setSelectedBackground] = useState('');
  const [backgroundChangedImage, setBackgroundChangedImage] = useState(null);
  const [isChangingBackground, setIsChangingBackground] = useState(false);
  const [bgError, setBgError] = useState('');

  // Function definitions
  const performTryOn = async () => {
    const { modelImage, garmentImage } = tryOnData || {};
    setIsProcessing(true);
    setErrorMsg('');
    setTryOnResult(null);

    try {
      const response = await fetch("/api/tryon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ modelImage, garmentImage }),
      });

      const data = await response.json();

      if (data.output && data.output.length > 0) {
        setTryOnResult(data.output[0]);
      } else {
        setErrorMsg("Try-on failed. Please try again with different images.");
      }
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  // useEffect MUST be called before conditional return
  useEffect(() => {
    const { modelImage, garmentImage } = tryOnData || {};
    if (isOpen && modelImage && garmentImage) {
      performTryOn();
    }
  }, [isOpen, tryOnData]);

  // NOW we can extract data and define constants
  const { modelImage, garmentImage } = tryOnData || {};
  
  // Import your local images here or use URLs
//   const hall = 'https://res.cloudinary.com/doiezptnn/image/upload/v1757747610/hall_example.jpg';
//   const beach = 'https://res.cloudinary.com/doiezptnn/image/upload/v1757747610/beach_example.jpg';
//   const office = 'https://res.cloudinary.com/doiezptnn/image/upload/v1757747610/office_example.jpg';
//   const mall = 'https://res.cloudinary.com/doiezptnn/image/upload/v1757747610/mall_example.jpg';

  const colors = [
    { name: 'green', image: garmentImage },
    { name: 'purple', image: garmentImage },
    { name: 'brown', image: garmentImage },
  ];

  const backgroundOptions = [
    {
      id: 'function-hall',
      name: 'Function Hall',
      description: 'Elegant wedding venue',
      imagePath: hall
    },
    {
      id: 'beach',
      name: 'Beach',
      description: 'Tropical paradise',
      imagePath: beach
    },
    {
      id: 'office',
      name: 'Office',
      description: 'Professional workspace',
      imagePath: office
    },
    {
      id: 'mall',
      name: 'Mall',
      description: 'Shopping center',
      imagePath: mall
    }
  ];

  // NOW conditional return can happen - after ALL hooks
  if (!isOpen) return null;

  const removeBackground = async (imageUrl) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      
      const formData = new FormData();
      formData.append('image_file', blob);
      formData.append('size', 'auto');

      const removeBgResponse = await fetch('https://api.remove.bg/v1.0/removebg', {
        method: 'POST',
        headers: {
          'X-Api-Key': 'LieA99SrSnwMttGh3zPYbCRV',
        },
        body: formData,
      });

      if (!removeBgResponse.ok) {
        throw new Error(`Remove.bg failed: ${removeBgResponse.status}`);
      }

      const removedBgBlob = await removeBgResponse.blob();
      return URL.createObjectURL(removedBgBlob);
    } catch (error) {
      console.error('Background removal failed:', error);
      throw error;
    }
  };

  const changeBackground = async (backgroundType) => {
    if (!tryOnResult) {
      setBgError("No try-on result available for background change");
      return;
    }

    setIsChangingBackground(true);
    setBgError('');
    setSelectedBackground(backgroundType);

    try {
      console.log("Removing background from try-on result...");
      
      const personWithoutBg = await removeBackground(tryOnResult);
      
      console.log("Background removed, now changing to:", backgroundType);

      const selectedBg = backgroundOptions.find(bg => bg.id === backgroundType);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      const bgImg = new window.Image();
      await new Promise((resolve, reject) => {
        bgImg.onload = resolve;
        bgImg.onerror = reject;
        bgImg.crossOrigin = 'anonymous';
        bgImg.src = selectedBg.imagePath;
      });

      const personImg = new window.Image();
      await new Promise((resolve, reject) => {
        personImg.onload = resolve;
        personImg.onerror = reject;
        personImg.crossOrigin = 'anonymous';
        personImg.src = personWithoutBg;
      });

      canvas.width = bgImg.width;
      canvas.height = bgImg.height;

      ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);

      const maxPersonWidth = canvas.width * 0.7;
      const maxPersonHeight = canvas.height * 0.9;
      
      let personWidth = personImg.width;
      let personHeight = personImg.height;
      
      if (personWidth > maxPersonWidth || personHeight > maxPersonHeight) {
        const scale = Math.min(maxPersonWidth / personWidth, maxPersonHeight / personHeight);
        personWidth *= scale;
        personHeight *= scale;
      }
      
      const personX = (canvas.width - personWidth) / 2;
      const personY = canvas.height - personHeight;
      
      ctx.drawImage(personImg, personX, personY, personWidth, personHeight);

      canvas.toBlob((blob) => {
        const finalUrl = URL.createObjectURL(blob);
        setBackgroundChangedImage(finalUrl);
        console.log("Background changed successfully");
      }, 'image/png', 0.95);

    } catch (error) {
      console.error("Background change failed:", error);
      setBgError(error.message || "Failed to change background. Please try again.");
    } finally {
      setIsChangingBackground(false);
    }
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const getCurrentDisplayImage = () => {
    return backgroundChangedImage || tryOnResult;
  };

  return (
    // <div className="fixed inset-0  z-50 flex items-center justify-center">
    //   <div className="max-w-4xl mx-auto bg-white min-h-[90vh] flex rounded-lg  relative">
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 hide-scrollbar">
  <div className="max-w-4xl w-full h-[90vh] mx-auto bg-white flex rounded-lg relative overflow-y-auto">
        {/* Close button */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        {/* Left Side - Try-On Result Image */}
        <div className="w-1/2 p-6">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>

          <div className="aspect-[3/4] rounded-lg overflow-hidden bg-gray-100">
            {isProcessing ? (
              <div className="w-full h-full flex flex-col items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-400 mb-4"></div>
                <p className="text-gray-600 font-medium">Processing try-on...</p>
                <p className="text-sm text-gray-500 mt-1">This may take a few moments</p>
              </div>
            ) : errorMsg ? (
              <div className="w-full h-full flex flex-col items-center justify-center text-center p-4">
                <div className="text-red-500 text-4xl mb-4">⚠️</div>
                <p className="text-red-600 font-medium mb-2">Try-on failed</p>
                <p className="text-sm text-gray-600 mb-4">{errorMsg}</p>
                <button
                  onClick={performTryOn}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Try Again
                </button>
              </div>
            ) : getCurrentDisplayImage() ? (
              <div className="relative w-full h-full">
                <img
                  src={getCurrentDisplayImage()}
                  alt="Try-on result"
                  className="w-full h-full object-cover"
                />
                {isChangingBackground && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mb-2 mx-auto"></div>
                      <p className="text-sm">Changing background...</p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <div className="text-4xl mb-2">👔</div>
                  <p>Try-on result will appear here</p>
                </div>
              </div>
            )}
          </div>

          {tryOnResult && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Change Background</h3>
              
              {bgError && (
                <div className="mb-3 p-2 bg-red-100 border border-red-300 rounded text-red-700 text-sm">
                  {bgError}
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-3">
                {backgroundOptions.map((bg) => (
                  <div
                    key={bg.id}
                    className={`relative rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 ${
                      selectedBackground === bg.id
                        ? 'ring-2 ring-blue-500 shadow-lg'
                        : 'hover:shadow-md'
                    } ${isChangingBackground ? 'pointer-events-none opacity-70' : ''}`}
                    onClick={() => changeBackground(bg.id)}
                  >
                    <img 
                      src={bg.imagePath}
                      alt={bg.name}
                      className="w-full h-16 object-cover"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    
                    <div className="absolute bottom-0 left-0 right-0 p-2">
                      <h4 className="font-medium text-white text-xs">{bg.name}</h4>
                      <p className="text-xs text-white/80">{bg.description}</p>
                    </div>

                    {isChangingBackground && selectedBackground === bg.id && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              {backgroundChangedImage && (
                <p className="text-sm text-green-600 mt-2 text-center">
                  Background changed! Click another option to try different backgrounds.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Right Side - Product Details */}
        <div className="w-1/2 p-6">
          <h1 className="text-lg font-semibold text-gray-800">Raven Hoodie With Black colored Design</h1>
          <p className="text-xl font-bold text-gray-900 mt-2">₹1,910 <span className="text-sm text-gray-500 line-through">₹2,500</span> <span className="text-green-600 ml-1">(25% OFF)</span></p>
          <div className="flex items-center gap-1 mt-1">
            <span className="text-yellow-400">★★★★☆</span>
            <span className="text-sm text-gray-600">4.5</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">M.R.P.₹2,500 <span className="text-green-600">(25% OFF)</span></p>

          <div className="mt-6">
            <p className="text-sm font-medium text-gray-700 mb-2">Colours Available</p>
            <div className="flex gap-2">
              {colors.map((color) => (
                <img
                  key={color.name}
                  src={color.image}
                  alt={`${color.name} variant`}
                  className={`w-16 h-20 rounded-lg cursor-pointer ${selectedColor === color.name ? 'border-2 border-blue-500' : ''}`}
                  onClick={() => handleColorSelect(color.name)}
                />
              ))}
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <button
              className="w-full bg-blue-500 text-white py-2 rounded-full hover:bg-blue-600 flex items-center justify-center gap-2 font-medium"
            >
              Add to cart
            </button>
            <button
              className="w-full bg-blue-700 text-white py-2 rounded-full hover:bg-blue-800 flex items-center justify-center gap-2 font-medium"
            >
              Buy now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TryOnPreviewModal;