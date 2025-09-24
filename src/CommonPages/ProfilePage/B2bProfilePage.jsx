import { useState } from "react";
import { Info, LogOut, Package, User } from "lucide-react";
import { getAuth, signOut } from "firebase/auth";
import B2bMyInfo from "../../common/ProfilePageComponents/B2bMyInfo";
import B2bMyOrdersPage from "../../common/ProfilePageComponents/B2bMyOrders";
 
const B2bProfilePage = () => {
  const [currentView, setCurrentView] = useState('orders');
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const auth = getAuth();

  // ✅ Handle logout with same functionality as Sidebar
  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      window.location.href = "/B2c-login"; // Redirect to login
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <>
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
                  onClick={() => setShowLogoutModal(true)}
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
        {currentView === 'orders' && <B2bMyOrdersPage/>}
        {currentView === 'info' && <B2bMyInfo/>}
      </div>

      {/* ✅ Logout Confirmation Modal - Same as Sidebar component */}
      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-[9999]">
          <div className="bg-white rounded-lg shadow-2xl p-6 w-80 text-center mx-4">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Are you sure you want to Log Out?
            </h3>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200"
              >
                Yes
              </button>
              <button
                onClick={() => setShowLogoutModal(false)}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-200"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default B2bProfilePage;