import React, { useState } from 'react';
import { Filter } from 'lucide-react';
import OrderDetails from './OrderDetails';

const MyOrders = () => {
  const [activeTab, setActiveTab] = useState('Active');
  const [showFilter, setShowFilter] = useState(false);
  const [selectedDateFilter, setSelectedDateFilter] = useState('Last Week');
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const tabs = ['Active', 'Delivered', 'Cancelled', 'Returned'];
  
  const allOrders = {
    'Active': [
      {
        id: '#123456789',
        date: '15 January 2024, 2:30 PM',
        estimatedDelivery: '18 January 2024',
        status: 'Active',
        paymentMethod: 'Cash on delivery',
        product: 'Black Printed T-shirt',
        color: 'Pink',
        qty: 1,
        total: '$20.00',
        image: '/api/placeholder/80/80'
      },
      {
        id: '#123456683',
        date: '5 December 2023, 10:15 AM',
        estimatedDelivery: '8 December 2023',
        status: 'Active',
        paymentMethod: 'Cash on delivery',
        product: 'Black Printed T-shirt',
        color: 'Pink',
        qty: 1,
        total: '$20.00',
        image: '/api/placeholder/80/80'
      }
    ],
    'Delivered': [
      {
        id: '#123456789',
        date: '12 March 2024, 11:20 AM',
        estimatedDelivery: '15 March 2024',
        status: 'Delivered',
        paymentMethod: 'Cash on delivery',
        product: 'Black Printed T-shirt',
        color: 'Pink',
        qty: 1,
        total: '$20.00',
        image: '/api/placeholder/80/80'
      }
    ],
    'Cancelled': [
      {
        id: '#123456789',
        date: '25 February 2024, 6:15 PM',
        estimatedDelivery: '28 February 2024',
        status: 'Cancelled',
        paymentMethod: 'Cash on delivery',
        product: 'Black Printed T-shirt',
        color: 'Pink',
        qty: 1,
        total: '$20.00',
        image: '/api/placeholder/80/80'
      }
    ],
    'Returned': [
      {
        id: '#123456789',
        date: '3 April 2024, 5:50 PM',
        estimatedDelivery: '6 April 2024',
        status: 'Returned',
        paymentMethod: 'Cash on delivery',
        product: 'Black Printed T-shirt',
        color: 'Pink',
        qty: 1,
        total: '$20.00',
        image: '/api/placeholder/80/80'
      }
    ]
  };

  const currentOrders = allOrders[activeTab] || [];
  const orders = isFilterApplied ? filteredOrders : currentOrders;

  const dateFilters = ['Last Week', 'Last Month', 'Last 3 Month', 'Last 6 Month', '2023', '2024'];

  const applyDateFilter = (filterType, ordersList) => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    const currentDate = now.getDate();

    return ordersList.filter(order => {
      const orderDateStr = order.date.split(',')[0];
      const orderDate = new Date(orderDateStr);
      
      if (isNaN(orderDate.getTime())) {
        return false;
      }

      switch (filterType) {
        case 'Last Week':
          const oneWeekAgo = new Date(now);
          oneWeekAgo.setDate(currentDate - 7);
          return orderDate >= oneWeekAgo;
        case 'Last Month':
          const oneMonthAgo = new Date(now);
          oneMonthAgo.setMonth(currentMonth - 1);
          return orderDate >= oneMonthAgo;
        case 'Last 3 Month':
          const threeMonthsAgo = new Date(now);
          threeMonthsAgo.setMonth(currentMonth - 3);
          return orderDate >= threeMonthsAgo;
        case 'Last 6 Month':
          const sixMonthsAgo = new Date(now);
          sixMonthsAgo.setMonth(currentMonth - 6);
          return orderDate >= sixMonthsAgo;
        case '2023':
          return orderDate.getFullYear() === 2023;
        case '2024':
          return orderDate.getFullYear() === 2024;
        default:
          return true;
      }
    });
  };

  const handleApplyFilter = () => {
    const currentTabOrders = allOrders[activeTab] || [];
    const filtered = applyDateFilter(selectedDateFilter, currentTabOrders);
    setFilteredOrders(filtered);
    setIsFilterApplied(true);
    setShowFilter(false);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setIsFilterApplied(false);
    setFilteredOrders([]);
    setSelectedOrder(null);
  };

  const clearFilters = () => {
    setIsFilterApplied(false);
    setFilteredOrders([]);
    setSelectedDateFilter('Last Week');
    setShowFilter(false);
  };

  const getOrderHeaderColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'text-green-600';
      case 'Cancelled':
        return 'text-red-600';
      case 'Returned':
        return 'text-red-600';
      default:
        return 'text-orange-600';
    }
  };

  const getTabColor = (tab, isActive) => {
    if (!isActive) {
      return 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300';
    }
    
    switch (tab) {
      case 'Delivered':
        return 'border-green-500 text-green-600';
      case 'Cancelled':
        return 'border-red-500 text-red-600';
      case 'Returned':
        return 'border-red-500 text-red-600';
      default:
        return 'border-blue-500 text-blue-600';
    }
  };

  const OrderCard = ({ order }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
        <div className="mb-3 lg:mb-0">
          <h3 className={`text-lg font-semibold mb-1 ${getOrderHeaderColor(order.status)}`}>
            Order no: {order.id}
          </h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p>Order Date: {order.date}</p>
            <p>Estimated Delivery Date: {order.estimatedDelivery}</p>
          </div>
        </div>
        <div className="text-sm text-gray-600 lg:text-right">
          <p>Order Status: {order.status}</p>
          <p>Payment Method: {order.paymentMethod}</p>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center mb-4 sm:mb-0">
          <img 
            src={order.image} 
            alt={order.product}
            className="w-20 h-20 object-cover rounded-lg mr-4"
          />
          <div>
            <h4 className="font-medium text-gray-900">{order.product}</h4>
            <p className="text-sm text-gray-600">Colour: {order.color}</p>
            <p className="text-sm text-gray-600">Qty: {order.qty}</p>
            <p className="text-sm font-semibold">Total: {order.total}</p>
          </div>
        </div>
        <button 
          onClick={() => setSelectedOrder(order)}
          className="bg-blue-800 hover:bg-blue-900 text-white px-6 py-2 rounded-md text-sm font-medium self-start sm:self-center"
        >
          View Detail
        </button>
      </div>
    </div>
  );

  // Show order details if an order is selected
  if (selectedOrder) {
    return <OrderDetails order={selectedOrder} onBack={() => setSelectedOrder(null)} />;
  }

  return (
    <div className="min-h-screen  bg-gray-50">
      <div className="flex">
        <div className="flex-1 p-4 lg:p-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">My Orders</h1>
                <p className="text-gray-600">
                  Total Items: {orders.length} 
                  {isFilterApplied && (
                    <span className="ml-2 text-sm text-blue-600">
                      (Filtered by {selectedDateFilter})
                    </span>
                  )}
                </p>
              </div>
              <div className="flex gap-2 mt-4 sm:mt-0">
                <button
                  onClick={() => setShowFilter(!showFilter)}
                  className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </button>
                {isFilterApplied && (
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-200"
                  >
                    Clear Filter
                  </button>
                )}
              </div>
            </div>

            {showFilter && (
              <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6 shadow-sm">
                <h3 className="font-medium text-gray-900 mb-3">Filter by Order Date</h3>
                <div className="space-y-2">
                  {dateFilters.map((filter) => (
                    <label key={filter} className="flex items-center">
                      <input
                        type="radio"
                        name="dateFilter"
                        value={filter}
                        checked={selectedDateFilter === filter}
                        onChange={(e) => setSelectedDateFilter(e.target.value)}
                        className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{filter}</span>
                    </label>
                  ))}
                </div>
                <div className="flex space-x-3 mt-4">
                  <button 
                    onClick={handleApplyFilter}
                    className="bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded-md text-sm font-medium"
                  >
                    Apply
                  </button>
                  <button 
                    onClick={() => setShowFilter(false)}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md text-sm font-medium"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}

            <div className="border-b border-gray-200 mb-6">
              <nav className="flex space-x-8 overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => handleTabChange(tab)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${getTabColor(tab, activeTab === tab)}`}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>

            <div>
              {orders.length > 0 ? (
                orders.map((order, index) => (
                  <OrderCard key={index} order={order} />
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No orders found for {activeTab.toLowerCase()} status.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// const MyOrders = () => {
//   const [activeTab, setActiveTab] = useState('Active');
//   const [showFilter, setShowFilter] = useState(false);
//   const [selectedDateFilter, setSelectedDateFilter] = useState('Last Week');

//   const tabs = ['Active', 'Delivered', 'Cancelled', 'Returned'];
  
//   // Different order data for each tab
//   const allOrders = {
//     'Active': [
//       {
//         id: '#123456789',
//         date: '2 June 2023, 7:40 PM',
//         estimatedDelivery: '2 June 2023',
//         status: 'In Progress',
//         paymentMethod: 'Cash on delivery',
//         product: 'Black Printed T-shirt',
//         color: 'Pink',
//         qty: 1,
//         total: '$20.00',
//         image: '/api/placeholder/80/80'
//       },
//       {
//         id: '#123456683',
//         date: '2 June 2023, 7:40 PM',
//         estimatedDelivery: '2 June 2023',
//         status: 'In Progress',
//         paymentMethod: 'Cash on delivery',
//         product: 'Black Printed T-shirt',
//         color: 'Pink',
//         qty: 1,
//         total: '$20.00',
//         image: '/api/placeholder/80/80'
//       },
//       {
//         id: '#123456364',
//         date: '2 June 2023, 7:40 PM',
//         estimatedDelivery: '2 June 2023',
//         status: 'In Progress',
//         paymentMethod: 'Cash on delivery',
//         product: 'Black Printed T-shirt',
//         color: 'Pink',
//         qty: 1,
//         total: '$20.00',
//         image: '/api/placeholder/80/80'
//       }
//     ],
//     'Delivered': [
//       {
//         id: '#123456789',
//         date: '2 June 2023, 7:40 PM',
//         estimatedDelivery: '2 June 2023',
//         status: 'Delivered',
//         paymentMethod: 'Cash on delivery',
//         product: 'Black Printed T-shirt',
//         color: 'Pink',
//         qty: 1,
//         total: '$20.00',
//         image: '/api/placeholder/80/80'
//       },
//       {
//         id: '#123456683',
//         date: '2 June 2023, 7:40 PM',
//         estimatedDelivery: '2 June 2023',
//         status: 'Delivered',
//         paymentMethod: 'Cash on delivery',
//         product: 'Black Printed T-shirt',
//         color: 'Pink',
//         qty: 1,
//         total: '$20.00',
//         image: '/api/placeholder/80/80'
//       },
//       {
//         id: '#123456364',
//         date: '2 June 2023, 7:40 PM',
//         estimatedDelivery: '2 June 2023',
//         status: 'Delivered',
//         paymentMethod: 'Cash on delivery',
//         product: 'Black Printed T-shirt',
//         color: 'Pink',
//         qty: 1,
//         total: '$20.00',
//         image: '/api/placeholder/80/80'
//       }
//     ],
//     'Cancelled': [
//       {
//         id: '#123456789',
//         date: '2 June 2023, 7:40 PM',
//         estimatedDelivery: '2 June 2023',
//         status: 'Cancelled',
//         paymentMethod: 'Cash on delivery',
//         product: 'Black Printed T-shirt',
//         color: 'Pink',
//         qty: 1,
//         total: '$20.00',
//         image: '/api/placeholder/80/80'
//       },
//       {
//         id: '#123456683',
//         date: '2 June 2023, 7:40 PM',
//         estimatedDelivery: '2 June 2023',
//         status: 'Cancelled',
//         paymentMethod: 'Cash on delivery',
//         product: 'Black Printed T-shirt',
//         color: 'Pink',
//         qty: 1,
//         total: '$20.00',
//         image: '/api/placeholder/80/80'
//       },
//       {
//         id: '#123456364',
//         date: '2 June 2023, 7:40 PM',
//         estimatedDelivery: '2 June 2023',
//         status: 'Cancelled',
//         paymentMethod: 'Cash on delivery',
//         product: 'Black Printed T-shirt',
//         color: 'Pink',
//         qty: 1,
//         total: '$20.00',
//         image: '/api/placeholder/80/80'
//       }
//     ],
//     'Returned': [
//       {
//         id: '#123456789',
//         date: '2 June 2023, 7:40 PM',
//         estimatedDelivery: '2 June 2023',
//         status: 'Returned',
//         paymentMethod: 'Cash on delivery',
//         product: 'Black Printed T-shirt',
//         color: 'Pink',
//         qty: 1,
//         total: '$20.00',
//         image: '/api/placeholder/80/80'
//       },
//       {
//         id: '#123456683',
//         date: '2 June 2023, 7:40 PM',
//         estimatedDelivery: '2 June 2023',
//         status: 'Returned',
//         paymentMethod: 'Cash on delivery',
//         product: 'Black Printed T-shirt',
//         color: 'Pink',
//         qty: 1,
//         total: '$20.00',
//         image: '/api/placeholder/80/80'
//       },
//       {
//         id: '#123456364',
//         date: '2 June 2023, 7:40 PM',
//         estimatedDelivery: '2 June 2023',
//         status: 'Returned',
//         paymentMethod: 'Cash on delivery',
//         product: 'Black Printed T-shirt',
//         color: 'Pink',
//         qty: 1,
//         total: '$20.00',
//         image: '/api/placeholder/80/80'
//       }
//     ]
//   };

//   // Get orders for current active tab
//   const orders = allOrders[activeTab] || [];

//   const dateFilters = ['Last Week', 'Last Month', 'Last 3 Month', 'Last 6 Month', '2023', '2024'];

//   // Function to get order header color based on status
//   const getOrderHeaderColor = (status) => {
//     switch (status) {
//       case 'Delivered':
//         return 'text-green-600';
//       case 'Cancelled':
//         return 'text-red-600';
//       case 'Returned':
//         return 'text-red-600';
//       default:
//         return 'text-orange-600';
//     }
//   };

//   // Function to get tab colors
//   const getTabColor = (tab, isActive) => {
//     if (!isActive) {
//       return 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300';
//     }
    
//     switch (tab) {
//       case 'Delivered':
//         return 'border-green-500 text-green-600';
//       case 'Cancelled':
//         return 'border-red-500 text-red-600';
//       case 'Returned':
//         return 'border-red-500 text-red-600';
//       default:
//         return 'border-blue-500 text-blue-600';
//     }
//   };

//   const OrderCard = ({ order }) => (
//     <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
//       <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
//         <div className="mb-3 lg:mb-0">
//           <h3 className={`text-lg font-semibold mb-1 ${getOrderHeaderColor(order.status)}`}>
//             Order no: {order.id}
//           </h3>
//           <div className="text-sm text-gray-600 space-y-1">
//             <p>Order Date: {order.date}</p>
//             <p>Estimated Delivery Date: {order.estimatedDelivery}</p>
//           </div>
//         </div>
//         <div className="text-sm text-gray-600 lg:text-right">
//           <p>Order Status: {order.status}</p>
//           <p>Payment Method: {order.paymentMethod}</p>
//         </div>
//       </div>
      
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
//         <div className="flex items-center mb-4 sm:mb-0">
//           <img 
//             src={order.image} 
//             alt={order.product}
//             className="w-20 h-20 object-cover rounded-lg mr-4"
//           />
//           <div>
//             <h4 className="font-medium text-gray-900">{order.product}</h4>
//             <p className="text-sm text-gray-600">Colour: {order.color}</p>
//             <p className="text-sm text-gray-600">Qty: {order.qty}</p>
//             <p className="text-sm font-semibold">Total: {order.total}</p>
//           </div>
//         </div>
//         <button className="bg-blue-800 hover:bg-blue-900 text-white px-6 py-2 rounded-md text-sm font-medium self-start sm:self-center">
//           View Detail
//         </button>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="flex">
//         {/* Main content */}
//         <div className="flex-1 p-4 lg:p-6">
//           <div className="max-w-6xl mx-auto">
//             {/* Header */}
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-900 mb-2">My Orders</h1>
//                 <p className="text-gray-600">Total Items: 4k</p>
//               </div>
//               <button
//                 onClick={() => setShowFilter(!showFilter)}
//                 className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 mt-4 sm:mt-0"
//               >
//                 <Filter className="mr-2 h-4 w-4" />
//                 Filter
//               </button>
//             </div>

//             {/* Filter dropdown */}
//             {showFilter && (
//               <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6 shadow-sm">
//                 <h3 className="font-medium text-gray-900 mb-3">Filter by Order Date</h3>
//                 <div className="space-y-2">
//                   {dateFilters.map((filter) => (
//                     <label key={filter} className="flex items-center">
//                       <input
//                         type="radio"
//                         name="dateFilter"
//                         value={filter}
//                         checked={selectedDateFilter === filter}
//                         onChange={(e) => setSelectedDateFilter(e.target.value)}
//                         className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
//                       />
//                       <span className="ml-2 text-sm text-gray-700">{filter}</span>
//                     </label>
//                   ))}
//                 </div>
//                 <div className="flex space-x-3 mt-4">
//                   <button 
//                     onClick={() => {
//                       // Apply filter logic here
//                       setShowFilter(false);
//                     }}
//                     className="bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded-md text-sm font-medium"
//                   >
//                     Apply
//                   </button>
//                   <button 
//                     onClick={() => setShowFilter(false)}
//                     className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md text-sm font-medium"
//                   >
//                     Close
//                   </button>
//                 </div>
//               </div>
//             )}

//             {/* Tabs */}
//             <div className="border-b border-gray-200 mb-6">
//               <nav className="flex space-x-8 overflow-x-auto">
//                 {tabs.map((tab) => (
//                   <button
//                     key={tab}
//                     onClick={() => setActiveTab(tab)}
//                     className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${getTabColor(tab, activeTab === tab)}`}
//                   >
//                     {tab}
//                   </button>
//                 ))}
//               </nav>
//             </div>

//             {/* Orders */}
//             <div>
//               {orders.length > 0 ? (
//                 orders.map((order, index) => (
//                   <OrderCard key={index} order={order} />
//                 ))
//               ) : (
//                 <div className="text-center py-8">
//                   <p className="text-gray-500">No orders found for {activeTab.toLowerCase()} status.</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

export default MyOrders;