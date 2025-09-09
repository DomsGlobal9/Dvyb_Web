import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import hall from '../../../assets/TryOn/hall.jpg';
import beach from '../../../assets/TryOn/beach.jpg';
import office from '../../../assets/TryOn/office.jpg';
import mall from '../../../assets/TryOn/mall.jpg';


function TryOnPreview() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { modelImage, garmentImage } = state || {};
  const [tryOnResult, setTryOnResult] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [selectedColor, setSelectedColor] = useState('green');
  
  // New states for background changing
  const [selectedBackground, setSelectedBackground] = useState('');
  const [backgroundChangedImage, setBackgroundChangedImage] = useState(null);
  const [isChangingBackground, setIsChangingBackground] = useState(false);
  const [bgError, setBgError] = useState('');

  const colors = [
    { name: 'green', image: garmentImage },
    { name: 'purple', image: garmentImage },
    { name: 'brown', image: garmentImage },
  ];

  // Background options - you can replace these with actual image URLs
  const backgroundOptions = [
    {
      id: 'function-hall',
      name: 'Function Hall',
      description: 'Elegant wedding venue',
      previewUrl: hall // or use actual image URL
    },
    {
      id: 'beach',
      name: 'Beach',
      description: 'Tropical paradise',
      previewUrl: beach
    },
    {
      id: 'office',
      name: 'Office',
      description: 'Professional workspace',
      previewUrl: office
    },
    {
      id: 'mall',
      name: 'Mall',
      description: 'Shopping center',
      previewUrl: mall
    }
  ];

  useEffect(() => {
    if (modelImage && garmentImage) {
      performTryOn();
    }
  }, [modelImage, garmentImage]);

  const performTryOn = async () => {
    setIsProcessing(true);
    setErrorMsg('');
    setTryOnResult(null);
    // Reset background states when new try-on starts
    setBackgroundChangedImage(null);
    setSelectedBackground('');

    try {
      console.log("Sending to API:", {
        modelImage: modelImage,
        garmentImage: garmentImage,
      });

      const response = await fetch("/api/tryon", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          modelImage: modelImage,
          garmentImage: garmentImage,
        }),
      });

      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers.get('content-type'));

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.error("Non-JSON response:", text);
        throw new Error("Server returned HTML instead of JSON. Check API deployment.");
      }

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch (jsonError) {
          throw new Error(`API error: ${response.status} ${response.statusText}`);
        }
        throw new Error(errorData.error || `API error: ${response.status}`);
      }

      const data = await response.json();
      console.log("API response:", data);

      if (data.output && data.output.length > 0) {
        setTryOnResult(data.output[0]);
      } else {
        setErrorMsg("Try-on failed. Please try again with different images.");
      }
    } catch (error) {
      console.error("Try-on failed:", error);
      setErrorMsg(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  // New function to handle background change
  const changeBackground = async (backgroundType) => {
    if (!tryOnResult) {
      setBgError("No try-on result available for background change");
      return;
    }

    setIsChangingBackground(true);
    setBgError('');
    setSelectedBackground(backgroundType);

    try {
      console.log("Changing background to:", backgroundType);

      // Convert try-on result URL to blob for upload
      const response = await fetch(tryOnResult);
      const blob = await response.blob();
      
      // Create FormData for the background change API
      const formData = new FormData();
      formData.append('image', blob, 'tryon-result.png');
      formData.append('background', backgroundType);

      const bgResponse = await fetch('/api/replace-background', {
        method: 'POST',
        body: formData,
      });

      if (!bgResponse.ok) {
        const errorData = await bgResponse.text();
        throw new Error(`Background change failed: ${bgResponse.status} - ${errorData}`);
      }

      // Get the processed image as blob and create URL
      const processedBlob = await bgResponse.blob();
      const processedImageUrl = URL.createObjectURL(processedBlob);
      
      setBackgroundChangedImage(processedImageUrl);
      console.log("Background changed successfully");

    } catch (error) {
      console.error("Background change failed:", error);
      setBgError(error.message || "Failed to change background. Please try again.");
    } finally {
      setIsChangingBackground(false);
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  // Function to get the current display image (background changed or original try-on result)
  const getCurrentDisplayImage = () => {
    return backgroundChangedImage || tryOnResult;
  };

  return (
    <div className="min-h-screen bg-[#f1f6fa] flex justify-center">
      <div className="max-w-4xl mx-auto bg-white min-h-screen flex">
        {/* Left Side - Try-On Result Image */}
        <div className="w-1/2 p-6">
          <button
            onClick={handleBackClick}
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

          {/* Background Options - Show only when try-on result is available */}
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
                      src={bg.localImage} // Use local image first
                      alt={bg.name}
                      className="w-full h-16 object-cover"
                      onError={(e) => {
                        // Fallback to API endpoint if local image fails
                        if (e.target.src !== bg.previewUrl) {
                          e.target.src = bg.previewUrl;
                        } else {
                          // Final fallback with color background
                          e.target.style.backgroundColor = bg.fallbackColor;
                          e.target.style.display = 'flex';
                          e.target.style.alignItems = 'center';
                          e.target.style.justifyContent = 'center';
                          e.target.innerHTML = `<span style="color: #666; font-size: 12px;">${bg.name}</span>`;
                        }
                      }}
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
}

export default TryOnPreview;