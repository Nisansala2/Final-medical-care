// CartModal.tsx
import React from 'react';
import { X, ShoppingCart, Plus, Minus } from 'lucide-react';
import { CartItem } from '../type';

interface CartModalProps {
  showCart: boolean;
  setShowCart: (show: boolean) => void;
  cartItems: CartItem[];
  updateQuantity: (medicineId: number, newQuantity: number) => void;
  removeFromCart: (medicineId: number) => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

const CartModal: React.FC<CartModalProps> = ({
  showCart,
  setShowCart,
  cartItems,
  updateQuantity,
  removeFromCart,
  getTotalPrice,
  getTotalItems
}) => {
  if (!showCart) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold">Shopping Cart ({getTotalItems()} items)</h2>
          <button 
            onClick={() => setShowCart(false)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="p-6 max-h-96 overflow-y-auto">
          {cartItems.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Your cart is empty</p>
              <p className="text-gray-400">Add some medicines to get started</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                  <div className="text-3xl">{item.image}</div>
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-gray-600 text-sm">{item.category}</p>
                    <p className="text-blue-600 font-bold">{item.price}</p>
                    {item.prescription && (
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        Prescription Required
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(Number(item.id), item.quantity - 1)}
                      className="p-1 hover:bg-gray-100 rounded-full"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(Number(item.id), item.quantity + 1)}
                      className="p-1 hover:bg-gray-100 rounded-full"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <button
                    onClick={() => removeFromCart(Number(item.id))}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-full"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {cartItems.length > 0 && (
          <div className="border-t p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-bold">Total: ₹{getTotalPrice().toLocaleString('en-IN')}</span>
              <span className="text-gray-600">{getTotalItems()} items</span>
            </div>
            
            <div className="space-y-3">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                Proceed to Checkout
              </button>
              <button 
                onClick={() => setShowCart(false)}
                className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;