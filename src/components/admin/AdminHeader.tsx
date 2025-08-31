// src/components/admin/AdminHeader.tsx
import Link from 'next/link';

export default function AdminHeader() {
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
            <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">A</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}