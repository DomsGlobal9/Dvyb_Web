import { ArrowRight } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

function TryYourOutfit() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { garmentImage } = state || {};

  const handle2DTryOnClick = () => {
    if (!garmentImage) {
      alert("No garment selected. Please go back and select an item.");
      return;
    }
    navigate("/upload-selfie", { state: { garmentImage } });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f1f6fa]">
      <div className="bg-white p-6 rounded-3xl shadow-lg w-[380px]">
        <div className="flex justify-end">
          <button
            className="border border-gray-300 rounded-full px-4 py-1 text-sm flex items-center gap-1 hover:bg-gray-100"
            onClick={() => navigate("/")}
          >
            Skip <ArrowRight size={16} />
          </button>
        </div>
        <h2 className="text-center text-xl font-semibold text-[#004d66] my-4">
          Try Your Outfit On
        </h2>
        <div
          className="flex items-center justify-between bg-white rounded-xl shadow-md p-4 mb-4 cursor-pointer hover:shadow-lg transition"
          onClick={handle2DTryOnClick}
        >
          <div className="flex items-center gap-4">
            <div className="bg-sky-400 text-white w-12 h-12 rounded-full flex items-center justify-center">
              <span className="text-lg font-bold">👤</span>
            </div>
            <div>
              <p className="font-semibold text-gray-800">2D Try on</p>
              <p className="text-sm text-gray-500">Upload your selfie</p>
            </div>
          </div>
          <ArrowRight className="text-gray-500" />
        </div>
        <div className="flex items-center justify-between bg-white rounded-xl shadow-md p-4 cursor-pointer hover:shadow-lg transition">
          <div className="flex items-center gap-4">
            <div className="bg-sky-400 text-white w-12 h-12 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold">3D</span>
            </div>
            <div>
              <p className="font-semibold text-gray-800"  > <a href="https://metaperson.avatarsdk.com/?_gl=1*kpajm*_ga*MTE2NTg0NTg1OS4xNzU0NTYwMzU5*_ga_RK28V9S3X1*czE3NTYwMzE5MzckbzE5JGcwJHQxNzU2MDMxOTM3JGo2MCRsMCRoMA..&_ga=2.60985324.1729637245.1755945562-1165845859.1754560359">3D Try on </a></p>
              <p className="text-sm text-gray-500">
                Craft your own look and bring your unique style to life
              </p>
            </div>
          </div>
          <ArrowRight className="text-gray-500" />
        </div>
      </div>
    </div>
  );
}

export default TryYourOutfit;