import React, { useState } from 'react';
import { ArrowLeft, Download } from 'lucide-react';

const OrderDetails = ({ order, onBack }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'text-orange-600 bg-orange-50';
      case 'Delivered':
        return 'text-green-600 bg-green-50';
      case 'Cancelled':
        return 'text-red-600 bg-red-50';
      case 'Returned':
        return 'text-blue-600 bg-blue-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getProgressSteps = (status) => {
    const baseSteps = [
      { id: 1, name: 'Order Placed', completed: true },
      { id: 2, name: 'Order Confirmed', completed: true },
    ];

    switch (status) {
      case 'Active':
        return [
          ...baseSteps,
          { id: 3, name: 'Order Processing', completed: false, current: true },
          { id: 4, name: 'Shipping', completed: false },
          { id: 5, name: 'Delivered', completed: false },
        ];
      case 'Delivered':
        return [
          ...baseSteps,
          { id: 3, name: 'Order Processing', completed: true },
          { id: 4, name: 'Shipping', completed: true },
          { id: 5, name: 'Delivered', completed: true, current: true },
        ];
      case 'Cancelled':
        return baseSteps;
      case 'Returned':
        return [
          { id: 1, name: 'Item Received', completed: true },
          { id: 2, name: 'Return Requested', completed: true },
          { id: 3, name: 'Approved', completed: true },
          { id: 4, name: 'Refunded', completed: true, current: true },
        ];
      default:
        return baseSteps;
    }
  };

  const progressSteps = getProgressSteps(order.status);

  // Sample product data
  const products = [
    {
      id: 1,
      name: 'Printed white cote',
      color: 'White',
      qty: order.status === 'Delivered' ? 2 : 1,
      price: order.status === 'Delivered' ? '₹22,900' : '₹21,900',
      image: '/api/placeholder/80/80'
    },
    {
      id: 2,
      name: 'Men Blue Shirt',
      color: 'Blue',
      qty: order.status === 'Delivered' ? 10 : 2,
      price: order.status === 'Delivered' ? '₹13,900' : '₹32,980',
      image: '/api/placeholder/80/80'
    }
  ];

  const renderProgressBar = () => {
    if (order.status === 'Cancelled') {
      return null;
    }

    return (
      <div className="mb-6">
        <div className="flex items-center justify-between">
          {progressSteps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center relative">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step.completed
                    ? 'bg-blue-600 text-white'
                    : step.current
                    ? 'bg-blue-100 text-blue-600 border-2 border-blue-600'
                    : 'bg-gray-200 text-gray-400'
                }`}
              >
                {step.completed ? '✓' : step.id}
              </div>
              <span className={`mt-2 text-xs text-center ${
                step.completed || step.current ? 'text-gray-900' : 'text-gray-400'
              }`}>
                {step.name}
              </span>
              {index < progressSteps.length - 1 && (
                <div
                  className={`absolute top-4 left-8 w-full h-0.5 ${
                    progressSteps[index + 1].completed ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                  style={{ width: 'calc(100vw / ' + progressSteps.length + ' - 2rem)' }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
          >
            <ArrowLeft className="h-5 w-5 mr-1" />
            Order Details
          </button>
        </div>

        {/* Order Info */}
        <div className="bg-white rounded-lg p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4">
            <div>
              <h2 className="text-lg font-semibold mb-1">Order no: {order.id}</h2>
              <p className="text-sm text-gray-600">
                {order.status === 'Cancelled' 
                  ? `Cancelled On: ${order.date}`
                  : `Placed On: ${order.date}`
                }
              </p>
            </div>
            <div className="mt-4 sm:mt-0 text-right">
              <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                {order.status === 'Active' ? 'Active' : order.status}
              </span>
              <p className="text-sm text-gray-600 mt-1">Total: ₹10,050</p>
            </div>
          </div>

          {/* Progress Bar */}
          {renderProgressBar()}

          {/* Status Message */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <p className="text-sm text-gray-600">
              {order.status === 'Delivered' && "18 August 2025 3:40 PM Your order has been successfully Placed."}
              {order.status === 'Active' && "18 August 2025 3:40 PM Your order has been successfully Placed."}
              {order.status === 'Cancelled' && "Order cancelled on 3 June 2023 2:40 PM"}
              {order.status === 'Returned' && "18 August 2025 3:40 PM Your order has been successfully Placed."}
            </p>
          </div>

          {/* Products */}
          <div className={`space-y-4 mb-6 ${order.status === 'Active' ? 'border-2 border-blue-300 rounded-lg p-4' : ''}`}>
            {products.map((product) => (
              <div key={product.id} className="flex items-center justify-between py-4">
                <div className="flex items-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-lg mr-4"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900">{product.name}</h3>
                    <p className="text-sm text-gray-600">Color: {product.color}</p>
                    <p className="text-sm text-gray-600">Qty: {product.qty}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{product.price}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Download Invoice Button */}
          <div className="flex justify-center">
            <button className="bg-blue-800 hover:bg-blue-900 text-white px-8 py-3 rounded-md font-medium flex items-center">
              <Download className="h-4 w-4 mr-2" />
              Download Invoice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


export default OrderDetails;
