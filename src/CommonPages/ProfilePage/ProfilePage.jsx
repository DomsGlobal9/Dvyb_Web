// // AccountPage.js
import React, { useState } from "react";
import Sidebar from '../../common/ProfilePageComponents/Sidebar';
import MyInfo from "../../common/ProfilePageComponents/MyInfo";
import ProfileImage from "../../common/ProfilePageComponents/PhotoManager";
import MyOrders from "../../common/ProfilePageComponents/Orders";
import { WishlistPage } from "../WishlistPage/WishlistPage";
import TryOnGallery from "../../common/ProfilePageComponents/TryOnGallery";
import RewardsRedemption from "../../B2C/B2CComponents/RewardsRedemption";
import ReferEarn from "../../B2C/B2CComponents/ReferEarn";
import SubscriptionFlow from "../../B2C/B2CComponents/SubscriptionFlow";



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
   <div className="relative flex">
  <Sidebar activeTab={activeTab} setActiveTab={setActiveTab}  />
 <div className="flex-1 ml-64 p-6 pb-20">
    {activeTab === "my-info" && <MyInfo userId={userId} />}
        {activeTab === "my-orders" && <MyOrders />}
        {activeTab === "my-model" && <ProfileImage />}
        {activeTab === "wishlist" && <WishlistPage />}
        {activeTab === "my-tryon-gallery" && <TryOnGallery/>}
        {activeTab === "rewards" && <RewardsRedemption />}
        {activeTab === "refer-earn" && <ReferEarn />}
        {activeTab === "subscriptions" && <SubscriptionFlow />}
        
     
      </div>
    </div>
  );
};

export default ProfilePage;