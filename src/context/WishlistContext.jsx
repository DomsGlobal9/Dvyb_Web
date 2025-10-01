import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { subscribeToWishlist } from "../services/WishlistService";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    if (!user) {
      setWishlist([]);
      return;
    }

    // Subscribe to wishlist changes in real-time
    let unsubscribe;
    const initSubscription = async () => {
      unsubscribe = await subscribeToWishlist(setWishlist);
    };

    initSubscription();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [user]);

  return (
    <WishlistContext.Provider value={{ wishlist, setWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
