import React, { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "../../context/AuthContext";

const MyInfo = () => {
  const { user } = useAuth();
  const [data, setData] = useState({});
  const [collectionName, setCollectionName] = useState(""); // To store correct collection
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);

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
          console.log(snap.data())
        } else {
          // If not found, try B2BBulkOrders_users
          ref = doc(db, "B2BBulkOrders_users", user.uid);
          snap = await getDoc(ref);
          if (snap.exists()) {
            setCollectionName("B2BBulkOrders_users");
            setData(snap.data());
            console.log(snap.data())
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, [user]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const saveData = async () => {
    if (!collectionName) return alert("User record not found!");
    try {
      const ref = doc(db, collectionName, user.uid);
      await updateDoc(ref, data);
      setEditMode(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6 bg-white rounded-md shadow-md w-full">
      <h2 className="text-xl font-semibold mb-4">My Info</h2>

      <div className="flex flex-col gap-3">
        <input
          name="name"
          value={data.name || ""}
          disabled={!editMode}
          onChange={handleChange}
          className="border p-2 rounded"
          placeholder="Name"
        />
        <input
          name="email"
          value={data.email || ""}
          disabled
          className="border p-2 rounded bg-gray-100"
        />
        <input
          name="phone"
          value={data.phone || ""}
          disabled={!editMode}
          onChange={handleChange}
          className="border p-2 rounded"
          placeholder="Phone"
        />
      </div>

      <div className="mt-4 flex gap-3">
        {editMode ? (
          <>
            <button onClick={saveData} className="bg-blue-600 text-white px-4 py-2 rounded">
              Save
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setEditMode(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default MyInfo;
