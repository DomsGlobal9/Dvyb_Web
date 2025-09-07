import { ArrowLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

function Preview() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const selectedImage = state?.image;

  const handleBackClick = () => {
    navigate("/upload-selfie");
  };

  if (!selectedImage) {
    navigate("/upload-selfie");
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f1f6fa]">
      <div className="bg-white p-6 rounded-3xl shadow-lg w-[380px]">
        {/* Back button */}
        <div className="flex justify-start">
          <button
            className="border border-gray-300 rounded-full px-4 py-1 text-sm flex items-center gap-1 hover:bg-gray-100"
            onClick={handleBackClick}
          >
            <ArrowLeft size={16} /> Back
          </button>
        </div>

        {/* Preview Section */}
        <div className="mt-4 flex flex-col items-center">
          <div className="border-2 border-gray-300 rounded-xl p-6 w-full text-center">
            <img src={selectedImage} alt="Selected Preview" className="max-w-full h-auto rounded-lg" />
            <p className="text-gray-700 mt-2">Your selected image</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Preview;