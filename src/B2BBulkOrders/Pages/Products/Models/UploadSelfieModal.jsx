import React, { useState, useEffect } from 'react';
import { ArrowLeft, User, Upload, X } from "lucide-react";
import ProfilePhotoSelector from './ProfilePhotoSelector';


const   UploadSelfieModal = ({ isOpen, onClose, onNext, garmentImage,garmentName, isSaree }) => {
  const [step, setStep] = useState(1); // 1 = initial choice, 2 = model selection
  const [selectedImage, setSelectedImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [firebaseImage, setFirebaseImage] = useState(null);
  const [loadingFirebaseImage, setLoadingFirebaseImage] = useState(true);
  const [imageSource, setImageSource] = useState("");


  const handleSelect = (imageUrl) => {
    setSelectedImage(imageUrl);
    console.log("Selected Firebase photo:", imageUrl);
  };

  // Simulate Firebase fetch (replace with your actual logic)
  useEffect(() => {
    const fetchProfilePhoto = async () => {
      setLoadingFirebaseImage(false);
      // Your existing Firebase logic here
    };

    if (isOpen) {
      fetchProfilePhoto();
    }
  }, [isOpen]);

  const modelImages = isSaree ? {
    fair: 'https://res.cloudinary.com/doiezptnn/image/upload/v1757585864/urhcw45ugpa14f43c4pd.jpg',
    unfair: 'https://res.cloudinary.com/doiezptnn/image/upload/v1757678831/medium_ptqoay.jpg',
    light : 'https://res.cloudinary.com/doiezptnn/image/upload/v1757678836/darkk_cfvh10.jpg',
    medium: 'https://res.cloudinary.com/doiezptnn/image/upload/v1757678836/normal_cdyh38.jpg'
  } : {
    fair: 'https://res.cloudinary.com/doiezptnn/image/upload/v1760531963/young-beautiful-indian-girl-white-background_gucosk.jpg',
    unfair: 'https://res.cloudinary.com/doiezptnn/image/upload/v1760530681/model4_bszzsd.jpg',
    light: 'https://res.cloudinary.com/doiezptnn/image/upload/v1760530680/model2_eh2sqf.jpg',
    medium: 'https://res.cloudinary.com/doiezptnn/image/upload/v1760530681/model3_h0nadq.jpg'
  };

  if (!isOpen) return null;

  const uploadToCloudinary = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "tryon_unsigned");
    data.append("cloud_name", "doiezptnn");

    const res = await fetch("https://api.cloudinary.com/v1_1/doiezptnn/image/upload", {
      method: "POST",
      body: data,
    });

    const json = await res.json();
    if (!json.secure_url) throw new Error("Cloudinary upload failed");
    return json.secure_url;
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
      alert("Please select a valid image (JPEG, PNG, JPG).");
      return;
    }

    setIsUploading(true);
    try {
      const cloudinaryUrl = await uploadToCloudinary(file);
      setSelectedImage(cloudinaryUrl);
      setImageSource("upload");
      // Navigate to preview
      if (garmentImage) {
        onNext({ modelImage: cloudinaryUrl, garmentImage });
      }
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDefaultImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setImageSource("default");
    // Navigate to preview
    if (garmentImage) {
      onNext({ modelImage: imageUrl, garmentImage });
    }
  };

  const handleUseFirebaseImage = () => {
    if (firebaseImage) {
      setSelectedImage(firebaseImage);
      setImageSource("firebase");
      // Navigate to preview
      if (garmentImage) {
        onNext({ modelImage: firebaseImage, garmentImage });
      }
    }
  };

  const handleClose = () => {
    setStep(1);
    setSelectedImage(null);
    setImageSource("");
    onClose();
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    } else {
      handleClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-2 sm:p-4">
      <div className="w-full sm:w-[90vw] lg:w-[900px] max-h-[95vh] sm:max-h-[90vh] overflow-hidden shadow-2xl bg-white rounded-lg relative flex flex-col lg:flex-row">
        
        {/* LEFT SIDE - Always visible on desktop, hidden on mobile */}
        
        <div
  className={`hidden lg:flex w-full ${
    step === 2 ? "lg:w-[18%]" : "lg:w-[45%]"
  } bg-gradient-to-br  p-4 sm:p-6 lg:p-8 flex-col`}
>
          <button 
            className="self-start border border-gray-300 bg-white rounded-full px-3 sm:px-4 py-1.5 text-xs sm:text-sm flex items-center gap-1 hover:bg-gray-50 mb-4 sm:mb-6"
            onClick={handleBack}
          >
            <ArrowLeft size={16} />
            Back
          </button>

          <div className="flex-1 flex flex-col justify-center items-center">
            <div className="w-full max-w-xs">
              {/* Decorative Image */}
             <div className="rounded-2xl overflow-hidden shadow-xl relative">
              
{step === 1 ? (
  <>
    <img
      src={garmentImage}
      alt="Fashion model"
      className="w-full h-full object-cover"
    />
    {garmentName && (
      <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-lg">
        <p className="text-xs sm:text-sm font-medium text-white leading-tight">
          {garmentName}
        </p>
      </div>
    )}
  </>
) : null}

</div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - Changes based on step */}
        <div className="w-full lg:w-[55%] bg-white no-scrollbar p-4 sm:p-6 lg:p-8 flex flex-col relative overflow-y-auto max-h-[95vh] sm:max-h-full">
          {/* Mobile Back Button */}
          <button 
            className="lg:hidden self-start border border-gray-300 bg-white rounded-full px-3 py-1.5 text-xs flex items-center gap-1 hover:bg-gray-50 mb-4"
            onClick={handleBack}
          >
            <ArrowLeft size={14} />
            Back
          </button>

          <button 
            onClick={handleClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-gray-600 z-10"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {step === 1 ? (
            /* STEP 1: Initial Choice */
            <div className="flex-1 flex flex-col justify-center pb-4 sm:pb-0">
          
              <div className="text-center mb-6 sm:mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1 sm:mb-2">2D Try-On</h2>
                <p className="text-sm sm:text-base text-gray-600">Let's go shopping</p>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {/* Take a Selfie Button */}
                <div>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/jpg"
                    onChange={handleFileChange}
                    className="hidden"
                    id="fileInput"
                    disabled={isUploading}
                  />
                  <label 
                    htmlFor="fileInput"
                    className={`block w-full bg-teal-500 hover:bg-teal-600 text-white py-3 sm:py-4 rounded-lg text-center text-sm sm:text-base font-medium cursor-pointer transition-colors ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {isUploading ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white"></div>
                        Uploading...
                      </span>
                    ) : (
                      'Take a Selfie'
                    )}
                  </label>
                </div>

                {/* Select a Model Button */}
                <button
                  onClick={() => setStep(2)}
                  className="w-full bg-white border-2 border-gray-300 hover:border-teal-500 text-gray-700 py-3 sm:py-4 rounded-lg text-sm sm:text-base font-medium transition-all"
                >
                  Select a model
                </button>
              </div>

              <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-gray-50 rounded-lg">
                <p className="text-xs sm:text-sm text-gray-600">
                  Hey! To use the 2D TRY ON feature, just upload or take a selfie or <span className="font-medium">Press SKIP</span> to check out the models you can try on!
                </p>
              </div>

              <button 
                onClick={handleClose}
                className="mt-4 sm:mt-6 self-end text-gray-500 hover:text-gray-700 flex items-center gap-1 text-xs sm:text-sm font-medium"
              >
                SKIP
                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          ) : (
            /* STEP 2: Model Selection */
            <div className="flex-1 pb-4 sm:pb-0">
              <div className="text-center mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1 sm:mb-2">Choose Your Photo</h2>
                <p className="text-sm sm:text-base text-gray-600">Select your model photo for try-on</p>
              </div>


              <div className="space-y-3 sm:space-y-4">
                
                {/* Firebase Saved Photo Option */}
                {!loadingFirebaseImage && firebaseImage && (
                  <>
                    <button
                      onClick={handleUseFirebaseImage}
                      className="w-full border-2 border-gray-300 rounded-xl p-3 sm:p-4 hover:border-teal-500 hover:bg-teal-50 transition-all group"
                    >
                      <div className="flex items-center gap-3 sm:gap-4">
                        <img 
                          src={firebaseImage}
                          alt="Your saved model"
                          className="w-12 h-16 sm:w-16 sm:h-20 object-cover rounded-lg border-2 border-gray-200 group-hover:border-teal-500 flex-shrink-0"
                        />
                        <div className="text-left flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <User size={14} className="text-teal-600 flex-shrink-0" />
                            <span className="font-medium text-gray-800 text-sm sm:text-base truncate">Use My Saved Photo</span>
                          </div>
                          <p className="text-xs sm:text-sm text-gray-600 mt-1">Use your uploaded model photo</p>
                          <span className="text-[10px] sm:text-xs text-green-600 bg-green-100 px-2 py-0.5 sm:py-1 rounded-full mt-1 sm:mt-2 inline-block">
                            ✓ Ready to use
                          </span>
                        </div>
                      </div>
                    </button>


                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="flex-1 h-px bg-gray-300"></div>
                      <span className="text-[10px] sm:text-xs text-gray-500 bg-white px-2">OR</span>
                      <div className="flex-1 h-px bg-gray-300"></div>
                    </div>
                  </>
                )}

                {/* Default Model Grid */}
                <ProfilePhotoSelector
    onSelect={(imageUrl) => {
      setSelectedImage(imageUrl);
      setImageSource("firebase");
      if (garmentImage) onNext({ modelImage: imageUrl, garmentImage });
    }}
  />

<div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 w-full place-items-center">
  {[
    { key: "fair", label: "Light" },
    { key: "unfair", label: "Fair" },
    { key: "medium", label: "Dusky" },
    { key: "light", label: "Dark" },
  ].map(({ key, label }) => {
    const isSelected = selectedImage === modelImages[key];
    return (
      <div key={key} className="w-full max-w-[140px] sm:max-w-[160px] md:max-w-[180px] lg:max-w-[200px] flex flex-col items-center">
        <button
          onClick={() => handleDefaultImageClick(modelImages[key])}
          className={`relative w-full rounded-2xl overflow-hidden border-2 transition-all duration-300 
            ${isSelected ? "border-teal-500 shadow-lg" : "border-gray-200 hover:border-teal-400"}
          `}
        >
          <img
            src={modelImages[key]}
            alt={`Model ${label}`}
            className="w-full h-[180px] sm:h-[200px] object-cover"
          />
          {isSelected && (
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white text-sm font-medium">
              <div className="mb-1 text-xs tracking-wide bg-teal-500 px-3 py-1 rounded-full">
                SELECTED
              </div>
            </div>
          )}
        </button>
        <p className="text-center text-sm font-semibold text-gray-800 mt-2">{label}</p>
      </div>
    );
  })}
</div>

{/* Default toggle (checkbox area at bottom) */}
<div className="mt-6 flex items-center justify-center">
  <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
    <input type="checkbox" defaultChecked className="accent-teal-500" />
    Make it default model for all future try-ons (you can always change this in settings)
  </label>
</div>

{/* NEXT button */}
<div className="mt-6 flex justify-end">
  <button
    onClick={() => selectedImage && onNext({ modelImage: selectedImage, garmentImage })}
    disabled={!selectedImage}
    className={`px-6 py-3 rounded-lg font-medium transition-all text-sm sm:text-base 
      ${selectedImage ? "bg-teal-500 text-white hover:bg-teal-600" : "bg-gray-200 text-gray-500 cursor-not-allowed"}`}
  >
    NEXT →
  </button>
</div>


              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadSelfieModal;

















//      {garmentImage && (
//   <div className="mt-2 w-full max-w-[200px] mb-4 sm:mb-6">
//     <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//       {/* Header with badge and checkmark */}
//       <div className="bg-white px-3 py-2 flex items-center justify-between border-b border-gray-100">
//         <div className="bg-green-100 rounded-full px-3 py-1">
//           <span className="text-[10px] font-semibold text-green-700 tracking-wide">SELECTED DRESS</span>
//         </div>
//         <div className="bg-green-600 rounded-full p-1 flex-shrink-0">
//           <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
//             <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
//           </svg>
//         </div>
//       </div>
      
//       {/* Product Image */}
//       <div className="bg-white p-3 flex items-center justify-center">
//         <img 
//           src={garmentImage}
//           alt={garmentName || "Selected dress"}
//           className="w-full h-24 object-contain"
//         />
//       </div>
      
//       {/* Product Name */}
//       {garmentName && (
//         <div className="bg-white px-3 py-2 border-t border-gray-100">
//           <p className="text-xs font-medium text-gray-800 text-center leading-tight">
//             {garmentName}
//           </p>
//         </div>
//       )}
//     </div>
//   </div>
// )}