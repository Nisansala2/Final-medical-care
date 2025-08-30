// CategoriesSection.tsx
import React from 'react';
import { Category } from '../type';

interface CategoriesSectionProps {
  categories: Category[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  categories,
  selectedCategory,
  setSelectedCategory
}) => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Specialty Medicine Categories
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className={`p-6 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-lg border ${
                selectedCategory === category.id 
                  ? 'bg-blue-50 border-blue-200 ring-2 ring-blue-500' 
                  : 'bg-gray-50 hover:bg-blue-50 hover:border-blue-200'
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <div className="text-center">
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{category.name}</h3>
                <p className="text-sm text-gray-600">{category.count} medicines</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;