// // AccountPage.js
import React, { useState } from "react";
import Sidebar from '../../common/ProfilePageComponents/Sidebar'
import MyInfo from "../../common/ProfilePageComponents/MyInfo";
import ProfileImage from "../../common/ProfilePageComponents/PhotoManager";
import MyOrders from "../../common/ProfilePageComponents/Orders";
import { WishlistPage } from "../WishlistPage/WishlistPage";
import TryOnGallery from "../../common/ProfilePageComponents/TryOnGallery";


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
    <div className="relative flex min-h-screen  ">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="absolute left-64 w-250 flex-1 p-6 ">
        {activeTab === "my-info" && <MyInfo userId={userId} />}
        {activeTab === "my-orders" && <MyOrders />}
        {activeTab === "my-model" && <ProfileImage />}
        {activeTab === "wishlist" && <WishlistPage />}
        {activeTab === "my-tryon-gallery" && <TryOnGallery/>}
        {/* {activeTab === "wishlist" && <p>Wishlist Section</p>} */}
      </div>
    </div>
  );
};

export default ProfilePage;