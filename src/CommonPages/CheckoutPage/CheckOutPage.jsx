// import React, { useState } from 'react';
// import { MapPin, CreditCard } from 'lucide-react';

// export default function CheckoutPage() {
//   const [shippingOption, setShippingOption] = useState('same');
//   const [paymentMethod, setPaymentMethod] = useState('credit');

//   const orderItems = [
//     {
//       id: 1,
//       name: 'Blue Flower Print Crop Top x1',
//       color: 'Yellow',
//       price: 2900,
//       image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=100&h=100&fit=crop'
//     },
//     {
//       id: 2,
//       name: 'Lavender Hoodie x 2',
//       color: 'Pink',
//       price: 3800,
//       image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=100&h=100&fit=crop'
//     },
//     {
//       id: 3,
//       name: 'Black Sweatshirt x 2',
//       color: 'Black',
//       price: 3300,
//       image: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=100&h=100&fit=crop'
//     }
//   ];

//   const subtotal = 10000;
//   const savings = 3550;
//   const shipping = 50;
//   const total = 10050;

//   return (
//     <div className="min-h-screen bg-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <h1 className="text-2xl font-semibold mb-8 border-l-4 border-gray-800 pl-4">Check Out</h1>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Left Column - Billing & Payment */}
//           <div className="lg:col-span-2 space-y-8">
//             {/* Billing Details */}
//             <div>
//               <h2 className="text-xl font-semibold mb-6">Billing Details</h2>

//               {/* Address Display */}
//               <div className="bg-gray-50 p-4 rounded-lg mb-6 flex items-start gap-3">
//                 <div className="bg-white p-2 rounded">
//                   <MapPin className="w-5 h-5" />
//                 </div>
//                 <div>
//                   <p className="font-semibold">Raja</p>
//                   <p className="text-sm text-gray-600">
//                     Address: 49 Featherstone Street, London EC1Y 8SY, United Kingdom<br />
//                     Area - EC1Y, London, United Kingdom<br />
//                     Phone No - 0123456789
//                   </p>
//                 </div>
//               </div>

//               {/* Form Fields */}
//               <div className="space-y-4">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       First Name*
//                     </label>
//                     <input
//                       type="text"
//                       placeholder="First Name"
//                       className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-900 focus:border-transparent"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Last Name*
//                     </label>
//                     <input
//                       type="text"
//                       placeholder="Last Name"
//                       className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-900 focus:border-transparent"
//                     />
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Country / Region*
//                     </label>
//                     <input
//                       type="text"
//                       placeholder="Country / Region"
//                       className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-900 focus:border-transparent"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Company Name
//                     </label>
//                     <input
//                       type="text"
//                       placeholder="Company (optional)"
//                       className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-900 focus:border-transparent"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Street Address*
//                   </label>
//                   <input
//                     type="text"
//                     placeholder="House number and street name"
//                     className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-900 focus:border-transparent"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Apt, suite, unit
//                   </label>
//                   <input
//                     type="text"
//                     placeholder="apartment, suite, unit, etc. (optional)"
//                     className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-900 focus:border-transparent"
//                   />
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       City*
//                     </label>
//                     <input
//                       type="text"
//                       placeholder="Town / City"
//                       className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-900 focus:border-transparent"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       State*
//                     </label>
//                     <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-900 focus:border-transparent">
//                       <option>State</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Postal Code*
//                     </label>
//                     <input
//                       type="text"
//                       placeholder="Postal Code"
//                       className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-900 focus:border-transparent"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Phone*
//                   </label>
//                   <input
//                     type="tel"
//                     placeholder="Phone"
//                     className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-900 focus:border-transparent"
//                   />
//                 </div>

//                 <button className="bg-blue-900 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-800 transition-colors">
//                   Continue to Delivery
//                 </button>

//                 <label className="flex items-center gap-2 text-sm text-gray-600">
//                   <input type="checkbox" className="rounded" />
//                   Save my information for a faster checkout
//                 </label>
//               </div>
//             </div>

//             {/* Shipping Address */}
//             <div className="bg-gray-50 p-6 rounded-lg">
//               <h2 className="text-lg font-semibold mb-2">Shipping Address</h2>
//               <p className="text-sm text-gray-600 mb-4">
//                 Select the address that matches your card or payment method.
//               </p>

