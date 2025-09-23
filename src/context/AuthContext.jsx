// import React, { createContext, useContext, useEffect, useState } from "react";
// import { onAuthStateChanged } from "firebase/auth";
// import { doc, getDoc } from "firebase/firestore";
// import { auth, db } from "../firebase";
// import { useNavigate } from "react-router-dom";


// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const navigate = useNavigate();

//   const [user, setUser] = useState(null);
//   const [userData, setUserData] = useState(null); // Firestore data
//   const [loading, setLoading] = useState(true);


//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
//       try {
//         if (firebaseUser) {
//           setUser(firebaseUser);

//           // Check b2c_users
//           let docRef = doc(db, "b2c_users", firebaseUser.uid);
//           let docSnap = await getDoc(docRef);

//           if (docSnap.exists()) {
//             setUserData({ ...docSnap.data(), collection: "b2c_users", role: "b2c" });
//             // if (docSnap.data().role === "B2C") navigate("/");
//           } else {
//             // Fallback: B2BBulkOrders_users
//             docRef = doc(db, "B2BBulkOrders_users", firebaseUser.uid);
//             docSnap = await getDoc(docRef);

//             if (docSnap.exists()) {
//               setUserData({
//                 ...docSnap.data(),
//                 collection: "B2BBulkOrders_users",
//                 role: "b2b"
//               });
//               // if (docSnap.data().role === "B2BBulkOrders") navigate("/B2BBulkOrders-home");
//             } else {
//               setUserData(null);
//             }
//           }
//         } else {
//           setUser(null);
//           setUserData(null);
//         }
//       } catch (error) {
//         console.error("Auth error:", error);
//         setUserData(null);
//       } finally {
//         setLoading(false);
//       }
//     });

//     return () => unsubscribe();
//   }, [navigate]);

//   return (
//     <AuthContext.Provider value={{ user, userData, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);


import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        let userDoc = await getDoc(doc(db, "b2c_users", user.uid));
        if (userDoc.exists() && userDoc.data().role === "B2C") {
          setUserRole("B2C");
        } else {
          userDoc = await getDoc(doc(db, "B2BBulkOrders_users", user.uid));
          if (userDoc.exists() && userDoc.data().role === "B2B") {
            setUserRole("B2B");
          } else {
            setUserRole(null);
          }
        }
      } else {
        setUserRole(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ userRole, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
