// components/ProfilePhotoSelector.jsx
import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../firebase"; // adjust path as needed
import { useAuth } from "../../../../context/AuthContext"; // adjust path as needed
import { User } from "lucide-react";

const ProfilePhotoSelector = ({ onSelect }) => {
  const { user } = useAuth();
  const [firebaseImage, setFirebaseImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfilePhoto = async () => {
      if (!user) {
        setLoading(false);
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
      setLoading(false);
    };

    fetchProfilePhoto();
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-4">
        <div className="animate-spin h-6 w-6 border-2 border-b-sky-400 rounded-full"></div>
      </div>
    );
  }

  if (!firebaseImage) {
    return null; // No photo to show
  }

  return (
    <button
      onClick={() => onSelect(firebaseImage)}
      className="w-full border-2 border-gray-300 rounded-xl p-4 hover:border-sky-400 hover:bg-sky-50 transition-all group"
    >
      <div className="flex items-center gap-4">
        <img
          src={firebaseImage}
          alt="Your saved model"
          className="w-16 h-20 object-contain rounded-lg border-2 border-gray-200 group-hover:border-sky-400"
        />
        <div className="text-left flex-1">
          <div className="flex items-center gap-2">
            <User size={16} className="text-sky-600" />
            <span className="font-medium text-gray-800">
              Use My Saved Photo
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Use your uploaded model photo
          </p>
          <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full mt-2 inline-block">
            ✓ Ready to use
          </span>
        </div>
      </div>
    </button>
  );
};

export default ProfilePhotoSelector;