//               <div className="space-y-3">
//                 <label className="flex items-center gap-3 p-4 bg-white rounded-lg cursor-pointer">
//                   <input
//                     type="radio"
//                     name="shipping"
//                     value="same"
//                     checked={shippingOption === 'same'}
//                     onChange={(e) => setShippingOption(e.target.value)}
//                     className="w-4 h-4"
//                   />
//                   <span className="text-sm font-medium">Same as Billing address</span>
//                 </label>

//                 <label className="flex items-center gap-3 p-4 bg-white rounded-lg cursor-pointer">
//                   <input
//                     type="radio"
//                     name="shipping"
//                     value="different"
//                     checked={shippingOption === 'different'}
//                     onChange={(e) => setShippingOption(e.target.value)}
//                     className="w-4 h-4"
//                   />
//                   <span className="text-sm font-medium">Use a different shipping address</span>
//                 </label>
//               </div>
//             </div>

//             {/* Shipping Method */}
//             <div className="bg-gray-50 p-6 rounded-lg">
//               <h2 className="text-lg font-semibold mb-4">Shipping Method</h2>

//               <div className="bg-white p-4 rounded-lg mb-4">
//                 <p className="text-sm font-medium">Arrives by Monday, June 7</p>
//               </div>

//               <div className="bg-white p-4 rounded-lg">
//                 <div className="flex justify-between items-center">
//                   <div>
//                     <p className="font-medium">Delivery Charges</p>
//                     <p className="text-xs text-gray-500">Additional fess may apply</p>
//                   </div>
//                   <p className="font-semibold">₹50</p>
//                 </div>
//               </div>
//             </div>

//             {/* Payment Method */}
//             <div className="bg-gray-50 p-6 rounded-lg">
//               <h2 className="text-lg font-semibold mb-2">Payment Method</h2>
//               <p className="text-sm text-gray-600 mb-4">
//                 All transactions are secure and encrypted.
//               </p>

//               <div className="space-y-3">
//                 {/* Credit Card */}
//                 <div className="bg-white rounded-lg overflow-hidden">
//                   <label className="flex items-center gap-3 p-4 cursor-pointer">
//                     <input
//                       type="radio"
//                       name="payment"
//                       value="credit"
//                       checked={paymentMethod === 'credit'}
//                       onChange={(e) => setPaymentMethod(e.target.value)}
//                       className="w-4 h-4"
//                     />
//                     <div className="flex-1">
//                       <p className="font-medium">Credit Card</p>
//                       <p className="text-xs text-gray-500">We accept all major credit cards.</p>
//                     </div>
//                     <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className="h-6" />
//                   </label>

//                   {paymentMethod === 'credit' && (
//                     <div className="p-4 border-t space-y-4">
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <input
//                           type="text"
//                           placeholder="Card number"
//                           className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-900 focus:border-transparent"
//                         />
//                         <input
//                           type="text"
//                           placeholder="Name of card"
//                           className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-900 focus:border-transparent"
//                         />
//                       </div>
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <input
//                           type="text"
//                           placeholder="Expiration date (MM/YY)"
//                           className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-900 focus:border-transparent"
//                         />
//                         <input
//                           type="text"
//                           placeholder="Security Code"
//                           className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-900 focus:border-transparent"
//                         />
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 {/* UPI */}
//                 <label className="flex items-center gap-3 p-4 bg-white rounded-lg cursor-pointer">
//                   <input
//                     type="radio"
//                     name="payment"
//                     value="upi"
//                     checked={paymentMethod === 'upi'}
//                     onChange={(e) => setPaymentMethod(e.target.value)}
//                     className="w-4 h-4"
//                   />
//                   <div className="flex-1">
//                     <p className="font-medium">UPI</p>
//                     <p className="text-xs text-gray-500">Pay with Google Pay, Phone Pe, Paytm...</p>
//                   </div>
//                 </label>

//                 {/* Cash on Delivery */}
//                 <label className="flex items-center gap-3 p-4 bg-white rounded-lg cursor-pointer">
//                   <input
//                     type="radio"
//                     name="payment"
//                     value="cod"
//                     checked={paymentMethod === 'cod'}
//                     onChange={(e) => setPaymentMethod(e.target.value)}
//                     className="w-4 h-4"
//                   />
//                   <div className="flex-1">
//                     <p className="font-medium">Cash on delivery</p>
//                     <p className="text-xs text-gray-500">Pay with cash upon delivery.</p>
//                   </div>
//                 </label>
//               </div>

