// // AccountPage.js
import React, { useState } from "react";
import Sidebar from '../../common/ProfilePageComponents/Sidebar'
import MyInfo from "../../common/ProfilePageComponents/MyInfo";
import ProfileImage from "../../common/ProfilePageComponents/PhotoManager";
import MyOrders from "../../common/ProfilePageComponents/Orders";
import { WishlistPage } from "../WishlistPage/WishlistPage";


const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("my-info");
  const userId = "USER_ID_HERE"; // Replace with Firebase Auth UID
  React.useEffect(() => {
    if (activeTab === "my-model") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [activeTab]);

  return (
    <div className="relative flex min-h-screen hide-scrollbar ">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="absolute left-75 w-250 flex-1 p-6 ">
        {activeTab === "my-info" && <MyInfo userId={userId} />}
        {activeTab === "my-orders" && <MyOrders />}
        {activeTab === "my-model" && <ProfileImage />}
        {activeTab === "wishlist" && <WishlistPage />}
        {activeTab === "my-orders" && <p>My Orders Section</p>}
        {/* {activeTab === "wishlist" && <p>Wishlist Section</p>} */}
      </div>
    </div>
  );
};

export default ProfilePage;