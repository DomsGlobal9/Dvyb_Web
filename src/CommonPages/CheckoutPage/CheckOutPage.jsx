import React, { useState, useEffect } from "react";
import { MapPin, Check } from "lucide-react";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "../../context/AuthContext";
import { subscribeToCart, clearCart } from "../../services/CartService";
import { createOrder } from "../../services/OrderService";
import { useNavigate } from "react-router-dom";

import { getFunctions, httpsCallable } from "firebase/functions";
import { app } from "../../firebase";
// import { connectFunctionsEmulator } from "firebase/functions";

export default function CheckoutPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [collectionName, setCollectionName] = useState("");
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
// const functions = getFunctions(app);
const functions = getFunctions(app, "us-central1");

  // Billing form state
  const [useBillingAddressAsDefault, setUseBillingAddressAsDefault] = useState(false);
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
  // const getBillingAddress = () => {
  //   if (!userData || !userData.addresses || userData.addresses.length === 0) {
  //     return null;
  //   }
  //   return userData.addresses.find((addr) => addr.isDefault) || userData.addresses[0];
  // };
const getBillingAddress = () => {
  if (!userData) {
    return null;
  }
  
  if (!userData.addresses || !Array.isArray(userData.addresses) || userData.addresses.length === 0) {
    return null;
  }
  
  const address = userData.addresses.find((addr) => addr.isDefault) || userData.addresses[0];
  
  if (!address || !address.name || !address.details || !address.phone) {
    return null;
  }
  
  return address;
};
  const billingAddress = getBillingAddress();

  // Handle billing form changes
  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    setBillingFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle shipping form changes
  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.subtotal || 0), 0);
  const shipping = cartItems.some((item) => !item.freeShipping) ? 50 : 0;
  const total = subtotal + shipping;
  console.log(total,"total..............")

  // Continue to Delivery - Save billing details
  const handleContinueToDelivery = async () => {
    if (!user || !collectionName) {
      alert("User not authenticated");
      return;
    }

    try {
      let billingAddressToSave;

      // Check if using default address and it exists
      if (useBillingAddressAsDefault && billingAddress) {
        billingAddressToSave = billingAddress;
      } else {
        // Validate billing form - required for new users or custom address
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
          }, ${billingFormData.country || ""}`,
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

      const userRef = doc(db, collectionName, user.uid);
      await updateDoc(userRef, {
        currentBillingAddress: billingAddressToSave,
        lastUpdated: new Date().toISOString(),
      });

      setDeliveryConfirmed(true);
      alert("Billing details confirmed! Now select your shipping address.");

      setTimeout(() => {
        document.getElementById("shipping-section")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (error) {
      console.error("Error saving billing details:", error);
      alert("Failed to save billing details: " + error.message);
    }
  };

  // Save shipping address
  const handleSaveShippingAddress = async () => {
    if (!user || !collectionName) {
      alert("User not authenticated");
      return;
    }

    try {
      let shippingAddressToSave;

      if (shippingOption === "same") {
        const userRef = doc(db, collectionName, user.uid);
        const userSnap = await getDoc(userRef);
        shippingAddressToSave = userSnap.data()?.currentBillingAddress;
      } else {
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

  // Handle payment - CREATE ORDER
  // const handlePayNow = async () => {
  //   if (cartItems.length === 0) {
  //     alert("Your cart is empty");
  //     return;
  //   }

  //   if (!deliveryConfirmed) {
  //     alert("Please confirm billing details first by clicking 'Continue to Delivery'");
  //     return;
  //   }

  //   // Verify addresses are saved in Firebase before proceeding
  //   try {
  //     const userRef = doc(db, collectionName, user.uid);
  //     const userSnap = await getDoc(userRef);
  //     const userData = userSnap.data();

  //     if (!userData?.currentBillingAddress) {
  //       alert("Please confirm your billing address first");
  //       return;
  //     }

  //     if (!userData?.currentShippingAddress && shippingOption !== "same") {
  //       alert("Please confirm your shipping address by clicking 'Confirm Shipping Address'");
  //       return;
  //     }

  //     setIsProcessingPayment(true);

  //     const billingAddr = userData.currentBillingAddress;
  //     const shippingAddr = userData.currentShippingAddress || billingAddr;

  //     // Prepare products array from cart
  //     const products = cartItems.map(item => ({
  //       productId: item.productId || item.id,
  //       name: item.name || item.title || "Product",
  //       color: item.color || "N/A",
  //       size: item.size || "N/A",
  //       quantity: item.quantity || 1,
  //       price: item.price || 0,
  //       image: (item.imageUrls && item.imageUrls[0]) || item.image || "https://via.placeholder.com/80",
  //       subtotal: item.subtotal || 0
  //     }));

  //     // Prepare order data
  //     const orderData = {
  //       products,
  //       billingAddress: billingAddr,
  //       shippingAddress: shippingAddr,
  //       paymentMethod,
  //       subtotal,
  //       shipping,
  //       total,
  //       estimatedDelivery: "Within 5-7 business days"
  //     };

  //     // Create order in Firebase
  //     const result = await createOrder(orderData);

  //     if (result.success) {
  //       // Clear the cart after successful order
  //       await clearCart();
        
  //       alert(`Order placed successfully! Order ID: ${result.orderId}`);
        
  //       // Navigate to orders page
  //       navigate("/");
  //     }
  //   } catch (error) {
  //     console.error("Error placing order:", error);
  //     alert("Failed to place order: " + error.message);
  //   } finally {
  //     setIsProcessingPayment(false);
  //   }
  // };


  

  const handlePayNow = async () => {
  if (cartItems.length === 0) {
    alert("Your cart is empty");
    return;
  }
  if (!deliveryConfirmed) {
    alert("Please confirm billing details first by clicking 'Continue to Delivery'");
    return;
  }

//   if (window.location.hostname === "localhost") {
//   connectFunctionsEmulator(functions, "localhost", 5001);
// }

  try {
    // Validate addresses again (same as your existing checks)
    const userRef = doc(db, collectionName, user.uid);
    const userSnap = await getDoc(userRef);
    const userData = userSnap.data();
    if (!userData?.currentBillingAddress) {
      alert("Please confirm your billing address first");
      return;
    }
    if (!userData?.currentShippingAddress && shippingOption !== "same") {
      alert("Please confirm your shipping address by clicking 'Confirm Shipping Address'");
      return;
    }

    setIsProcessingPayment(true);

    const billingAddr = userData.currentBillingAddress;
    const shippingAddr = userData.currentShippingAddress || billingAddr;

    const products = cartItems.map(item => ({
      productId: item.productId || item.id,
      name: item.name || item.title || "Product",
      color: item.color || "N/A",
      size: item.size || "N/A",
      quantity: item.quantity || 1,
      price: item.price || 0,
      image: (item.imageUrls && item.imageUrls[0]) || item.image || "https://via.placeholder.com/80",
      subtotal: item.subtotal || 0
    }));

    const orderData = {
      products, billingAddress: billingAddr, shippingAddress: shippingAddr,
      paymentMethod, subtotal, shipping, total, estimatedDelivery: "Within 5-7 business days"
    };

    // If COD -> use your server/firestore createOrder flow (no Razorpay)
    if (paymentMethod === "cod") {
      const res = await createOrder(orderData); // keep your existing service (server-side)
      if (res.success) {
        await clearCart();
        alert(`Order placed successfully! Order ID: ${res.orderId}`);
        navigate("/"); // or order success page
      }
      return;
    }

    // Prepaid (credit/upi) -> call cloud function to create Razorpay order
    // const createRzpOrder = httpsCallable(functions, "createRazorpayOrder");

    // Make sure total is a number
console.log("Total amount:", total, "Type:", typeof total);

const createRzpOrder = httpsCallable(functions, "createRazorpayOrder");
const createRes = await createRzpOrder({ 
  amount: Number(total) // Ensure it's a number
});
    
    // console.log(amount,"amount..")
// const res = await createRzpOrder({ amount: total });

    if (!createRes.data?.success) throw new Error("Failed to create Razorpay order on server");

    const rzpOrder = createRes.data.order; // raw order object from Razorpay
    // OPEN RAZORPAY CHECKOUT

    // const options = {
    //   key: import.meta.env.REACT_APP_RAZORPAY_KEY_ID, // public key from .env
    //   amount: rzpOrder.amount, // paise (Razorpay returns paise)
    //   currency: rzpOrder.currency,
    //   name: "Your Store Name",
    //   description: "Order Payment",
    //   order_id: rzpOrder.id,
    //   handler: async function (response) {
    //     try {
    //       // response = { razorpay_payment_id, razorpay_order_id, razorpay_signature }
    //       const verifyFn = httpsCallable(functions, "verifyRazorpayPayment");
    //       const verifyRes = await verifyFn({
    //         ...response,
    //         orderData,
    //       });
    //       console.log(verifyRes,"verfigyResssss..")

    //       if (verifyRes.data?.success) {
    //         // Payment verified and Firestore order created server-side
    //         await clearCart();
    //         alert("Payment successful! Order ID: " + verifyRes.data.orderId);
    //         navigate("/"); // or a success page
    //       } else {
    //         alert("Payment verification failed.");
    //         console.error("verifyRes:", verifyRes);
    //       }
    //     } catch (err) {
    //       console.error("verify error:", err);
    //       alert("Payment verification failed: " + err.message);
    //     }
    //   },
    //   prefill: {
    //     name: billingAddr.name || "",
    //     email: user.email || "",
    //     contact: billingAddr.phone || ""
    //   },
    //   theme: { color: "#0b5cff" }
    // };

//     // Determine which env variable system you're using
// const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY_ID 
const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY_ID;
console.log("Razorpay Key:", RAZORPAY_KEY); // Debug log

if (!RAZORPAY_KEY) {
  alert("Razorpay key not configured. Please add VITE_RAZORPAY_KEY_ID to .env file");
  return;
}

const options = {
  key: RAZORPAY_KEY, // Use the correct env variable
  amount: rzpOrder.amount,
  currency: rzpOrder.currency,
  name: "Your Store Name",
  description: "Order Payment",
  order_id: rzpOrder.id,
  handler: async function (response) {
    try {
      const verifyFn = httpsCallable(functions, "verifyRazorpayPayment");
      const verifyRes = await verifyFn({
        ...response,
        orderData,
      });

      if (verifyRes.data?.success) {
        await clearCart();
        alert("Payment successful! Order ID: " + verifyRes.data.orderId);
        navigate("/");
      } else {
        alert("Payment verification failed.");
      }
    } catch (err) {
      console.error("Verification error:", err);
      alert("Payment verification failed: " + err.message);
    }
  },
  prefill: {
    name: billingAddr.name || "",
    email: user.email || "",
    contact: billingAddr.phone || ""
  },
  theme: { color: "#0b5cff" }
};

if (!window.Razorpay) {
  alert("Razorpay SDK not loaded. Please refresh the page.");
  return;
}



    const rzp = new window.Razorpay(options);
    rzp.on("payment.failed", function (response) {
      console.error("payment.failed:", response);
      alert("Payment failed: " + (response.error?.description || "Unknown error"));
    });

    rzp.open();
  } catch (error) {
    console.error("Checkout error", error);
    alert("Checkout failed: " + error.message);
  } finally {
    setIsProcessingPayment(false);
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
          <div className="lg:col-span-2 space-y-8">
            {/* Billing Details */}
            <div>
              <h2 className="text-xl font-semibold mb-6">Billing Details</h2>

              {billingAddress && (
                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <div className="flex items-center h-6">
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={useBillingAddressAsDefault}
                          onChange={(e) => setUseBillingAddressAsDefault(e.target.checked)}
                          className="peer w-5 h-5 border-2 border-gray-400 rounded appearance-none cursor-pointer checked:border-blue-600"
                        />
                        {useBillingAddressAsDefault && (
                          <svg
                            className="w-4 h-4 text-blue-600 absolute top-0.5 left-0.5 pointer-events-none"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={3}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-900">{billingAddress.name}</p>
                      <p className="text-sm text-gray-600">Address: {billingAddress.details}</p>
                      <p className="text-sm text-gray-600">Phone No: {billingAddress.phone}</p>
                    </div>
                  </label>
                </div>
              )}

              {/* Show form if no saved address OR checkbox is unchecked */}
              {(!billingAddress || !useBillingAddressAsDefault) && (
                <div className="space-y-4 mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="firstName"
                      value={billingFormData.firstName}
                      onChange={handleBillingChange}
                      placeholder="First Name*"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                      required
                    />
                    <input
                      type="text"
                      name="lastName"
                      value={billingFormData.lastName}
                      onChange={handleBillingChange}
                      placeholder="Last Name*"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <input
                    type="text"
                    name="country"
                    value={billingFormData.country}
                    onChange={handleBillingChange}
                    placeholder="Country / Region*"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                  <input
                    type="text"
                    name="company"
                    value={billingFormData.company}
                    onChange={handleBillingChange}
                    placeholder="Company (optional)"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                  <input
                    type="text"
                    name="streetAddress"
                    value={billingFormData.streetAddress}
                    onChange={handleBillingChange}
                    placeholder="Street Address*"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    required
                  />
                  <input
                    type="text"
                    name="aptSuite"
                    value={billingFormData.aptSuite}
                    onChange={handleBillingChange}
                    placeholder="Apt, suite, unit (optional)"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                      type="text"
                      name="city"
                      value={billingFormData.city}
                      onChange={handleBillingChange}
                      placeholder="City*"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                      required
                    />
                    <input
                      type="text"
                      name="state"
                      value={billingFormData.state}
                      onChange={handleBillingChange}
                      placeholder="State*"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                      required
                    />
                    <input
                      type="text"
                      name="postalCode"
                      value={billingFormData.postalCode}
                      onChange={handleBillingChange}
                      placeholder="Postal Code*"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={billingFormData.phone}
                    onChange={handleBillingChange}
                    placeholder="Phone*"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
              )}

              <button
                onClick={handleContinueToDelivery}
                className="bg-blue-900 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-800"
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

            {/* Shipping Address */}
            <div id="shipping-section" className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-4 bg-white rounded-lg cursor-pointer">
                  <input
                    type="radio"
                    name="shipping"
                    value="same"
                    checked={shippingOption === "same"}
                    onChange={(e) => setShippingOption(e.target.value)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-medium">Same as Billing address</span>
                </label>
                <label className="flex items-center gap-3 p-4 bg-white rounded-lg cursor-pointer">
                  <input
                    type="radio"
                    name="shipping"
                    value="different"
                    checked={shippingOption === "different"}
                    onChange={(e) => setShippingOption(e.target.value)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-medium">Use a different shipping address</span>
                </label>
              </div>

              {/* Different Shipping Address Form - FIXED */}
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
                className="w-full bg-blue-900 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-800 mt-4"
              >
                Confirm Shipping Address
              </button>
            </div>

            {/* Payment Method */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-4 bg-white rounded-lg cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="credit"
                    checked={paymentMethod === "credit"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4"
                  />
                  <span className="font-medium">Credit Card</span>
                </label>
                <label className="flex items-center gap-3 p-4 bg-white rounded-lg cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={paymentMethod === "upi"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4"
                  />
                  <span className="font-medium">UPI</span>
                </label>
                <label className="flex items-center gap-3 p-4 bg-white rounded-lg cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4"
                  />
                  <span className="font-medium">Cash on Delivery</span>
                </label>
              </div>

              <button
                onClick={handlePayNow}
                disabled={isProcessingPayment}
                className="w-full bg-blue-900 text-white py-4 rounded-md font-semibold text-lg mt-6 hover:bg-blue-800 disabled:bg-gray-400"
              >
                {isProcessingPayment ? "Processing..." : "Pay Now"}
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-6 rounded-lg sticky top-4">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <img
                      src={item.imageUrls?.[0] || "https://via.placeholder.com/64"}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold">₹{item.subtotal?.toLocaleString()}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-2 border-t pt-4">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>₹{shipping}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-2">
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