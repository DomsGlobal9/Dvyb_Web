import React, { useState } from 'react';
import { Trash2, ShoppingBag, ArrowLeft, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TryOnCart = () => {
  const navigate = useNavigate();
  
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Blue Flower Print Crop Top',
      color: 'Yellow',
      quantity: 1,
      price: 2900,
      image: 'https://res.cloudinary.com/doiezptnn/image/upload/v1755929967/aj3ucjkoqrzu2ltabnnw.png', // Placeholder image
    },
    {
      id: 2,
      name: 'Blue Flower Print Crop Top',
      color: 'Yellow', 
      quantity: 1,
      price: 2900,
      image: 'https://res.cloudinary.com/doiezptnn/image/upload/v1755858051/b3kbjwzzmtbfzluxd6u9.jpg',
    },
    {
      id: 3,
      name: 'Blue Flower Print Crop Top',
      color: 'Yellow',
      quantity: 1,
      price: 2900,
      image: 'https://res.cloudinary.com/doiezptnn/image/upload/v1755848433/kfiqoz3vgcjivv8zayq6.jpg',
    },
    {
      id: 4,
      name: 'Blue Flower Print Crop Top',
      color: 'Yellow',
      quantity: 1,
      price: 2900,
      image: 'https://res.cloudinary.com/doiezptnn/image/upload/v1755848433/t5vv2jqqtwwy97rlegjb.webp',
    }
  ]);

  const [selectedItems, setSelectedItems] = useState(new Set());
  const [selectAll, setSelectAll] = useState(false);

  const ProductImage = ({ src, alt, className = "" }) => (
    <div className={`bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg overflow-hidden ${className}`}>
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    </div>
  );

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
    setSelectedItems(prev => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  const toggleItemSelection = (id) => {
    setSelectedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(cartItems.map(item => item.id)));
    }
    setSelectAll(!selectAll);
  };

  const handleTryOn = () => {
    if (selectedItems.size !== 1) {
      alert('Please select exactly one item to try on.');
      return;
    }
    const selectedItemId = [...selectedItems][0];
    const selectedItem = cartItems.find(item => item.id === selectedItemId);
    navigate('/TryYourOutfit', { state: { garmentImage: selectedItem.image } });
  };

  const handleAddToCart = (id) => {
    console.log(`Adding item ${id} to cart`);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <button onClick={handleGoBack} className="p-2 -ml-2">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900 ml-2">TRY ON CART</h1>
          </div>
          <div className="flex items-center space-x-4">
            <label className="flex items-center text-sm text-gray-600">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={toggleSelectAll}
                className="mr-2 rounded border-gray-300"
              />
              Try On
            </label>
            <button
              onClick={handleTryOn}
              disabled={selectedItems.size === 0}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedItems.size > 0
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Try On
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 py-4">
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedItems.has(item.id)}
                  onChange={() => toggleItemSelection(item.id)}
                  className="mr-4 rounded border-gray-300"
                />
                <div className="flex-shrink-0 mr-4">
                  <ProductImage src={item.image} alt={item.name} className="w-16 h-20" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900 mb-1">{item.name}</h3>
                  <p className="text-xs text-gray-500 mb-1">Color: <span className="font-medium">{item.color}</span></p>
                  <p className="text-xs text-gray-500">Quantity: <span className="font-medium">{item.quantity}</span></p>
                </div>
                <div className="text-right mr-4">
                  <p className="text-lg font-semibold text-gray-900">₹{item.price.toLocaleString()}</p>
                </div>
                <div className="flex flex-col space-y-2">
                  <button
                    onClick={() => handleAddToCart(item.id)}
                    className="bg-blue-600 text-white px-3 py-1.5 rounded text-xs font-medium hover:bg-blue-700 transition-colors"
                  >
                    Add to cart
                  </button>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {cartItems.length === 0 && (
          <div className="text-center py-12">
            <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Your try-on cart is empty</h3>
            <p className="text-gray-500">Add some items to try them on!</p>
          </div>
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 md:hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={toggleSelectAll}
                className="mr-2 rounded border-gray-300"
              />
              <span className="text-sm text-gray-600">Select All ({selectedItems.size}/{cartItems.length})</span>
            </div>
            <button
              onClick={handleTryOn}
              disabled={selectedItems.size === 0}
              className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
                selectedItems.size > 0
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Eye className="w-4 h-4 mr-2" />
              Try On Selected
            </button>
          </div>
        </div>
      )}
      <div className="h-20 md:h-0"></div>
    </div>
  );
};

export default TryOnCart;

