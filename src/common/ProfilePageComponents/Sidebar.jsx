// Sidebar.js
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";


const Sidebar = ({ activeTab, setActiveTab }) => {
  const { user } = useAuth();
  const [data, setData] = useState({});
  const [collectionName, setCollectionName] = useState("");
  const [loading, setLoading] = useState(true);

  const menu = [
    { id: "my-info", label: "My Info" },
    { id: "my-orders", label: "My Orders" },
    { id: "wishlist", label: "Wishlist" },
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
    <div className="w-64 h-screen bg-gray-50 border-r p-4">
      <h2 className="text-lg font-bold mb-6">Hello {data.name}</h2>
      <ul>
        {menu.map((item) => (
          <li
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`cursor-pointer p-2 rounded-md mb-2 ${activeTab === item.id ? "bg-blue-100 text-blue-600 font-semibold" : ""
              }`}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
