import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function UploadSelfie() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { garmentImage } = state || {};
  const [selectedImage, setSelectedImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleBackClick = () => {
    navigate(-1);
  };

  const uploadToCloudinary = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "tryon_unsigned"); // Replace with your actual upload preset
    data.append("cloud_name", "doiezptnn"); // Replace with your actual cloud name

    const res = await fetch("https://api.cloudinary.com/v1_1/doiezptnn/image/upload", {
      method: "POST",
      body: data,
    });

    const json = await res.json();
    if (!json.secure_url) {
      throw new Error("Cloudinary upload failed");
    }
    return json.secure_url;
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/jpg")) {
      setIsUploading(true);
      try {
        // Upload to Cloudinary and get URL
        const cloudinaryUrl = await uploadToCloudinary(file);
        setSelectedImage(cloudinaryUrl);
      } catch (error) {
        console.error("Upload failed:", error);
        alert("Failed to upload image. Please try again.");
      } finally {
        setIsUploading(false);
      }
    } else {
      alert("Please select a valid image file (JPEG, PNG, or JPG).");
    }
  };

  const handleNextClick = () => {
    if (selectedImage && garmentImage) {
      navigate("/preview", { 
        state: { 
          modelImage: selectedImage,
          garmentImage: garmentImage
        } 
      });
    } else if (!selectedImage) {
      alert("Please select an image first.");
    } else if (!garmentImage) {
      alert("No garment image found. Please go back and select an item.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f1f6fa]">
      <div className="bg-white p-6 rounded-3xl shadow-lg w-[380px]">
        {/* Back button */}
        <div className="flex justify-start">
          <button 
            className="border border-gray-300 rounded-full px-4 py-1 text-sm flex items-center gap-1 hover:bg-gray-100"
            onClick={handleBackClick}
          >
            <ArrowLeft size={16} />
            Back
          </button>
        </div>

        {/* Upload Section */}
        <div className="mt-4 flex flex-col items-center">
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 w-full text-center">
            <input
              type="file"
              accept="image/jpeg,image/png,image/jpg"
              onChange={handleFileChange}
              className="hidden"
              id="fileInput"
              disabled={isUploading}
            />
            
            {!selectedImage && !isUploading && (
              <label htmlFor="fileInput" className="cursor-pointer">
                <span className="text-gray-500">📁</span>
                <p className="text-gray-700 mt-2">Upload files</p>
                <p className="text-sm text-gray-500">Select and upload the files of your choice</p>
              </label>
            )}

            {isUploading && (
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-400"></div>
                <p className="text-gray-700 mt-2">Uploading...</p>
              </div>
            )}

            {selectedImage && !isUploading && (
              <div className="relative">
                <img 
                  src={selectedImage} 
                  alt="Uploaded Selfie" 
                  className="max-w-full h-auto rounded-lg border-4 border-dashed border-gray-300" 
                />
                <div className="flex items-center justify-between mt-2 p-2 bg-gray-100 rounded-full">
                  <div className="flex items-center gap-2">
                    <span className="text-red-500">📄</span>
                    <span className="text-sm text-gray-700">Selfie</span>
                    <span className="text-xs text-green-600">Uploaded • Ready</span>
                  </div>
                  <button 
                    className="text-gray-500 hover:text-gray-700"
                    onClick={() => setSelectedImage(null)}
                  >
                    <span className="text-lg">×</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Show garment preview */}
          {garmentImage && (
            <div className="mt-4 w-full">
              <p className="text-sm text-gray-600 mb-2">Selected garment:</p>
              <img 
                src={garmentImage} 
                alt="Selected garment" 
                className="w-20 h-24 object-cover rounded-lg mx-auto border-2 border-gray-200"
              />
            </div>
          )}

          {selectedImage && !isUploading ? (
            <button 
              className="mt-4 bg-sky-400 text-white px-4 py-2 rounded-full hover:bg-sky-500 flex items-center gap-1"
              onClick={handleNextClick}
            >
              Try On
              <ArrowRight size={16} />
            </button>
          ) : !isUploading ? (
            <button 
              className="mt-4 bg-sky-400 text-white px-4 py-2 rounded-full hover:bg-sky-500"
              onClick={() => document.getElementById("fileInput").click()}
            >
              Upload
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default UploadSelfie;