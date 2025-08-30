"use client";
import React, { useState } from 'react';
import { Medicine, CartItem, User, FormData } from '../type';
import { categories, featuredMedicines } from '../data';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import CategoriesSection from '../components/CategoriesSection';
import FeaturedMedicines from '../components/FeaturedMedicines';
import ServicesSection from '../components/ServicesSection';
import Footer from '../components/Footer';
import CartModal from '../components/CartModel';
import AuthModal from '../components/AuthModel';

const MedicineMarketplace = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [filteredMedicines, setFilteredMedicines] = useState<Medicine[]>([]);
  
  // User authentication states
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [user, setUser] = useState<User | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Form states
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    confirmPassword: ''
  });

  // Search and filter functionality
  const searchMedicines = (
    medicines: Medicine[],
    term: string,
    category: string
  ): Medicine[] => {
    let filtered = medicines;

    if (category !== 'all') {
      filtered = filtered.filter(medicine => 
        medicine.category.toLowerCase().includes(category.toLowerCase()) ||
        medicine.keywords.some(keyword => keyword.includes(category.toLowerCase()))
      );
    }

    if (term.trim() !== '') {
      const searchLower = term.toLowerCase();
      filtered = filtered.filter(medicine => 
        medicine.name.toLowerCase().includes(searchLower) ||
        medicine.description.toLowerCase().includes(searchLower) ||
        medicine.keywords.some(keyword => keyword.includes(searchLower)) ||
        medicine.category.toLowerCase().includes(searchLower)
      );
    }

    return filtered;
  };

  // Update filtered medicines when search term or category changes
  React.useEffect(() => {
    const filtered = searchMedicines(featuredMedicines, searchTerm, selectedCategory);
    setFilteredMedicines(filtered);
  }, [searchTerm, selectedCategory]);

  // Initialize filtered medicines
  React.useEffect(() => {
    setFilteredMedicines(featuredMedicines);
  }, []);

  // Cart functions
  const addToCart = (medicine: Medicine) => {
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

  const removeFromCart = (medicineId: number) => {
    setCartItems(cartItems.filter(item => item.id !== medicineId));
  };

  const updateQuantity = (medicineId: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(medicineId);
    } else {
      setCartItems(cartItems.map(item => 
        item.id === medicineId 
          ? { ...item, quantity: newQuantity }
          : item
      ));
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price.replace(/[₹,]/g, '')) || 0;
      return total + (price * item.quantity);
    }, 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Authentication functions
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.email && formData.password) {
      const userData: User = {
        id: 1,
        email: formData.email,
        firstName: formData.firstName || 'John',
        lastName: formData.lastName || 'Doe',
        phone: formData.phone || '+91 9876543210',
        avatar: '👤'
      };
      setUser(userData);
      setShowAuthModal(false);
      setFormData({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phone: '',
        confirmPassword: ''
      });
      alert('Login successful!');
    } else {
      alert('Please fill in all required fields');
    }
  };

  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validate form
    if (!formData.email || !formData.password || !formData.firstName || !formData.lastName) {
      alert('Please fill in all required fields');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    if (formData.password.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }

    const userData: User = {
      id: Date.now(),
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone,
      avatar: '👤'
    };
    setUser(userData);
    setShowAuthModal(false);
    setFormData({
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      phone: '',
      confirmPassword: ''
    });
    alert('Account created successfully!');
  };

  const handleLogout = () => {
    setUser(null);
    setShowUserMenu(false);
    setCartItems([]);
    alert('Logged out successfully!');
  };

  const openAuthModal = (mode: string) => {
    setAuthMode(mode);
    setShowAuthModal(true);
    setFormData({
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      phone: '',
      confirmPassword: ''
    });
  };

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

      <CartModal 
        showCart={showCart}
        setShowCart={setShowCart}
        cartItems={cartItems}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        getTotalPrice={getTotalPrice}
        getTotalItems={getTotalItems}
      />

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

      <HeroSection />

      <CategoriesSection 
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <FeaturedMedicines 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        filteredMedicines={filteredMedicines}
        categories={categories}
        cartItems={cartItems}
        addToCart={addToCart}
        user={user}
        openAuthModal={openAuthModal}
      />

      <ServicesSection />

      <Footer />
    </div>
  );
};

export default MedicineMarketplace;