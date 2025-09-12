import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { getAuth, signOut } from "firebase/auth";
import {
  FaUser,
  FaShoppingBag,
  FaCamera,
  FaImages,
  FaHeart,
  FaTrophy,
  FaShareAlt,
  FaRupeeSign,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = ({ activeTab, setActiveTab }) => {
  const { user } = useAuth();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const auth = getAuth();

  const menu = [
    { id: "my-info", label: "My info", icon: <FaUser /> },
    { id: "my-orders", label: "My orders", icon: <FaShoppingBag /> },
    { id: "my-model", label: "My Model", icon: <FaCamera /> },
    { id: "my-tryon-gallery", label: "My Try-On Gallery", icon: <FaImages /> },
    { id: "wishlist", label: "Wishlist", icon: <FaHeart /> },
    { id: "rewards", label: "Rewards", icon: <FaTrophy /> },
    { id: "refer-earn", label: "Refer & Earn", icon: <FaShareAlt /> },
    { id: "subscriptions", label: "Subscriptions", icon: <FaRupeeSign /> },
  ];

  // ✅ Fetch user data
  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        let ref = doc(db, "b2c_users", user.uid);
        let snap = await getDoc(ref);

        if (snap.exists()) {
          setData(snap.data());
        } else {
          ref = doc(db, "B2BBulkOrders_users", user.uid);
          snap = await getDoc(ref);
          if (snap.exists()) {
            setData(snap.data());
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, [user]);

  // ✅ Handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("authToken");
    localStorage.removeItem("user");
      window.location.href = "/B2c-login"; // Redirect to login
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className=" fixed">
      {/* Sidebar */}
<div className="w-64 h-screen bg-gray-50 p-4 ">

        <h2 className="text-lg font-bold mb-6">
          Hello {data?.name || "User"}
        </h2>
        <ul>
          {menu.map((item) => (
            <li
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`cursor-pointer flex items-center gap-3 p-2 rounded-md mb-2 transition ${
                activeTab === item.id
                  ? "bg-blue-100 text-blue-600 font-semibold"
                  : "hover:bg-gray-100"
              }`}
            >
              {item.icon}
              {item.label}
            </li>
          ))}

          {/* Logout */}
          <li
            onClick={() => setShowLogoutModal(true)}
            className="cursor-pointer flex items-center gap-3 p-2 rounded-md mt-6 text-red-600 hover:bg-red-50"
          >
            <FaSignOutAlt />
            Logout
          </li>
        </ul>
      </div>

      {/* ✅ Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm  z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
            <h3 className="text-lg font-semibold mb-4">
              Are you sure you want to Log Out?
            </h3>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Yes
              </button>
              <button
                onClick={() => setShowLogoutModal(false)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
