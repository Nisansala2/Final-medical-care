// Header.tsx
import React from 'react';
import { Search, ShoppingCart, Heart, X } from 'lucide-react';
import { Medicine, User } from '../type';
import SearchBar from './SearchBar';
import UserMenu from './UserMenu';

interface HeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filteredMedicines: Medicine[];
  getTotalItems: () => number;
  setShowCart: (show: boolean) => void;
  user: User | null;
  setShowUserMenu: (show: boolean) => void;
  showUserMenu: boolean;
  openAuthModal: (mode: 'login' | 'signup') => void;
  handleLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({
  searchTerm,
  setSearchTerm,
  filteredMedicines,
  getTotalItems,
  setShowCart,
  user,
  setShowUserMenu,
  showUserMenu,
  openAuthModal,
  handleLogout
}) => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                M
              </div>
              <span className="text-2xl font-bold text-gray-900">MediRare</span>
            </div>
          </div>
          
          <SearchBar 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filteredMedicines={filteredMedicines}
          />

          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-blue-600 relative">
              <Heart className="h-6 w-6" />
            </button>
            <button 
              className="p-2 text-gray-600 hover:text-blue-600 relative"
              onClick={() => setShowCart(true)}
            >
              <ShoppingCart className="h-6 w-6" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </button>
            
            <UserMenu 
              user={user}
              showUserMenu={showUserMenu}
              setShowUserMenu={setShowUserMenu}
              openAuthModal={openAuthModal}
              handleLogout={handleLogout}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;