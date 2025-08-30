// FeaturedMedicines.tsx
import React from 'react';
import { Search, X, ChevronRight } from 'lucide-react';
import { Medicine, CartItem, User, Category } from '../type';
import MedicineCard from './MedicineCard';

interface FeaturedMedicinesProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  filteredMedicines: Medicine[];
  categories: Category[];
  cartItems: CartItem[];
  addToCart: (medicine: Medicine) => void;
  user: User | null;
  openAuthModal: (mode: string) => void;
}

const FeaturedMedicines: React.FC<FeaturedMedicinesProps> = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  filteredMedicines,
  categories,
  cartItems,
  addToCart,
  user,
  openAuthModal
}) => {
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
  };

  const getSectionTitle = () => {
    if (searchTerm) {
      return `Search Results for "${searchTerm}"`;
    }
    if (selectedCategory !== 'all') {
      const category = categories.find(c => c.id === selectedCategory);
      return `${category?.name} Medicines`;
    }
    return 'Featured Rare Medicines';
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              {getSectionTitle()}
            </h2>
            <p className="text-gray-600 mt-2">
              {filteredMedicines.length} medicine(s) {searchTerm || selectedCategory !== 'all' ? 'found' : 'available'}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            {(searchTerm || selectedCategory !== 'all') && (
              <button 
                onClick={clearFilters}
                className="text-blue-600 hover:text-blue-700 font-semibold flex items-center"
              >
                Clear Filters <X className="ml-1 h-4 w-4" />
              </button>
            )}
            <button className="flex items-center text-blue-600 hover:text-blue-700 font-semibold">
              View All <ChevronRight className="ml-1 h-5 w-5" />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredMedicines.length > 0 ? (
            filteredMedicines.map((medicine) => (
              <MedicineCard
                key={medicine.id}
                medicine={medicine}
                cartItems={cartItems}
                addToCart={addToCart}
                user={user}
                openAuthModal={openAuthModal}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No medicines found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search terms or browse our categories
              </p>
              <button 
                onClick={clearFilters}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg"
              >
                Show All Medicines
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedMedicines;