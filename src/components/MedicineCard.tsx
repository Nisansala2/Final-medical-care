// MedicineCard.tsx
import React from 'react';
import { Star, ShoppingCart } from 'lucide-react';
import { Medicine, CartItem, User } from '../type';

interface MedicineCardProps {
  medicine: Medicine;
  cartItems: CartItem[];
  addToCart: (medicine: Medicine) => void;
  user: User | null;
  openAuthModal: (mode: string) => void;
}

const MedicineCard: React.FC<MedicineCardProps> = ({
  medicine,
  cartItems,
  addToCart,
  user,
  openAuthModal
}) => {
  const cartItem = cartItems.find(item => item.id === medicine.id);

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="text-4xl">{medicine.image}</div>
          {medicine.rare && (
            <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-semibold">
              RARE
            </span>
          )}
        </div>
        
        <h3 className="font-bold text-lg mb-2 text-gray-900">{medicine.name}</h3>
        <p className="text-sm text-gray-600 mb-2">{medicine.category}</p>
        <p className="text-sm text-gray-500 mb-4">{medicine.description}</p>
        
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`h-4 w-4 ${i < Math.floor(medicine.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
              />
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-600">({medicine.reviews})</span>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-2xl font-bold text-gray-900">{medicine.price}</span>
            {medicine.originalPrice && (
              <span className="ml-2 text-sm text-gray-500 line-through">{medicine.originalPrice}</span>
            )}
          </div>
          <span className={`text-xs px-2 py-1 rounded-full ${
            medicine.availability === 'In Stock' ? 'bg-green-100 text-green-800' :
            medicine.availability === 'Limited Stock' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {medicine.availability}
          </span>
        </div>
        
        {medicine.prescription && (
          <div className="mb-4 p-2 bg-blue-50 rounded-lg">
            <p className="text-xs text-blue-800 font-semibold">⚠️ Prescription Required</p>
          </div>
        )}
        
        <button 
          onClick={() => addToCart(medicine)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
          disabled={medicine.availability === 'Out of Stock' || !user}
        >
          <ShoppingCart className="h-4 w-4" />
          <span>
            {!user ? 'Login to Add' :
             cartItem 
              ? `In Cart (${cartItem.quantity})` 
              : 'Add to Cart'
            }
          </span>
        </button>
        
        {!user && (
          <p className="text-xs text-center text-gray-500 mt-2">
            <button 
              onClick={() => openAuthModal('login')}
              className="text-blue-600 hover:underline"
            >
              Login
            </button> required to purchase medicines
          </p>
        )}
      </div>
    </div>
  );
};

export default MedicineCard;