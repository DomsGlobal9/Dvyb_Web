
import React, { useState } from "react";
import { Eye, EyeOff } from 'lucide-react';
import frameb2b from '../../../assets/AuthImages/b2bLogin_frame.png';
const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex h-screen">
      {/* Left Image Section */}
      <div className="hidden md:flex w-1/2">
        <img
          src={frameb2b} // replace with your own image
          alt="Traditional Clothing"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Form Section */}
      <div className="flex w-full md:w-1/2 justify-center items-center bg-white">
        <div className="w-full max-w-md px-8">
          {/* Title */}
          <h2 className="text-2xl font-semibold text-center text-blue-900 mb-6">
            {isLogin ? "Wholesaler LOGIN" : "Wholesaler SIGNUP"}
          </h2>

          {/* Form */}
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm mb-2">
                User name or email address
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm mb-2">
                Password
              </label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Extra field for signup */}
            {!isLogin && (
              <div>
                <label className="block text-gray-700 text-sm mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                />
              </div>
            )}

            {/* Forgot password link only in login */}
            {isLogin && (
              <div className="text-right">
                <a
                  href="#"
                  className="text-sm text-gray-500 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-900 text-white py-2 rounded-md hover:bg-blue-800 transition"
            >
              {isLogin ? "Login" : "Sign up"}
            </button>
          </form>

          {/* Toggle between login/signup */}
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
  );
};

export default LoginPage;
