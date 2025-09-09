import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null); // Full Firestore data
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);

        // Check if user exists in b2c_users
        let docRef = doc(db, "b2c_users", firebaseUser.uid);
        let docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserData({ ...docSnap.data(), collection: "b2c_users" });
        } else {
          // If not in b2c_users, check B2BBulkOrders_users
          docRef = doc(db, "B2BBulkOrders_users", firebaseUser.uid);
          docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setUserData({ ...docSnap.data(), collection: "B2BBulkOrders_users" });
          } else {
            setUserData(null);
          }
        }
      } else {
        setUser(null);
        setUserData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, userData, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
