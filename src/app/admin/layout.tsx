// src/app/admin/layout.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      const userRole = localStorage.getItem('userRole');

      // Allow access to login and signup pages without authentication
      if (pathname === '/admin/login' || pathname === '/admin/signup') {
        setIsAuthenticated(true);
        setIsLoading(false);
        return;
      }

      // Check if user is authenticated and has admin role
      if (token && userRole === 'admin') {
        setIsAuthenticated(true);
      } else {
        // Redirect to admin login if not authenticated or not admin
        router.push('/admin/login');
        return;
      }

      setIsLoading(false);
    };

    checkAuth();
  }, [router, pathname]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated && pathname !== '/admin/login' && pathname !== '/admin/signup') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  );
}
