
import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

function TryOnPreview() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { modelImage, garmentImage } = state || {};
  const [tryOnResult, setTryOnResult] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [selectedColor, setSelectedColor] = useState('green');

  const colors = [
    { name: 'green', image: garmentImage },
    { name: 'purple', image: garmentImage },
    { name: 'brown', image: garmentImage },
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

    try {
      console.log("Sending to API:", {
        modelImage: modelImage,
        garmentImage: garmentImage,
      });

      // Use relative path for API route - works with both development and production
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

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `API error: ${response.status}`);
      }

      const data = await response.json();

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

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
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
            ) : tryOnResult ? (
              <img
                src={tryOnResult}
                alt="Try-on result"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <div className="text-4xl mb-2">👔</div>
                  <p>Try-on result will appear here</p>
                </div>
              </div>
            )}
          </div>
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


// import React, { useState, useEffect } from 'react';
// import { ArrowLeft } from 'lucide-react';
// import { useLocation, useNavigate } from 'react-router-dom';

// function TryOnPreview() {
//   const { state } = useLocation();
//   const navigate = useNavigate();
//   const { modelImage, garmentImage } = state || {};
//   const [tryOnResult, setTryOnResult] = useState(null);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [errorMsg, setErrorMsg] = useState('');
//   const [selectedColor, setSelectedColor] = useState('green');

//   const colors = [
//     { name: 'green', image: garmentImage },
//     { name: 'purple', image: garmentImage },
//     { name: 'brown', image: garmentImage },
//   ];

//   useEffect(() => {
//     if (modelImage && garmentImage) {
//       performTryOn();
//     }
//   }, [modelImage, garmentImage]);

//   const performTryOn = async () => {
//     setIsProcessing(true);
//     setErrorMsg('');
//     setTryOnResult(null);

//     try {
//       console.log("Sending to backend:", {
//         modelImage: modelImage,
//         garmentImage: garmentImage,
//       });

//       const response = await fetch("http://localhost:5000/api/tryon", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           modelImage: modelImage,
//           garmentImage: garmentImage,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error(`Backend error: ${response.status}`);
//       }

//       const data = await response.json();

//       if (data.output && data.output.length > 0) {
//         setTryOnResult(data.output[0]);
//       } else {
//         setErrorMsg("Try-on failed. Please try again with different images.");
//       }
//     } catch (error) {
//       console.error("Try-on failed:", error);
//       setErrorMsg(error.message || "Something went wrong. Please try again.");
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   const handleBackClick = () => {
//     navigate(-1);
//   };

//   const handleColorSelect = (color) => {
//     setSelectedColor(color);
//   };

//   return (
//     <div className="min-h-screen bg-[#f1f6fa] flex justify-center">
//       <div className="max-w-4xl mx-auto bg-white min-h-screen flex">
//         {/* Left Side - Try-On Result Image */}
//         <div className="w-1/2 p-6">
//           <button
//             onClick={handleBackClick}
//             className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
//           >
//             <ArrowLeft size={20} />
//             <span>Back</span>
//           </button>

//           <div className="aspect-[3/4] rounded-lg overflow-hidden bg-gray-100">
//             {isProcessing ? (
//               <div className="w-full h-full flex flex-col items-center justify-center">
//                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-400 mb-4"></div>
//                 <p className="text-gray-600 font-medium">Processing try-on...</p>
//                 <p className="text-sm text-gray-500 mt-1">This may take a few moments</p>
//               </div>
//             ) : errorMsg ? (
//               <div className="w-full h-full flex flex-col items-center justify-center text-center p-4">
//                 <div className="text-red-500 text-4xl mb-4">⚠️</div>
//                 <p className="text-red-600 font-medium mb-2">Try-on failed</p>
//                 <p className="text-sm text-gray-600 mb-4">{errorMsg}</p>
//               </div>
//             ) : tryOnResult ? (
//               <img
//                 src={tryOnResult}
//                 alt="Try-on result"
//                 className="w-full h-full object-cover"
//               />
//             ) : (
//               <div className="w-full h-full flex items-center justify-center text-gray-400">
//                 <div className="text-center">
//                   <div className="text-4xl mb-2">👔</div>
//                   <p>Try-on result will appear here</p>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Right Side - Product Details */}
//         <div className="w-1/2 p-6">
//           <h1 className="text-lg font-semibold text-gray-800">Raven Hoodie With Black colored Design</h1>
//           <p className="text-xl font-bold text-gray-900 mt-2">₹1,910 <span className="text-sm text-gray-500 line-through">₹2,500</span> <span className="text-green-600 ml-1">(25% OFF)</span></p>
//           <div className="flex items-center gap-1 mt-1">
//             <span className="text-yellow-400">★★★★☆</span>
//             <span className="text-sm text-gray-600">4.5</span>
//           </div>
//           <p className="text-xs text-gray-500 mt-1">M.R.P.₹2,500 <span className="text-green-600">(25% OFF)</span></p>

//           <div className="mt-6">
//             <p className="text-sm font-medium text-gray-700 mb-2">Colours Available</p>
//             <div className="flex gap-2">
//               {colors.map((color) => (
//                 <img
//                   key={color.name}
//                   src={color.image}
//                   alt={`${color.name} variant`}
//                   className={`w-16 h-20 rounded-lg cursor-pointer ${selectedColor === color.name ? 'border-2 border-blue-500' : ''}`}
//                   onClick={() => handleColorSelect(color.name)}
//                 />
//               ))}
//             </div>
//           </div>

//           <div className="mt-6 space-y-3">
//             <button
//               className="w-full bg-blue-500 text-white py-2 rounded-full hover:bg-blue-600 flex items-center justify-center gap-2 font-medium"
//             >
//               Add to cart
//             </button>
//             <button
//               className="w-full bg-blue-700 text-white py-2 rounded-full hover:bg-blue-800 flex items-center justify-center gap-2 font-medium"
//             >
//               Buy now
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default TryOnPreview;