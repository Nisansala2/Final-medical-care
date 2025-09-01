// src/components/admin/AdminHeader.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LogOut, User } from 'lucide-react';

export default function AdminHeader() {
  const [adminName, setAdminName] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Get admin info from localStorage
    const userData = localStorage.getItem('userData');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        setAdminName(`${user.firstName} ${user.lastName}`);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userData');
    router.push('/admin/login');
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Navigation */}
          <div className="flex items-center space-x-8">
            <Link href="/admin" className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">
                Pharmacy Admin
              </h1>
            </Link>

            <nav className="hidden md:flex space-x-6">
              <Link
                href="/admin"
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                Dashboard
              </Link>
              <Link
                href="/admin/medicines"
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                Medicines
              </Link>
              <Link
                href="/admin/categories"
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                Categories
              </Link>
              <Link
                href="/admin/pharmacies"
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                Pharmacies
              </Link>
            </nav>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              View Customer Site
            </Link>

            {/* Admin User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
              >
                <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {adminName ? adminName.charAt(0).toUpperCase() : 'A'}
                  </span>
                </div>
                <span className="text-sm font-medium">{adminName || 'Admin'}</span>
              </button>

              {/* Dropdown Menu */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border">
                  <div className="px-4 py-2 text-sm text-gray-700 border-b">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      {adminName || 'Admin User'}
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Click outside to close menu */}
      {showUserMenu && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </header>
  );
}