//               <button className="w-full bg-blue-900 text-white py-4 rounded-md font-semibold text-lg mt-6 hover:bg-blue-800 transition-colors">
//                 Pay Now
//               </button>
//             </div>
//           </div>

//           {/* Right Column - Order Summary */}
//           <div className="lg:col-span-1">
//             <div className="bg-gray-50 p-6 rounded-lg sticky top-4">
//               <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

//               {/* Order Items */}
//               <div className="space-y-4 mb-6">
//                 {orderItems.map((item) => (
//                   <div key={item.id} className="flex gap-4">
//                     <img
//                       src={item.image}
//                       alt={item.name}
//                       className="w-16 h-16 object-cover rounded"
//                     />
//                     <div className="flex-1">
//                       <p className="text-sm font-medium">{item.name}</p>
//                       <p className="text-xs text-gray-500">Color : {item.color}</p>
//                     </div>
//                     <p className="font-semibold">₹{item.price.toLocaleString()}</p>
//                   </div>
//                 ))}
//               </div>

//               {/* Summary */}
//               <div className="space-y-2 border-t pt-4">
//                 <div className="flex justify-between text-sm">
//                   <span className="text-gray-600">Subtotal ( 5 items )</span>
//                   <span className="font-medium">₹{subtotal.toLocaleString()}</span>
//                 </div>
//                 <div className="flex justify-between text-sm">
//                   <span className="text-gray-600">Savings</span>
//                   <span className="font-medium text-green-600">-₹{savings.toLocaleString()}</span>
//                 </div>
//                 <div className="flex justify-between text-sm">
//                   <span className="text-gray-600">Shipping</span>
//                   <span className="font-medium">₹{shipping}</span>
//                 </div>
//                 <div className="flex justify-between text-lg font-bold border-t pt-2 mt-2">
//                   <span>Total</span>
//                   <span>₹{total.toLocaleString()}</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

//new checkoutpage

import React, { useState, useEffect } from "react";
import { MapPin, Check } from "lucide-react";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "../../context/AuthContext";
import { subscribeToCart } from "../../services/CartService";

