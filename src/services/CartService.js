  import { auth, db } from "../firebase";
  import { 
    collection, 
    doc, 
    setDoc, 
    deleteDoc, 
    getDocs, 
    getDoc,
    query,
    orderBy,
    onSnapshot
  } from "firebase/firestore";

  // Helper function to determine user collection
  const getUserCollection = async (userId) => {
    try {
      const b2cUserRef = doc(db, "b2c_users", userId);
      const b2cDoc = await getDoc(b2cUserRef);
      
      if (b2cDoc.exists()) {
        return "b2c_users";
      }
      
      const b2bUserRef = doc(db, "B2BBulkOrders_users", userId);
      const b2bDoc = await getDoc(b2bUserRef);
      
      if (b2bDoc.exists()) {
        return "B2BBulkOrders_users";
      }
      
      throw new Error("User not found in any collection");
    } catch (error) {
      console.error("Error getting user collection:", error);
      throw error;
    }
  };

<<<<<<< HEAD
  // Add item to cart
  export const addToCart = async (productId, productData = {}, quantity = 1) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error("User must be authenticated");
      }
=======
    await setDoc(cartItemRef, {
      productId,
      quantity: Math.max(1, quantity), // Ensure quantity is at least 1
      addedAt: new Date(),
      userId: user.uid,
      vendorId: productData.userId,
      ...cleanedProductData,
      subtotal: (cleanedProductData.price || 0) * Math.max(1, quantity),
      freeShipping: cleanedProductData.freeShipping ?? false,
      shippingMessage: cleanedProductData.shippingMessage ?? null
    });
>>>>>>> b862a512ae907b263987f28e60aa2887b9590568

      const userCollection = await getUserCollection(user.uid);
      const cartItemRef = doc(db, userCollection, user.uid, "cart", productId);
      
      // Filter out undefined values from productData
      const cleanedProductData = {};
      for (const [key, value] of Object.entries(productData)) {
        if (value !== undefined) {
          cleanedProductData[key] = value;
        }
      }

      await setDoc(cartItemRef, {
        productId,
        quantity: Math.max(1, quantity), // Ensure quantity is at least 1
        addedAt: new Date(),
        userId: user.uid,
        ...cleanedProductData,
        subtotal: (cleanedProductData.price || 0) * Math.max(1, quantity),
        freeShipping: cleanedProductData.freeShipping ?? false,
        shippingMessage: cleanedProductData.shippingMessage ?? null
      });

      console.log("Item added to cart successfully");
      return true;
    } catch (error) {
      console.error("Error adding to cart:", error);
      throw error;
    }
  };

  // Remove item from cart
  export const removeFromCart = async (productId) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error("User must be authenticated");
      }

      const userCollection = await getUserCollection(user.uid);
      const cartItemRef = doc(db, userCollection, user.uid, "cart", productId);
      await deleteDoc(cartItemRef);

      console.log("Item removed from cart successfully");
      return true;
    } catch (error) {
      console.error("Error removing from cart:", error);
      throw error;
    }
  };

  // Get user's cart
  export const getCart = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error("User must be authenticated");
      }

      const userCollection = await getUserCollection(user.uid);
      const cartRef = collection(db, userCollection, user.uid, "cart");
      const q = query(cartRef, orderBy("addedAt", "desc"));
      const querySnapshot = await getDocs(q);

      const cartItems = [];
      querySnapshot.forEach((doc) => {
        cartItems.push({
          id: doc.id,
          ...doc.data()
        });
      });

      return cartItems;
    } catch (error) {
      console.error("Error fetching cart:", error);
      throw error;
    }
  };

  // Subscribe to cart changes (real-time)
  export const subscribeToCart = async (callback) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        callback([]);
        return () => {};
      }

      const userCollection = await getUserCollection(user.uid);
      const cartRef = collection(db, userCollection, user.uid, "cart");
      const q = query(cartRef, orderBy("addedAt", "desc"));

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const cartItems = [];
        querySnapshot.forEach((doc) => {
          cartItems.push({
            id: doc.id,
            ...doc.data()
          });
        });
        callback(cartItems);
      }, (error) => {
        console.error("Error listening to cart:", error);
        callback([]);
      });

      return unsubscribe;
    } catch (error) {
      console.error("Error setting up cart listener:", error);
      callback([]);
      return () => {};
    }
  };

  // Clear entire cart
  export const clearCart = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error("User must be authenticated");
      }

      const cartItems = await getCart();
      
      const deletePromises = cartItems.map(item => 
        removeFromCart(item.productId)
      );
      
      await Promise.all(deletePromises);
      
      console.log("Cart cleared successfully");
      return true;
    } catch (error) {
      console.error("Error clearing cart:", error);
      throw error;
    }
  };

  // Get cart count
  export const getCartCount = async () => {
    try {
      const cartItems = await getCart();
      return cartItems.length;
    } catch (error) {
      console.error("Error getting cart count:", error);
      return 0;
    }
  };