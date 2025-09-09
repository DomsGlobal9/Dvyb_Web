import React, { useState } from "react";
import { auth } from "../../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { registerB2BBulkOrders, registerWithGoogle } from "../../../services/authService";
import frameB2BBulkOrders from "../../../assets/AuthImages/B2BLogin_frame.png";
import { useNavigate } from "react-router-dom";
import DVYBLogo from "../../../CommonPages/DVYBLogo";
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword
} from "../../../utils/validation";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);  // ✅ toggle between login/signup
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
        // 🔹 LOGIN
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        navigate("/B2BBulkOrders-home");
        alert("Login successful!");
        console.log("Logged in:", userCredential.user);
      } else {
        // 🔹 SIGNUP
        const user = await registerB2BBulkOrders(email, password);
        alert("Signup successful!");
        console.log("Signed up:", user);
      }
    } catch (error) {
      console.error("Auth error:", error.code, error.message);
      alert(`${error.code}: ${error.message}`);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      await registerWithGoogle("B2BBulkOrders");
      navigate("/B2BBulkOrders-home");
      alert("Google B2BBulkOrders sign-in successful!");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <>
      <DVYBLogo />
      <div className="flex h-screen">
        {/* Left Image Section */}
        <div className="hidden md:flex w-1/2">
          <img
            src={frameB2BBulkOrders}
            alt="Traditional Clothing"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Form Section */}
        <div className="flex w-full md:w-1/2 justify-center items-center bg-white">
          <div className="w-full max-w-md px-8">
            {/* Google Button */}
            <button
              onClick={handleGoogleSignUp}
              className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors mb-6"
            >
              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                G
              </div>
              Continue With Google
            </button>

            <h2 className="text-2xl font-semibold text-center text-blue-900 mb-6">
              {isLogin ? "Wholesaler LOGIN" : "Wholesaler SIGNUP"}
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Email */}
              <div>
                <label className="block text-gray-700 text-sm mb-2">
                  User name or email address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              {/* Password */}
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

              {/* Confirm Password (only signup) */}
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

              {/* Forgot Password (only login) */}
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

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-blue-900 text-white py-2 rounded-md hover:bg-blue-800 transition"
              >
                {isLogin ? "Login" : "Sign up"}
              </button>
            </form>

            {/* Toggle Login/Signup */}
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
        </div>
      </div>
    </>
  );
};

export default LoginPage;
