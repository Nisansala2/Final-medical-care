// src/app/admin/categories/page.tsx
'use client';

import { useState, useEffect } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import LoadingSpinner from '@/components/LoadingSpinner';
// Local interface that matches the API response
interface Medicine {
  _id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  manufacturer: string;
  dosage: string;
  prescriptionRequired: boolean;
  inStock: boolean;
  stockQuantity: number;
  image?: string;
  featured: boolean;
  rare?: boolean;
  ingredients: string[];
  sideEffects: string[];
  warnings: string[];
  pharmacyLocations?: any[];
  createdAt?: string;
  updatedAt?: string;
}

interface CategoryStats {
  name: string;
  count: number;
  inStock: number;
  lowStock: number;
}

export default function AdminCategoriesPage() {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryStats, setCategoryStats] = useState<CategoryStats[]>([]);

  const fetchMedicines = async () => {
    try {
      const response = await fetch('/api/medicines');
      if (response.ok) {
        const data = await response.json();
        setMedicines(data);
        
        // Calculate category statistics
        const stats = calculateCategoryStats(data);
        setCategoryStats(stats);
      }
    } catch (error) {
      console.error('Error fetching medicines:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateCategoryStats = (medicines: Medicine[]): CategoryStats[] => {
    const categories = new Map<string, CategoryStats>();
    
    medicines.forEach(medicine => {
      const categoryName = medicine.category;
      
      if (!categories.has(categoryName)) {
        categories.set(categoryName, {
          name: categoryName,
          count: 0,
          inStock: 0,
          lowStock: 0
        });
      }
      
      const stats = categories.get(categoryName)!;
      stats.count++;
      
      if (medicine.inStock) {
        stats.inStock++;
      }
      
      if (medicine.stockQuantity && medicine.stockQuantity < 20) {
        stats.lowStock++;
      }
    });
    
    return Array.from(categories.values()).sort((a, b) => b.count - a.count);
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Categories Overview</h1>
          <p className="text-gray-600">Monitor inventory by category</p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryStats.map((category) => (
            <div key={category.name} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                <span className="text-2xl font-bold text-blue-600">{category.count}</span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">In Stock:</span>
                  <span className="text-sm font-medium text-green-600">{category.inStock}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Out of Stock:</span>
                  <span className="text-sm font-medium text-red-600">{category.count - category.inStock}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Low Stock:</span>
                  <span className="text-sm font-medium text-orange-600">{category.lowStock}</span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(category.inStock / category.count) * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {Math.round((category.inStock / category.count) * 100)}% in stock
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Category Breakdown Table */}
        <div className="mt-8 bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Detailed Category Breakdown</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Items
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    In Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Out of Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Low Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock Rate
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {categoryStats.map((category) => (
                  <tr key={category.name} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        {category.name}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {category.count}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                      {category.inStock}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-medium">
                      {category.count - category.inStock}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-orange-600 font-medium">
                      {category.lowStock}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full"
                            style={{ width: `${(category.inStock / category.count) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-xs">
                          {Math.round((category.inStock / category.count) * 100)}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}