export default function CheckoutPage() {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [collectionName, setCollectionName] = useState("");

  // Billing form state
  const [useBillingAddressAsDefault, setUseBillingAddressAsDefault] =
    useState(true);
  const [billingFormData, setBillingFormData] = useState({
    firstName: "",
    lastName: "",
    country: "",
    company: "",
    streetAddress: "",
    aptSuite: "",
    city: "",
    state: "",
    postalCode: "",
    phone: "",
  });

  // Shipping options
  const [shippingOption, setShippingOption] = useState("same");
  const [shippingFormData, setShippingFormData] = useState({
    firstName: "",
    lastName: "",
    country: "",
    company: "",
    streetAddress: "",
    aptSuite: "",
    city: "",
    state: "",
    postalCode: "",
    phone: "",
  });

  // Payment options
  const [paymentMethod, setPaymentMethod] = useState("credit");
  const [saveInfo, setSaveInfo] = useState(false);
  const [deliveryConfirmed, setDeliveryConfirmed] = useState(false);

  // Fetch user data
  useEffect(() => {
    if (!user) return;

    const fetchUserData = async () => {
      try {
        let ref = doc(db, "b2c_users", user.uid);
        let snap = await getDoc(ref);

        if (snap.exists()) {
          setCollectionName("b2c_users");
          setUserData(snap.data());
        } else {
          ref = doc(db, "B2BBulkOrders_users", user.uid);
          snap = await getDoc(ref);
          if (snap.exists()) {
            setCollectionName("B2BBulkOrders_users");
            setUserData(snap.data());
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [user]);

  // Subscribe to cart
  useEffect(() => {
    let unsubscribe = null;

    const setupSubscription = async () => {
      try {
        unsubscribe = await subscribeToCart((items) => {
          setCartItems(items);
          setIsLoading(false);
        });
      } catch (error) {
        console.error("Error setting up cart subscription:", error);
        setIsLoading(false);
      }
    };

    setupSubscription();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  // Get default/billing address
  const getBillingAddress = () => {
    if (!userData || !userData.addresses || userData.addresses.length === 0) {
      return null;
    }
    return (
      userData.addresses.find((addr) => addr.isDefault) || userData.addresses[0]
    );
  };

  const billingAddress = getBillingAddress();

  // Handle billing form changes
  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    setBillingFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle shipping form changes
  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.subtotal || 0),
    0
  );
//   const savings = 3550;
  const shipping = cartItems.some((item) => !item.freeShipping) ? 50 : 0;
//   const total = subtotal - savings + shipping;
const total = subtotal + shipping;

  // Continue to Delivery - Save billing details
  const handleContinueToDelivery = async () => {
    if (!user || !collectionName) {
      alert("User not authenticated");
      return;
    }

    try {
      let billingAddressToSave;

      if (useBillingAddressAsDefault && billingAddress) {
        billingAddressToSave = billingAddress;
      } else {
        // Validate billing form
        if (
          !billingFormData.firstName ||
          !billingFormData.lastName ||
          !billingFormData.streetAddress ||
          !billingFormData.city ||
          !billingFormData.state ||
          !billingFormData.postalCode ||
          !billingFormData.phone
        ) {
          alert("Please fill in all required billing fields");
          return;
        }

        billingAddressToSave = {
          id: Date.now(),
          type: "Billing",
          name: `${billingFormData.firstName} ${billingFormData.lastName}`,
          details: `${billingFormData.streetAddress}${
            billingFormData.aptSuite ? ", " + billingFormData.aptSuite : ""
          }, ${billingFormData.city}, ${billingFormData.state} ${
            billingFormData.postalCode
          }, ${billingFormData.country}`,
          phone: billingFormData.phone,
          isBilling: true,
          createdAt: new Date().toISOString(),
        };

        if (saveInfo) {
          const userRef = doc(db, collectionName, user.uid);
          await updateDoc(userRef, {
            addresses: arrayUnion(billingAddressToSave),
          });
        }
      }

      // Save billing details
      const userRef = doc(db, collectionName, user.uid);
      await updateDoc(userRef, {
        currentBillingAddress: billingAddressToSave,
        lastUpdated: new Date().toISOString(),
      });

      setDeliveryConfirmed(true);
      alert("Billing details confirmed! Now select your shipping address.");

      // Scroll to shipping section
      setTimeout(() => {
        document
          .getElementById("shipping-section")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (error) {
      console.error("Error saving billing details:", error);
      alert("Failed to save billing details: " + error.message);
    }
  };

  // Save shipping address and proceed
  const handleSaveShippingAddress = async () => {
    if (!user || !collectionName) {
      alert("User not authenticated");
      return;
    }

    try {
      let shippingAddressToSave;

      if (shippingOption === "same") {
        // Use billing address
        const userRef = doc(db, collectionName, user.uid);
        const userSnap = await getDoc(userRef);
        shippingAddressToSave = userSnap.data()?.currentBillingAddress;
      } else {
        // Validate shipping form
        if (
          !shippingFormData.firstName ||
          !shippingFormData.lastName ||
          !shippingFormData.streetAddress ||
          !shippingFormData.city ||
          !shippingFormData.state ||
          !shippingFormData.postalCode ||
          !shippingFormData.phone
        ) {
          alert("Please fill in all required shipping fields");
          return;
        }

        shippingAddressToSave = {
          id: Date.now(),
          type: "Shipping",
          name: `${shippingFormData.firstName} ${shippingFormData.lastName}`,
          details: `${shippingFormData.streetAddress}${
            shippingFormData.aptSuite ? ", " + shippingFormData.aptSuite : ""
          }, ${shippingFormData.city}, ${shippingFormData.state} ${
            shippingFormData.postalCode
          }, ${shippingFormData.country}`,
          phone: shippingFormData.phone,
          isShipping: true,
          createdAt: new Date().toISOString(),
        };

        if (saveInfo) {
          const userRef = doc(db, collectionName, user.uid);
          await updateDoc(userRef, {
            addresses: arrayUnion(shippingAddressToSave),
          });
        }
      }

      // Save shipping address
      const userRef = doc(db, collectionName, user.uid);
      await updateDoc(userRef, {
        currentShippingAddress: shippingAddressToSave,
        lastUpdated: new Date().toISOString(),
      });

      alert("Shipping address saved successfully!");
    } catch (error) {
      console.error("Error saving shipping address:", error);
      alert("Failed to save shipping address: " + error.message);
    }
  };

  ///got form the firebase
  function loadRazorpayScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}


  // Handle payment
//   const handlePayNow = async () => {
//     if (cartItems.length === 0) {
//       alert("Your cart is empty");
//       return;
//     }

//     if (!deliveryConfirmed) {
//       alert("Please confirm billing details first");
//       return;
//     }

//     alert("Payment processing will be integrated here");
//   };
const handlePayNow = async () => {
  if (cartItems.length === 0) {
    alert("Your cart is empty");
    return;
  }

  if (!deliveryConfirmed) {
    alert("Please confirm billing details first");
    return;
  }

  const isLoaded = await loadRazorpayScript("https://checkout.razorpay.com/v1/checkout.js");
  if (!isLoaded) {
    alert("Razorpay SDK failed to load");
    return;
  }

  try {
    // Call Firebase Function to create Razorpay order
    const response = await fetch("https://YOUR_FIREBASE_FUNCTION_URL/createOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: total * 100, // amount in paise
        currency: "INR",
        receipt: `receipt_order_${Date.now()}`,
      }),
    });

    const orderData = await response.json();

    if (!orderData || !orderData.id) {
      alert("Could not create order. Please try again.");
      return;
    }

    const options = {
      key: "YOUR_RAZORPAY_KEY_ID", // Enter the Key ID generated from the Razorpay Dashboard
      amount: orderData.amount.toString(),
      currency: orderData.currency,
      name: "Your Store Name",
      description: "Purchase",
      order_id: orderData.id,
      handler: async function (response) {
        // You can call backend to verify payment and update order status here
        const verifyResponse = await fetch("https://YOUR_FIREBASE_FUNCTION_URL/verifyPayment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(response),
        });

        const verifyResult = await verifyResponse.json();

        if (verifyResult.success) {
          alert("Payment successful!");
          // You can redirect or clear cart here if needed
        } else {
          alert("Payment verification failed. Please contact support.");
        }
      },
      prefill: {
        name: billingAddress?.name || "",
        email: user?.email || "",
        contact: billingAddress?.phone || "",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  } catch (error) {
    console.error("Error in Razorpay payment", error);
    alert("Payment failed: " + error.message);
  }
};


  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-600">Loading checkout...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-semibold mb-8 border-l-4 border-gray-800 pl-4">
          Check Out
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Billing & Shipping & Payment */}
          <div className="lg:col-span-2 space-y-8">
            {/* Billing Details */}
            <div>
              <h2 className="text-xl font-semibold mb-6">Billing Details</h2>

              {/* Default/Billing Address Display with Checkbox */}
              {/* {billingAddress && (
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <div className="flex items-center h-6">
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={useBillingAddressAsDefault}
                          onChange={(e) => setUseBillingAddressAsDefault(e.target.checked)}
                          className="w-5 h-5 border-2 border-gray-400 rounded appearance-none checked:bg-blue-600 checked:border-blue-600 cursor-pointer"
                        />
                        {useBillingAddressAsDefault && (
                          <Check className="w-4 h-4 text-white absolute top-0.5 left-0.5 pointer-events-none" />
                        )}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start gap-3">
                        <div className="bg-white p-2 rounded">
                          <MapPin className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-semibold">{billingAddress.name}</p>
                          <p className="text-sm text-gray-600">
                            Address: {billingAddress.details}<br />
                            Phone No: {billingAddress.phone}
                          </p>
                        </div>
                      </div>
                    </div>
                  </label>
                </div>
              )} */}
              {/* Default/Billing Address Display with Checkbox */}
              {billingAddress && (
                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                  <label className="flex items-start gap-3 cursor-pointer">
                    {/* Custom Checkbox */}
                    <div className="flex items-center h-6">
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={useBillingAddressAsDefault}
                          onChange={(e) =>
                            setUseBillingAddressAsDefault(e.target.checked)
                          }
                          className="peer w-5 h-5 border-2 border-gray-400 rounded appearance-none cursor-pointer checked:border-blue-600"
                        />
                        {/* Checkmark Icon */}
                        {useBillingAddressAsDefault && (
                          <svg
                            className="w-4 h-4 text-blue-600 absolute top-0.5 left-0.5 pointer-events-none"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={3}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </div>
                    </div>

                    {/* Address Details */}
                    <div className="flex-1">
                      <p className="font-bold text-gray-900">
                        {billingAddress.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        Address: {billingAddress.details}
                      </p>
                      <p className="text-sm text-gray-600">
                        Phone No: {billingAddress.phone}
                      </p>
                    </div>
                  </label>
                </div>
              )}

              {/* Billing Address Form - Show if checkbox unchecked */}
              {!useBillingAddressAsDefault && (
                <div className="space-y-4 mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name*
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={billingFormData.firstName}
                        onChange={handleBillingChange}
                        placeholder="First Name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name*
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={billingFormData.lastName}
                        onChange={handleBillingChange}
                        placeholder="Last Name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Country / Region*
                      </label>
                      <input
                        type="text"
                        name="country"
                        value={billingFormData.country}
                        onChange={handleBillingChange}
                        placeholder="Country / Region"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={billingFormData.company}
                        onChange={handleBillingChange}
                        placeholder="Company (optional)"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Street Address*
                    </label>
                    <input
                      type="text"
                      name="streetAddress"
                      value={billingFormData.streetAddress}
                      onChange={handleBillingChange}
                      placeholder="House number and street name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Apt, suite, unit
                    </label>
                    <input
                      type="text"
                      name="aptSuite"
                      value={billingFormData.aptSuite}
                      onChange={handleBillingChange}
                      placeholder="apartment, suite, unit, etc. (optional)"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City*
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={billingFormData.city}
                        onChange={handleBillingChange}
                        placeholder="Town / City"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        State*
                      </label>
                      <select
                        name="state"
                        value={billingFormData.state}
                        onChange={handleBillingChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                      >
                        <option value="">State</option>
                        <option value="California">California</option>
                        <option value="Texas">Texas</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Postal Code*
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        value={billingFormData.postalCode}
                        onChange={handleBillingChange}
                        placeholder="Postal Code"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone*
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={billingFormData.phone}
                      onChange={handleBillingChange}
                      placeholder="Phone"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                    />
                  </div>
                </div>
              )}

              <button
                onClick={handleContinueToDelivery}
                className="bg-blue-900 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-800 transition-colors"
              >
                Continue to Delivery
              </button>

              <label className="flex items-center gap-2 text-sm text-gray-600 mt-4">
                <input
                  type="checkbox"
                  checked={saveInfo}
                  onChange={(e) => setSaveInfo(e.target.checked)}
                  className="rounded"
                />
                Save my information for a faster checkout
              </label>
            </div>

            {/* Shipping Address Section */}
            <div id="shipping-section" className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-lg font-semibold mb-2">Shipping Address</h2>
              <p className="text-sm text-gray-600 mb-4">
                Select the address that matches your card or payment method.
              </p>

              <div className="space-y-3">
                <label className="flex items-center gap-3 p-4 bg-white rounded-lg cursor-pointer border-2 border-transparent hover:border-gray-200 transition-colors">
                  <input
                    type="radio"
                    name="shipping"
                    value="same"
                    checked={shippingOption === "same"}
                    onChange={(e) => setShippingOption(e.target.value)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-medium">
                    Same as Billing address
                  </span>
                </label>

                <label className="flex items-center gap-3 p-4 bg-white rounded-lg cursor-pointer border-2 border-transparent hover:border-gray-200 transition-colors">
                  <input
                    type="radio"
                    name="shipping"
                    value="different"
                    checked={shippingOption === "different"}
                    onChange={(e) => setShippingOption(e.target.value)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-medium">
                    Use a different shipping address
                  </span>
                </label>
              </div>

              {/* Different Shipping Address Form */}
              {shippingOption === "different" && (
                <div className="mt-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name*
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={shippingFormData.firstName}
                        onChange={handleShippingChange}
                        placeholder="First Name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name*
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={shippingFormData.lastName}
                        onChange={handleShippingChange}
                        placeholder="Last Name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Country / Region*
                      </label>
                      <input
                        type="text"
                        name="country"
                        value={shippingFormData.country}
                        onChange={handleShippingChange}
                        placeholder="Country / Region"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={shippingFormData.company}
                        onChange={handleShippingChange}
                        placeholder="Company (optional)"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Street Address*
                    </label>
                    <input
                      type="text"
                      name="streetAddress"
                      value={shippingFormData.streetAddress}
                      onChange={handleShippingChange}
                      placeholder="House number and street name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Apt, suite, unit
                    </label>
                    <input
                      type="text"
                      name="aptSuite"
                      value={shippingFormData.aptSuite}
                      onChange={handleShippingChange}
                      placeholder="apartment, suite, unit, etc. (optional)"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City*
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={shippingFormData.city}
                        onChange={handleShippingChange}
                        placeholder="Town / City"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        State*
                      </label>
                      <select
                        name="state"
                        value={shippingFormData.state}
                        onChange={handleShippingChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                      >
                        <option value="">State</option>
                        <option value="California">California</option>
                        <option value="Texas">Texas</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Postal Code*
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        value={shippingFormData.postalCode}
                        onChange={handleShippingChange}
                        placeholder="Postal Code"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone*
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={shippingFormData.phone}
                      onChange={handleShippingChange}
                      placeholder="Phone"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                    />
                  </div>
                </div>
              )}

              <button
                onClick={handleSaveShippingAddress}
                className="w-full bg-blue-900 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-800 transition-colors mt-4"
              >
                Confirm Shipping Address
              </button>
            </div>

            {/* Shipping Method */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-lg font-semibold mb-4">Shipping Method</h2>

              <div className="bg-white p-4 rounded-lg mb-4">
                <p className="text-sm font-medium">Arrives by Monday, June 7</p>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Delivery Charges</p>
                    <p className="text-xs text-gray-500">
                      Additional fees may apply
                    </p>
                  </div>
                  <p className="font-semibold">₹{shipping}</p>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-lg font-semibold mb-2">Payment Method</h2>
              <p className="text-sm text-gray-600 mb-4">
                All transactions are secure and encrypted.
              </p>

              <div className="space-y-3">
                {/* Credit Card */}
                <div className="bg-white rounded-lg overflow-hidden">
                  <label className="flex items-center gap-3 p-4 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="credit"
                      checked={paymentMethod === "credit"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4"
                    />
                    <div className="flex-1">
                      <p className="font-medium">Credit Card</p>
                      <p className="text-xs text-gray-500">
                        We accept all major credit cards.
                      </p>
                    </div>
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg"
                      alt="Visa"
                      className="h-6"
                    />
                  </label>

                  {paymentMethod === "credit" && (
                    <div className="p-4 border-t space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Card number"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                        />
                        <input
                          type="text"
                          placeholder="Name of card"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Expiration date (MM/YY)"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                        />
                        <input
                          type="text"
                          placeholder="Security Code"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* UPI */}
                <label className="flex items-center gap-3 p-4 bg-white rounded-lg cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={paymentMethod === "upi"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4"
                  />
                  <div className="flex-1">
                    <p className="font-medium">UPI</p>
                    <p className="text-xs text-gray-500">
                      Pay with Google Pay, Phone Pe, Paytm...
                    </p>
                  </div>
                </label>

                {/* Cash on Delivery */}
                <label className="flex items-center gap-3 p-4 bg-white rounded-lg cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4"
                  />
                  <div className="flex-1">
                    <p className="font-medium">Cash on delivery</p>
                    <p className="text-xs text-gray-500">
                      Pay with cash upon delivery.
                    </p>
                  </div>
                </label>
              </div>

              <button
                onClick={handlePayNow}
                className="w-full bg-blue-900 text-white py-4 rounded-md font-semibold text-lg mt-6 hover:bg-blue-800 transition-colors"
              >
                Pay Now
              </button>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-6 rounded-lg sticky top-4">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

              {/* Order Items */}
              <div className="space-y-4 mb-6">
                {cartItems.length > 0 ? (
                  cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <img
                        src={
                          item.imageUrls && item.imageUrls.length > 0
                            ? item.imageUrls[0]
                            : "https://via.placeholder.com/64"
                        }
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{item.name}</p>
                        <p className="text-xs text-gray-500">
                          Color: {item.color || "N/A"}
                        </p>
                      </div>
                      <p className="font-semibold">
                        ₹{(item.price || 0).toLocaleString()}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No items in cart</p>
                )}
              </div>

              {/* Summary */}
              <div className="space-y-2 border-t pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    Subtotal ({cartItems.length} items)
                  </span>
                  <span className="font-medium">
                    ₹{subtotal.toLocaleString()}
                  </span>
                </div>
                {/* <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Savings</span>
                  <span className="font-medium text-green-600">
                    -₹{savings.toLocaleString()}
                  </span>
                </div> */}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">₹{shipping}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-2 mt-2">
                  <span>Total</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
