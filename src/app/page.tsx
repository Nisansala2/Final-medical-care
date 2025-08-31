'use client';

import { useState, useEffect, useMemo } from 'react';
import { useMedicines } from '@/hooks/useMedicines';
import { adaptMedicineForComponents } from '@/lib/medicineAdapter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CategoryFilter from '@/components/CategoryFilter';
import MedicineCard from '@/components/MedicineCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import AuthModal from '@/components/AuthModel';
import { Medicine, User, CartItem, FormData } from '@/type'; // Using your existing types

export default function HomePage() {
  // State management
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [showCart, setShowCart] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Auth modal state
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  // Check for existing token on page load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // TODO: Validate token with backend and set user
      // For now, we'll just check if token exists
      // In a real app, you'd validate the token with the server
    }
  }, []);

  // Fetch medicines from MongoDB
  const { medicines: rawMedicines, loading, error } = useMedicines({
    category: selectedCategory || undefined
  });

  // Convert MongoDB medicines to your component format
  const medicines = useMemo(() => 
    rawMedicines.map(adaptMedicineForComponents), 
    [rawMedicines]
  );

  // Client-side search filtering
  const filteredMedicines = useMemo(() => 
    medicines.filter(medicine =>
      medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medicine.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medicine.category.toLowerCase().includes(searchTerm.toLowerCase())
    ), 
    [medicines, searchTerm]
  );

  // Cart functions
  const addToCart = (medicine: Medicine) => {
    if (!user) {
      openAuthModal('login');
      return;
    }

    const existingItem = cartItems.find(item => item.id === medicine.id);
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === medicine.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCartItems([...cartItems, { ...medicine, quantity: 1 }]);
    }
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const openAuthModal = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        localStorage.setItem('token', data.token);
        setShowAuthModal(false);
        setFormData({
          email: '',
          password: '',
          firstName: '',
          lastName: '',
          phone: '',
          confirmPassword: ''
        });
      } else {
        alert(data.error || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login');
    }
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          confirmPassword: formData.confirmPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        localStorage.setItem('token', data.token);
        setShowAuthModal(false);
        setFormData({
          email: '',
          password: '',
          firstName: '',
          lastName: '',
          phone: '',
          confirmPassword: ''
        });
      } else {
        alert(data.error || 'Signup failed');
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('An error occurred during signup');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCartItems([]);
    setShowUserMenu(false);
    localStorage.removeItem('token');
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-red-600">
            <h2 className="text-xl font-bold mb-4">Error Loading Medicines</h2>
            <p className="mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filteredMedicines={filteredMedicines}
        getTotalItems={getTotalItems}
        setShowCart={setShowCart}
        user={user}
        setShowUserMenu={setShowUserMenu}
        showUserMenu={showUserMenu}
        openAuthModal={openAuthModal}
        handleLogout={handleLogout}
      />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="bg-blue-600 text-white rounded-lg p-8 mb-8">
          <h1 className="text-4xl font-bold mb-4">Your Trusted Online Pharmacy</h1>
          <p className="text-xl">Quality medicines delivered to your doorstep</p>
        </section>

        {/* Category Filter */}
        <div className="mb-8">
          <CategoryFilter 
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner />
          </div>
        ) : (
          <>
            {/* Featured Medicines */}
            {!searchTerm && !selectedCategory && (
              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Featured Medicines</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {medicines.filter((m, index) => m.rare).map((medicine, index) => (
                  <MedicineCard 
                    key={`${medicine.id}-${index}`}
                    medicine={medicine}
                    cartItems={cartItems}
                    addToCart={addToCart}
                    user={user}
                    openAuthModal={openAuthModal}
                  />
                ))}
                </div>
              </section>
            )}

            {/* Medicine Results */}
            <section>
              <h2 className="text-2xl font-bold mb-6">
                {searchTerm ? `Search Results (${filteredMedicines.length})` : 
                 selectedCategory ? `${selectedCategory} Medicines (${filteredMedicines.length})` : 
                 `All Medicines (${filteredMedicines.length})`}
              </h2>
              
              {filteredMedicines.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  <p className="text-lg mb-2">No medicines found</p>
                  <p className="text-sm">Try adjusting your search terms or selecting a different category.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredMedicines.map((medicine, index) => (
                    <MedicineCard 
                      key={`${medicine.id}-${index}`}
                      medicine={medicine}
                      cartItems={cartItems}
                      addToCart={addToCart}
                      user={user}
                      openAuthModal={openAuthModal}
                    />
                  ))}
                </div>
              )}
            </section>
          </>
        )}

        
      </main>

      

      <Footer />

      <AuthModal
        showAuthModal={showAuthModal}
        setShowAuthModal={setShowAuthModal}
        authMode={authMode}
        setAuthMode={setAuthMode}
        formData={formData}
        handleInputChange={handleInputChange}
        handleLogin={handleLogin}
        handleSignup={handleSignup}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
      />
    </div>
  );
}
