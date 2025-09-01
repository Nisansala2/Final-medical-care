// src/app/admin/page.tsx
'use client';

import { useState, useEffect } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import MedicineList from '@/components/admin/MedicineList';
import MedicineForm from '@/components/admin/MedicineForm';
import BulkOperations from '@/components/admin/BulkOperations';
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

export default function AdminDashboard() {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingMedicine, setEditingMedicine] = useState<Medicine | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Fetch medicines
  const fetchMedicines = async () => {
    try {
      const response = await fetch('/api/medicines');
      if (response.ok) {
        const data = await response.json();
        setMedicines(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching medicines:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  // Handle create medicine
  const handleCreateMedicine = () => {
    setEditingMedicine(null);
    setShowForm(true);
  };

  // Handle edit medicine
  const handleEditMedicine = (medicine: any) => {
    setEditingMedicine(medicine);
    setShowForm(true);
  };

  // Handle delete medicine
  const handleDeleteMedicine = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this medicine?')) {
      return;
    }

    try {
      const response = await fetch(`/api/medicines/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMedicines((medicines || []).filter(med => med._id !== id));
      } else {
        alert('Failed to delete medicine');
      }
    } catch (error) {
      console.error('Error deleting medicine:', error);
      alert('Error deleting medicine');
    }
  };

  // Handle form submission
  const handleFormSubmit = async (medicineData: any) => {
    try {
      let response;
      
      if (editingMedicine) {
        // Update existing medicine
        response = await fetch(`/api/medicines/${editingMedicine._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(medicineData),
        });
      } else {
        // Create new medicine
        response = await fetch('/api/medicines', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(medicineData),
        });
      }

      if (response.ok) {
        const updatedMedicine = await response.json();
        
        if (editingMedicine) {
          // Update the medicine in the list
          setMedicines((medicines || []).map(med =>
            med._id === editingMedicine._id ? updatedMedicine : med
          ));
        } else {
          // Add new medicine to the list
          setMedicines([updatedMedicine, ...medicines]);
        }
        
        setShowForm(false);
        setEditingMedicine(null);
      } else {
        alert('Failed to save medicine');
      }
    } catch (error) {
      console.error('Error saving medicine:', error);
      alert('Error saving medicine');
    }
  };

  // Filter medicines based on search and category
  const filteredMedicines = (medicines || []).filter(medicine => {
    const matchesSearch = (medicine.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (medicine.description || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || medicine.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Get unique categories
  const categories = [...new Set((medicines || []).map(med => med.category))];

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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Medicine Management</h1>
          <p className="text-gray-600">Manage your pharmacy inventory</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Medicines</h3>
            <p className="text-3xl font-bold text-blue-600">{(medicines || []).length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">In Stock</h3>
            <p className="text-3xl font-bold text-green-600">
              {(medicines || []).filter(med => med.inStock).length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Low Stock</h3>
            <p className="text-3xl font-bold text-red-600">
              {(medicines || []).filter(med => med.stockQuantity && med.stockQuantity < 20).length}
            </p>
          </div>
        </div>

        {/* Bulk Operations */}
        <div className="mb-8">
          <BulkOperations
            onSeedDatabase={fetchMedicines}
            onClearDatabase={() => {
              setMedicines([]);
            }}
            onExportData={() => {
              // Just a success callback
            }}
          />
        </div>

        {/* Controls Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <input
                type="text"
                placeholder="Search medicines..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Categories</option>
                {categories.map((category, index) => (
                  <option key={`${category}-${index}`} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <button
              onClick={handleCreateMedicine}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Add New Medicine
            </button>
          </div>
        </div>

        {/* Medicine List */}
        <MedicineList
          medicines={filteredMedicines as any}
          onEdit={handleEditMedicine}
          onDelete={handleDeleteMedicine}
        />

        {/* Medicine Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <MedicineForm
                medicine={editingMedicine as any}
                onSubmit={handleFormSubmit}
                onCancel={() => {
                  setShowForm(false);
                  setEditingMedicine(null);
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}