// AccountPage.js
import React, { useState } from "react";
import Sidebar from '../../common/ProfilePageComponents/Sidebar'
import MyInfo from "../../common/ProfilePageComponents/MyInfo";
import ProfileImage from "../../common/ProfilePageComponents/PhotoManager";
import MyOrders from "../../common/ProfilePageComponents/Orders";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("my-info");
  const userId = "USER_ID_HERE"; // Replace with Firebase Auth UID

  return (
    <div className="flex min-h-screen">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 p-6 bg-gray-100">
        {activeTab === "my-info" && <MyInfo userId={userId} />}
        {activeTab === "my-orders" && <MyOrders/>}
        {activeTab === "my-model" &&  <ProfileImage /> }
        {/* {activeTab === "my-orders" && <p>My Orders Section</p>} */}
        {activeTab === "wishlist" && <p>Wishlist Section</p>}
      </div>
    </div>
  );
};

export default ProfilePage;
