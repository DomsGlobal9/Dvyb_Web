import React, { useEffect, useState } from "react";
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "../../context/AuthContext";
import { Edit2, Plus, Trash2, Home, Building2 } from "lucide-react";

const MyInfo = () => {
  const { user } = useAuth();
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    addresses: []
  });
  const [collectionName, setCollectionName] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({
    type: "Home",
    name: "",
    details: "",
    phone: ""
  });

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        // Try fetching from b2c_users first
        let ref = doc(db, "b2c_users", user.uid);
        let snap = await getDoc(ref);

        if (snap.exists()) {
          setCollectionName("b2c_users");
          setData({ 
            name: "",
            email: "",
            phone: "",
            addresses: [],
            ...snap.data() 
          });
        } else {
          // If not found, try B2BBulkOrders_users
          ref = doc(db, "B2BBulkOrders_users", user.uid);
          snap = await getDoc(ref);
          if (snap.exists()) {
            setCollectionName("B2BBulkOrders_users");
            setData({ 
              name: "",
              email: "",
              phone: "",
              addresses: [],
              ...snap.data() 
            });
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

  const handleNewAddressChange = (e) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  const saveData = async () => {
    if (!collectionName) return alert("User record not found!");
    try {
      const ref = doc(db, collectionName, user.uid);
      await updateDoc(ref, {
        name: data.name,
        phone: data.phone
      });
      setEditMode(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const addAddress = async () => {
    if (!newAddress.name || !newAddress.details) {
      alert("Please fill in address name and details");
      return;
    }
    
    try {
      const ref = doc(db, collectionName, user.uid);
      const addressWithId = { ...newAddress, id: Date.now() };
      await updateDoc(ref, {
        addresses: arrayUnion(addressWithId)
      });
      
      setData(prev => ({
        ...prev,
        addresses: [...(prev.addresses || []), addressWithId]
      }));
      
      setNewAddress({ type: "Home", name: "", details: "", phone: "" });
      setShowAddAddress(false);
    } catch (error) {
      console.error("Error adding address:", error);
    }
  };

  const removeAddress = async (addressToRemove) => {
    try {
      const ref = doc(db, collectionName, user.uid);
      await updateDoc(ref, {
        addresses: arrayRemove(addressToRemove)
      });
      
      setData(prev => ({
        ...prev,
        addresses: prev.addresses.filter(addr => addr.id !== addressToRemove.id)
      }));
    } catch (error) {
      console.error("Error removing address:", error);
    }
  };

  const setDefaultAddress = async (addressToSetDefault) => {
    try {
      const ref = doc(db, collectionName, user.uid);
      const updatedAddresses = data.addresses.map(addr => ({
        ...addr,
        isDefault: addr.id === addressToSetDefault.id
      }));
      
      await updateDoc(ref, {
        addresses: updatedAddresses
      });
      
      setData(prev => ({
        ...prev,
        addresses: updatedAddresses
      }));
    } catch (error) {
      console.error("Error setting default address:", error);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <div className=" max-w-4xl mx-auto bg-white rounded-lg shadow-sm ">
      {/* Header */}
      <div className="px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">My Info</h1>
        <button
          onClick={() => setEditMode(true)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
          disabled={editMode}
        >
          <Edit2 size={16} />
          Edit
        </button>
      </div>

      <div className="p-6">
        {/* Contact Details Section */}
        <div className="mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Contact Details</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Name
              </label>
              <input
                name="name"
                value={data.name || ""}
                disabled={!editMode}
                onChange={handleChange}
                className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  !editMode ? 'bg-gray-50 text-gray-500' : ''
                }`}
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                name="email"
                value={data.email || ""}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
                placeholder="Email address"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mobile number
              </label>
              <input
                name="phone"
                value={data.phone || ""}
                disabled={!editMode}
                onChange={handleChange}
                className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  !editMode ? 'bg-gray-50 text-gray-500' : ''
                }`}
                placeholder="Enter mobile number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value="••••••••"
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
              />
            </div>
          </div>

          {editMode && (
            <div className="flex gap-3 mt-6">
              <button
                onClick={saveData}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Save Changes
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* Address Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Address</h2>
            <button
              onClick={() => setShowAddAddress(true)}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              <Plus size={16} />
              Add New
            </button>
          </div>

          {/* Add New Address Form */}
          {showAddAddress && (
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <h3 className="font-medium text-gray-900 mb-3">Add New Address</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address Type
                  </label>
                  <select
                    name="type"
                    value={newAddress.type}
                    onChange={handleNewAddressChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Home">Home</option>
                    <option value="Office">Office</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address Name
                  </label>
                  <input
                    name="name"
                    value={newAddress.name}
                    onChange={handleNewAddressChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Raju, Sandeep"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Address
                  </label>
                  <textarea
                    name="details"
                    value={newAddress.details}
                    onChange={handleNewAddressChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter complete address with landmarks"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    name="phone"
                    value={newAddress.phone}
                    onChange={handleNewAddressChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Contact number"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={addAddress}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Add Address
                </button>
                <button
                  onClick={() => setShowAddAddress(false)}
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Address Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.addresses && data.addresses.length > 0 ? (
              data.addresses.map((address, index) => (
                <div key={address.id || index} className="border border-gray-200 rounded-lg p-4 relative">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {address.type === 'Home' ? (
                        <Home size={16} className="text-gray-500" />
                      ) : address.type === 'Office' ? (
                        <Building2 size={16} className="text-gray-500" />
                      ) : (
                        <div className="w-4 h-4 rounded-full bg-gray-400"></div>
                      )}
                      <h3 className="font-medium text-gray-900">{address.name}</h3>
                    </div>
                    <button
                      onClick={() => removeAddress(address)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  
                  {address.isDefault && (
                    <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mb-2">
                      Default
                    </span>
                  )}
                  
                  <p className="text-sm text-gray-600 mb-2">{address.details}</p>
                  {address.phone && (
                    <p className="text-sm text-gray-500 mb-3">{address.phone}</p>
                  )}
                  
                  <div className="flex gap-2">
                    {!address.isDefault && (
                      <button
                        onClick={() => setDefaultAddress(address)}
                        className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200"
                      >
                        Set as default
                      </button>
                    )}
                    <button className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded hover:bg-gray-200">
                      Edit
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center py-8 text-gray-500">
                <Home size={48} className="mx-auto mb-4 text-gray-300" />
                <p>No addresses added yet</p>
                <p className="text-sm">Click "Add New" to add your first address</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyInfo;