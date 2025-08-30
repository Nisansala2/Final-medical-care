// SearchBar.tsx
import React from 'react';
import { Search, X } from 'lucide-react';
import { Medicine } from '../type';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filteredMedicines: Medicine[];
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  setSearchTerm,
  filteredMedicines
}) => {
  return (
    <div className="flex-1 max-w-2xl mx-8">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search rare medicines, treatments, diseases..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
      
      {searchTerm && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 z-10 max-h-60 overflow-y-auto">
          {filteredMedicines.length > 0 ? (
            <div className="p-2">
              <div className="text-sm text-gray-600 px-3 py-2 border-b">
                {filteredMedicines.length} medicine(s) found
              </div>
              {filteredMedicines.slice(0, 5).map((medicine) => (
                <div
                  key={medicine.id}
                  className="flex items-center space-x-3 p-3 hover:bg-gray-50 cursor-pointer rounded-lg"
                  onClick={() => {
                    setSearchTerm(medicine.name);
                  }}
                >
                  <div className="text-2xl">{medicine.image}</div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">{medicine.name}</div>
                    <div className="text-sm text-gray-600">{medicine.category}</div>
                    <div className="text-sm text-blue-600 font-semibold">{medicine.price}</div>
                  </div>
                </div>
              ))}
              {filteredMedicines.length > 5 && (
                <div className="text-center text-sm text-gray-500 py-2">
                  And {filteredMedicines.length - 5} more...
                </div>
              )}
            </div>
          ) : (
            <div className="p-4 text-center text-gray-500">
              <Search className="h-8 w-8 text-gray-300 mx-auto mb-2" />
              <p>No medicines found for {searchTerm}</p>
              <p className="text-sm">Try searching for conditions, medicine names, or categories</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;