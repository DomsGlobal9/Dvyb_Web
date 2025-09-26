import React, { useState } from "react";
import { auth, db } from "../../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { registerB2C, registerWithGoogle } from "../../../services/authService";
import { doc, getDoc } from "firebase/firestore";
import frameB2C from "../../../assets/AuthImages/b2bLogin_frame.png";
import { useNavigate } from "react-router-dom";
import DVYBLogo from "../../../CommonPages/DVYBLogo";
import google from "../../../assets/logo/Google.png"
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword
} from "../../../utils/validation";

const B2cLoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const confirmPasswordError = !isLogin ? validateConfirmPassword(password, confirmPassword) : "";

    if (emailError) newErrors.email = emailError;
    if (passwordError) newErrors.password = passwordError;
    if (confirmPasswordError) newErrors.confirmPassword = confirmPasswordError;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      if (isLogin) {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const userDoc = await getDoc(doc(db, "b2c_users", user.uid));
        if (userDoc.exists() && userDoc.data().role === "B2C") {
          navigate("/");
          alert("Login successful!");
          console.log("Logged in:", user);
        } else {
          throw new Error("Not a B2C user. Please use the Wholesaler login.");
        }
      } else {
        const user = await registerB2C(email, password);
        navigate("/");
        alert("Signup successful!");
        console.log("Signed up:", user);
      }
    } catch (error) {
      console.error("Auth error:", error.code, error.message);
      alert(error.message);
    }
  };

  const handleGoogleSignUpB2C = async () => {
    try {
      localStorage.removeItem('intendedRole');
      const user = await registerWithGoogle("b2c");
      const userDoc = await getDoc(doc(db, "b2c_users", user.uid));
      if (userDoc.exists() && userDoc.data().role === "B2C") {
        navigate("/");
        alert("Google B2C sign-in successful!");
        // console.log("Google signed in:", user);
      } else {
        throw new Error("Not a B2C user. Please use the Wholesaler login.");
      }
    } catch (err) {
      console.error("Google sign-in error:", err);
      alert(err.message);
    }
  };

  return (
    <>
      <DVYBLogo />
      <div className="flex h-screen my-4">
        <div className="hidden md:flex w-1/2">
          <img
            src={frameB2C}
            alt="Traditional Clothing"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative flex w-full md:w-1/2 items-center justify-center bg-white">
          <div className="w-full max-w-md px-8">
            <h2 className="text-2xl font-semibold text-center m-2 text-primary-blue ">
              {isLogin ? "LOGIN" : "SIGNUP"}
            </h2>


            <button
              onClick={handleGoogleSignUpB2C}
              className="w-full flex items-center justify-center gap-3  rounded-lg px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors "
            >
              <div className="w-7 h-8 ">
                <img src={google} alt="" />
              </div>
              <span className="pb-2"> Continue With Google</span>
            </button>


            <div className="w-full flex items-center justify-center my-6">
              <span className="w-full border-t border-gray-300 rounded-b-full mx-6"></span>
              <span>or</span>
              <span className="w-full border-t border-gray-300 rounded-b-full mx-6"></span>
            </div>


            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-700 text-sm mb-2">
                  Email address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-gray-700 text-sm mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>
              {!isLogin && (
                <div>
                  <label className="block text-gray-700 text-sm mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
                  )}
                </div>
              )}
              {isLogin && (
                <div className="text-right">
                  <button
                    type="button"
                    onClick={() => navigate("/reset-password")}
                    className="text-sm text-gray-500 hover:underline"
                  >
                    Forgot your password?
                  </button>
                </div>
              )}
              <button
                type="submit"
                className="w-full bg-primary-blue text-white py-2 rounded-md hover:bg-blue-800 transition"
              >
                {isLogin ? "Login" : "Sign up"}
              </button>
            </form>
            <p className="mt-6 text-center text-sm text-gray-600">
              {isLogin ? (
                <>
                  Don’t have an account?{" "}
                  <button
                    onClick={() => setIsLogin(false)}
                    className="text-blue-600 hover:underline"
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    onClick={() => setIsLogin(true)}
                    className="text-blue-600 hover:underline"
                  >
                    Login
                  </button>
                </>
              )}
            </p>
          </div>
          <h4
            className="underline absolute bottom-14 cursor-pointer left-8 flex justify-start items-start"
            onClick={() => navigate("/B2BBulkOrders-login")}
          >
            Become a Wholesaler
          </h4>
        </div>
      </div>
    </>
  );
};

export default B2cLoginPage;
