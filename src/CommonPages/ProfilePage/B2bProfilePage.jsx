import { useState } from "react";
import { Info, LogOut, Package, User } from "lucide-react";
import B2bMyInfo from "../../common/ProfilePageComponents/B2bMyInfo";
import B2bMyOrders from "../../common/ProfilePageComponents/b2bMyOrders";

const B2bProfilePage = () => {
  const [currentView, setCurrentView] = useState('orders');

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      alert('Logged out successfully!');
      // Add your logout logic here
      // For example: redirect to login page, clear session, etc.
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-sm border-r border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="text-blue-600" size={20} />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">Hello Raja</h2>
              <p className="text-sm text-gray-600">Welcome to your account</p>
            </div>
          </div>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setCurrentView('orders')}
                className={`w-full flex items-center gap-3 px-4 py-2 text-left rounded-lg transition-colors ${
                  currentView === 'orders'
                    ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Package size={20} />
                My orders
              </button>
            </li>
            <li>
              <button
                onClick={() => setCurrentView('info')}
                className={`w-full flex items-center gap-3 px-4 py-2 text-left rounded-lg transition-colors ${
                  currentView === 'info'
                    ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Info size={20} />
                My Info
              </button>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2 text-left rounded-lg text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors"
              >
                <LogOut size={20} />
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      {currentView === 'orders' && <B2bMyOrders />}
      {currentView === 'info' && <B2bMyInfo/>}
    </div>
  );
};

export default B2bProfilePage;