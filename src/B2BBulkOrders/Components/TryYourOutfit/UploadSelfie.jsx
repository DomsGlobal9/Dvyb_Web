import { ArrowLeft, ArrowRight, User, Upload, Camera } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase"; // adjust path
import { useAuth } from "../../../context/AuthContext"; // adjust path

function UploadSelfie() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { garmentImage } = state || {};
  const { user } = useAuth();

  const [selectedImage, setSelectedImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [firebaseImage, setFirebaseImage] = useState(null);
  const [loadingFirebaseImage, setLoadingFirebaseImage] = useState(true);
  const [imageSource, setImageSource] = useState(""); // "firebase" or "upload"

  // 🔹 Fetch optional Firebase photo
  useEffect(() => {
    const fetchProfilePhoto = async () => {
      if (!user) {
        setLoadingFirebaseImage(false);
        return;
      }

      try {
        let ref = doc(db, "b2c_users", user.uid);
        let snap = await getDoc(ref);

        if (snap.exists() && snap.data().profilePhoto) {
          setFirebaseImage(snap.data().profilePhoto);
        } else {
          ref = doc(db, "B2BBulkOrders_users", user.uid);
          snap = await getDoc(ref);
          if (snap.exists() && snap.data().profilePhoto) {
            setFirebaseImage(snap.data().profilePhoto);
          }
        }
      } catch (error) {
        console.error("Error fetching profile photo:", error);
      }
      setLoadingFirebaseImage(false);
    };

    fetchProfilePhoto();
  }, [user]);

  const handleBackClick = () => navigate(-1);

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
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleUseFirebaseImage = () => {
    if (firebaseImage) {
      setSelectedImage(firebaseImage);
      setImageSource("firebase");
    }
  };

  const handleNextClick = () => {
    if (!selectedImage) {
      alert("Please select an image first.");
      return;
    }
    if (!garmentImage) {
      alert("No garment image found. Please go back and select an item.");
      return;
    }

    navigate("/preview", { 
      state: { modelImage: selectedImage, garmentImage }
    });
  };

  const resetSelection = () => {
    setSelectedImage(null);
    setImageSource("");
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

        {/* Title */}
        <div className="mt-4 text-center">
          <h2 className="text-lg font-semibold text-gray-800">Choose Your Photo</h2>
          <p className="text-sm text-gray-600">Select your model photo for try-on</p>
        </div>

        {/* Image Selection */}
        <div className="mt-6">
          {!selectedImage ? (
            <div className="space-y-4">
              {/* Firebase Option (Only show if exists) */}
              {!loadingFirebaseImage && firebaseImage && (
                <button
                  onClick={handleUseFirebaseImage}
                  className="w-full border-2 border-gray-300 rounded-xl p-4 hover:border-sky-400 hover:bg-sky-50 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <img 
                      src={firebaseImage}
                      alt="Your saved model"
                      className="w-16 h-20 object-cover rounded-lg border-2 border-gray-200 group-hover:border-sky-400"
                    />
                    <div className="text-left flex-1">
                      <div className="flex items-center gap-2">
                        <User size={16} className="text-sky-600" />
                        <span className="font-medium text-gray-800">Use My Saved Photo</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Use your uploaded model photo</p>
                      <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full mt-2 inline-block">
                        ✓ Ready to use
                      </span>
                    </div>
                  </div>
                </button>
              )}

              {/* Divider */}
              {firebaseImage && (
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-gray-300"></div>
                  <span className="text-xs text-gray-500 bg-white px-2">OR</span>
                  <div className="flex-1 h-px bg-gray-300"></div>
                </div>
              )}

              {/* Upload New Image */}
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/jpg"
                  onChange={handleFileChange}
                  className="hidden"
                  id="fileInput"
                  disabled={isUploading}
                />
                {!isUploading ? (
                  <label htmlFor="fileInput" className="cursor-pointer">
                    <Upload size={32} className="text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-700 font-medium">Upload New Photo</p>
                    <p className="text-sm text-gray-500 mt-1">Select and upload a new model photo</p>
                    <div className="mt-3 bg-sky-100 text-sky-700 px-3 py-1 rounded-full text-xs inline-block">
                      JPG, PNG • Max 5MB
                    </div>
                  </label>
                ) : (
                  <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-400"></div>
                    <p className="text-gray-700 mt-2">Uploading...</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Selected Image Display */
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-4">
              <div className="relative">
                <img 
                  src={selectedImage} 
                  alt="Selected model photo" 
                  className="w-full h-48 object-cover rounded-lg border-2 border-gray-200" 
                />
                <div className="flex items-center justify-between mt-3 p-3 bg-gray-100 rounded-lg">
                  <div className="flex items-center gap-2">
                    {imageSource === "firebase" ? (
                      <User size={16} className="text-sky-600" />
                    ) : (
                      <Camera size={16} className="text-green-600" />
                    )}
                    <span className="text-sm text-gray-700 font-medium">
                      {imageSource === "firebase" ? "Saved Photo" : "Uploaded Photo"}
                    </span>
                    <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
                      ✓ Selected
                    </span>
                  </div>
                  <button 
                    className="text-gray-500 hover:text-gray-700 p-1"
                    onClick={resetSelection}
                    title="Change photo"
                  >
                    <span className="text-lg">×</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Garment Preview */}
        {garmentImage && (
          <div className="mt-4 bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-600 mb-2 font-medium">Selected garment:</p>
            <img 
              src={garmentImage} 
              alt="Selected garment" 
              className="w-16 h-20 object-cover rounded-lg mx-auto border-2 border-gray-200"
            />
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-6">
          {selectedImage && !isUploading ? (
            <button 
              className="w-full bg-sky-400 text-white py-3 rounded-full hover:bg-sky-500 flex items-center justify-center gap-2 font-medium transition-colors"
              onClick={handleNextClick}
            >
              Try On
              <ArrowRight size={18} />
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default UploadSelfie;
