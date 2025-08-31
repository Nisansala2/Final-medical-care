// UserMenu.tsx
import React from 'react';
import { UserCircle, ShoppingCart, Settings, LogOut } from 'lucide-react';
import { User } from '../type';

interface UserMenuProps {
  user: User | null;
  showUserMenu: boolean;
  setShowUserMenu: (show: boolean) => void;
  openAuthModal: (mode: 'login' | 'signup') => void;
  handleLogout: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({
  user,
  showUserMenu,
  setShowUserMenu,
  openAuthModal,
  handleLogout
}) => {
  if (!user) {
    return (
      <div className="flex items-center space-x-2">
        <button 
          onClick={() => openAuthModal('login')}
          className="px-4 py-2 text-green-600 hover:text-green-700 font-semibold"
        >
          Login
        </button>
        <button 
          onClick={() => openAuthModal('signup')}
          className="px-4 py-2 bg-green-500 hover:bg-green-700 text-white font-semibold rounded-lg"
        >
          Sign Up
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      <button 
        className="flex items-center space-x-2 p-2 text-gray-600 hover:text-blue-600"
        onClick={() => setShowUserMenu(!showUserMenu)}
      >
        <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
          {user.firstName.charAt(0)}{user.lastName.charAt(0)}
        </div>
        <span className="hidden md:block font-medium">{user.firstName}</span>
      </button>
      
      {showUserMenu && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-semibold">
                {user.firstName.charAt(0)}{user.lastName.charAt(0)}
              </div>
              <div>
                <div className="font-semibold text-gray-900">{user.firstName} {user.lastName}</div>
                <div className="text-sm text-gray-600">{user.email}</div>
              </div>
            </div>
          </div>
          
          <div className="py-2">
            <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
              <UserCircle className="h-4 w-4" />
              <span>My Profile</span>
            </button>
            <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
              <ShoppingCart className="h-4 w-4" />
              <span>My Orders</span>
            </button>
            <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </button>
          </div>
          
          <div className="border-t border-gray-100 py-2">
            <button 
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 flex items-center space-x-2"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;