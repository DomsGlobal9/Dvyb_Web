import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

// Helper: Save token
const saveAuthToken = async (user) => {
  const token = await user.getIdToken();
  localStorage.setItem("authToken", token);
};

// Register B2C user
export const registerB2C = async (email, password, extraData = {}) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    await setDoc(doc(db, "b2c_users", user.uid), {
      uid: user.uid,
      email: user.email,
      role: "B2C",
      ...extraData,
      createdAt: new Date(),
    });

    await saveAuthToken(user); // 🔥 Save token

    return user;
  } catch (error) {
    throw error;
  }
};

// Register B2BBulkOrders user
export const registerB2BBulkOrders = async (
  email,
  password,
  extraData = {}
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    await setDoc(doc(db, "B2BBulkOrders_users", user.uid), {
      uid: user.uid,
      email: user.email,
      role: "B2b",
      ...extraData,
      createdAt: new Date(),
    });

    await saveAuthToken(user); // 🔥 Save token

    return user;
  } catch (error) {
    throw error;
  }
};

// // Google Sign-Up
// // export const registerWithGoogle = async (type = "b2c", extraData = {}) => {
// //   try {
// //     const provider = new GoogleAuthProvider();
// //     const result = await signInWithPopup(auth, provider);
// //     const user = result.user;

// //     const collectionName =
// //       type === "B2BBulkOrders" ? "B2BBulkOrders_users" : "b2c_users";

// //     await setDoc(
// //       doc(db, collectionName, user.uid),
// //       {
// //         uid: user.uid,
// //         email: user.email,
// //         name: user.displayName,
// //         photo: user.photoURL,
// //         role: type === "B2BBulkOrders" ? "B2BBulkOrders" : "B2C",
// //         ...extraData,
// //         createdAt: new Date(),
// //       },
// //       { merge: true }
// //     );
// //     console.log("Google sign-in user:", user);
// //     console.log("type:", type);
// //     await saveAuthToken(user); // 🔥 Save token

// //     return user;
// //   } catch (error) {
// //     throw error;
// //   }
// // };

// export const registerWithGoogle = async (type = "b2c", extraData = {}) => {
//   try {
//     const provider = new GoogleAuthProvider();
//     const result = await signInWithPopup(auth, provider);
//     const user = result.user;

//     const collectionName = type === "b2c" ? "b2c_users" : "B2BBulkOrders_users";
//     const role = type === "b2c" ?  "B2C" : "B2B";

//     await setDoc(doc(db, collectionName, user.uid), {
//       uid: user.uid,
//       email: user.email,
//       name: user.displayName,
//       photo: user.photoURL,
//       role,
//       ...extraData,
//       createdAt: new Date(),
     
//     }, { merge: true });

//     console.log("Google sign-in user:", user);
//     await saveAuthToken(user); // 🔥 Save token

//     return user;
//   } catch (error) {
//     console.error("Google sign-in error:", error);
//     throw error;
//   }
// };

export const registerWithGoogle = async (type = "b2c", extraData = {}) => {
  try {
    // Validate input
    if (!["b2c", "b2b"].includes(type.toLowerCase())) {
      throw new Error("Invalid type. Must be 'b2c' or 'b2b'");
    }

    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    if (!user) {
      throw new Error("No user returned from Google sign-in");
    }

    const collectionName = type === "b2c" ? "b2c_users" : "b2b_bulk_orders_users";
    const role = type.toUpperCase(); // "B2C" or "B2B"

    await setDoc(doc(db, collectionName, user.uid), {
      uid: user.uid,
      email: user.email,
      name: user.displayName || "",
      photo: user.photoURL || "",
      role,
      ...extraData,
      createdAt: new Date(),
      lastLoginAs: role,           
      lastLoginTime: new Date()
    }, { merge: true });

    localStorage.setItem('intendedRole', role);

    console.log("Google sign-in user:", user);
    
    // Handle token saving with error handling
    try {
      await saveAuthToken(user);
    } catch (tokenError) {
      console.error("Token saving error:", tokenError);
      // Continue execution - don't fail the entire registration
    }

    return user;
  } catch (error) {
    console.error("Google sign-in error:", error);
    
    // Provide more specific error messages
    if (error.code === 'auth/popup-closed-by-user') {
      throw new Error("Sign-in cancelled by user");
    } else if (error.code === 'auth/popup-blocked') {
      throw new Error("Pop-up blocked. Please allow pop-ups for this site");
    }
    
    throw error;
  }
};