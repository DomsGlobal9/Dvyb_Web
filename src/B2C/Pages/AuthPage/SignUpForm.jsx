import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import frameb2b from '../../../assets/AuthImages/b2bLogin_frame.png';

// Logo Component
const DVYBLogo = () => (
  <div className="text-center mb-8">
    <h1 className="text-4xl font-bold text-gray-900 tracking-wider">
      D<span className="text-blue-600">V</span>YB
    </h1>
    <p className="text-sm text-gray-500 mt-1 uppercase tracking-wide">WHOLESALE</p>
  </div>
);

// Google Sign Up Button Component
const GoogleSignUpButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors mb-6"
  >
    <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
      G
    </div>
    Continue With Google
  </button>
);

// Divider Component
const Divider = ({ text = "OR" }) => (
  <div className="relative mb-6">
    <div className="absolute inset-0 flex items-center">
      <div className="w-full border-t border-gray-300"></div>
    </div>
    <div className="relative flex justify-center text-sm">
      <span className="px-2 bg-white text-gray-500">{text}</span>
    </div>
  </div>
);

// Input Field Component
const InputField = ({ 
  label, 
  type = "text", 
  value, 
  onChange, 
  placeholder, 
  required = false,
  helperText,
  showPasswordToggle = false,
  showPassword = false,
  onTogglePassword
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <div className="relative">
      <input
        type={showPasswordToggle ? (showPassword ? 'text' : 'password') : type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm"
        required={required}
      />
      {showPasswordToggle && (
        <button
          type="button"
          onClick={onTogglePassword}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      )}
    </div>
    {helperText && (
      <p className="text-xs text-gray-500 mt-2">{helperText}</p>
    )}
  </div>
);

// Checkbox Component
const Checkbox = ({ checked, onChange, children, required = false }) => (
  <label className="flex items-start gap-3 cursor-pointer">
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
      required={required}
    />
    <span className="text-sm text-gray-700">{children}</span>
  </label>
);

// Primary Button Component
const PrimaryButton = ({ onClick, children, disabled = false, className = "" }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`w-full bg-blue-900 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
  >
    {children}
  </button>
);

// Progress Indicator Component
const ProgressIndicator = ({ currentStep = 2, totalSteps = 3 }) => (
  <div className="flex justify-center mt-8">
    <div className="flex gap-2">
      {Array.from({ length: totalSteps }, (_, index) => (
        <div
          key={index}
          className={`h-2 rounded-full ${
            index < currentStep - 1
              ? 'w-2 bg-gray-300'
              : index === currentStep - 1
              ? 'w-8 bg-blue-500'
              : 'w-2 bg-gray-300'
          }`}
        />
      ))}
    </div>
  </div>
);

// // Image Section Component
// const ImageSection = () => (
//   <div className="hidden lg:flex lg:w-1/2 relative">
//     <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-pink-900/20"></div>
//     <div className="w-full h-full bg-gradient-to-br from-red-800 to-pink-700 flex items-center justify-center">
//       <div className="text-center text-white p-8">
//         <div className="w-80 h-80 bg-red-900/30 rounded-lg mb-4 flex items-center justify-center">
//           <div className="text-6xl">👥</div>
//         </div>
//         <p className="text-lg opacity-90">Traditional Indian Wedding Collection</p>
//       </div>
//     </div>
//     <div className="absolute inset-0 bg-black/10"></div>
//   </div>
// );

// Sign Up Form Component
const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agreeTerms) {
      alert('Please agree to the terms of use and privacy policy');
      return;
    }
    console.log('Form submitted:', { email, password, agreeTerms, subscribeNewsletter });
  };

  const handleGoogleSignUp = () => {
    console.log('Google sign up clicked');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Sign Up</h2>
      <p className="text-gray-600 mb-6 text-sm">
        Sign up for free to access to any of our products.
      </p>

      <GoogleSignUpButton onClick={handleGoogleSignUp} />
      <Divider />

      <div className="space-y-6">
        <InputField
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="surbhipatelviy@gmail.com"
          required
        />

        <InputField
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
          showPasswordToggle
          showPassword={showPassword}
          onTogglePassword={() => setShowPassword(!showPassword)}
          helperText="Use 8 or more characters with a mix of letters, numbers & symbols"
        />

        <div className="space-y-3">
          <Checkbox
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
            required
          >
            Agree to our{' '}
            <span className="text-blue-600 hover:text-blue-800 cursor-pointer">
              Terms of use
            </span>{' '}
            and{' '}
            <span className="text-blue-600 hover:text-blue-800 cursor-pointer">
              Privacy Policy
            </span>
          </Checkbox>

          <Checkbox
            checked={subscribeNewsletter}
            onChange={(e) => setSubscribeNewsletter(e.target.checked)}
          >
            Subscribe to our monthly newsletter
          </Checkbox>
        </div>

        <PrimaryButton onClick={handleSubmit}>
          Sign Up
        </PrimaryButton>
      </div>

      <p className="text-center text-sm text-gray-600 mt-6">
        Already have an account?{' '}
        <span className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer">
          Log In
        </span>
      </p>
    </div>
  );
};

// Main Layout Component
const B2CSignUpPage = () => (
  <div className="h-screen flex">
    
  <div className="hidden md:flex w-1/2">
        <img
          src={frameb2b} 
          alt="Traditional Clothing"
          className="w-full h-full object-cover"
        />
      </div>
    
    <div className="flex w-full md:w-1/2 justify-center items-center bg-white">
      <div className="w-full max-w-md">
   
        <SignUpForm />
     
      </div>
    </div>
  </div>
);

// Export the main component
export default B2CSignUpPage;