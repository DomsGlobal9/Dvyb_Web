import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
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

const Sidebar = ({ activeTab, setActiveTab, onLogout }) => {
  const { user } = useAuth();
  const [data, setData] = useState({});
  const [collectionName, setCollectionName] = useState("");
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        // Try fetching from b2c_users first
        let ref = doc(db, "b2c_users", user.uid);
        let snap = await getDoc(ref);

        if (snap.exists()) {
          setCollectionName("b2c_users");
          setData(snap.data());
        } else {
          // If not found, try B2BBulkOrders_users
          ref = doc(db, "B2BBulkOrders_users", user.uid);
          snap = await getDoc(ref);
          if (snap.exists()) {
            setCollectionName("B2BBulkOrders_users");
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

  return (
    <div className="w-64 h-screen bg-gray-50 p-4">
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

        {/* Logout Button */}
        <li
          onClick={onLogout}
          className="cursor-pointer flex items-center gap-3 p-2 rounded-md mt-6 text-red-600 hover:bg-red-50"
        >
          <FaSignOutAlt />
          Logout
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
