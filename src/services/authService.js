import { auth, db } from "../firebase";
import { 
  createUserWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup 
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

// Register B2C user
export const registerB2C = async (email, password, extraData = {}) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, "b2c_users", user.uid), {
      uid: user.uid,
      email: user.email,
      ...extraData,
      createdAt: new Date(),
    });

    return user;
  } catch (error) {
    throw error;
  }
};

// Register B2B user
export const registerB2B = async (email, password, extraData = {}) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, "b2b_users", user.uid), {
      uid: user.uid,
      email: user.email,
      ...extraData,
      createdAt: new Date(),
    });

    return user;
  } catch (error) {
    throw error;
  }
};

// Google Sign-Up (with type)
export const registerWithGoogle = async (type = "b2c", extraData = {}) => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const collectionName = type === "b2b" ? "b2b_users" : "b2c_users";

    await setDoc(doc(db, collectionName, user.uid), {
      uid: user.uid,
      email: user.email,
      name: user.displayName,
      photo: user.photoURL,
      ...extraData,
      createdAt: new Date(),
    }, { merge: true });

    return user;
  } catch (error) {
    throw error;
  }
};
