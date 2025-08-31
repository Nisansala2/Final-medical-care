// src/components/admin/MedicineForm.tsx
import { useState, useEffect } from 'react';
import { Medicine, PharmacyLocation } from '@/type';

interface MedicineFormProps {
  medicine?: Medicine | null;
  onSubmit: (medicine: Partial<Medicine>) => void;
  onCancel: () => void;
}

export default function MedicineForm({ medicine, onSubmit, onCancel }: MedicineFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    originalPrice: 0,
    category: '',
    manufacturer: '',
    dosage: '',
    prescriptionRequired: false,
    inStock: true,
    stockQuantity: 0,
    featured: false,
    rare: false,
    ingredients: [] as string[],
    sideEffects: [] as string[],
    warnings: [] as string[],
    pharmacyLocations: [] as PharmacyLocation[]
  });

  const [newIngredient, setNewIngredient] = useState('');
  const [newSideEffect, setNewSideEffect] = useState('');
  const [newWarning, setNewWarning] = useState('');
  const [newPharmacy, setNewPharmacy] = useState<PharmacyLocation>({
    name: '',
    address: '',
    latitude: 0,
    longitude: 0,
    phone: '',
    distance: '',
    stock: 0
  });

  // Categories for dropdown
  const categories = [
    'Pain Relief',
    'Antibiotics',
    'Vitamins',
    'Digestive Health',
    'Allergy Relief',
    'Heart Health',
    'Diabetes',
    'Respiratory',
    'Skin Care',
    'Mental Health'
  ];

  useEffect(() => {
    if (medicine) {
      setFormData({
        name: medicine.name || '',
        description: medicine.description || '',
        price: medicine.price || 0,
        originalPrice: medicine.originalPrice || 0,
        category: medicine.category || '',
        manufacturer: medicine.manufacturer || '',
        dosage: medicine.dosage || '',
        prescriptionRequired: medicine.prescriptionRequired || false,
        inStock: medicine.inStock || true,
        stockQuantity: medicine.stockQuantity || 0,
        featured: medicine.featured || false,
        rare: medicine.rare || false,
        ingredients: medicine.ingredients || [],
        sideEffects: medicine.sideEffects || [],
        warnings: medicine.warnings || [],
        pharmacyLocations: medicine.pharmacyLocations || []
      });
    }
  }, [medicine]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'number') {
      setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const addIngredient = () => {
    if (newIngredient.trim()) {
      setFormData(prev => ({
        ...prev,
        ingredients: [...prev.ingredients, newIngredient.trim()]
      }));
      setNewIngredient('');
    }
  };

  const removeIngredient = (index: number) => {
    setFormData(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index)
    }));
  };

  const addSideEffect = () => {
    if (newSideEffect.trim()) {
      setFormData(prev => ({
        ...prev,
        sideEffects: [...prev.sideEffects, newSideEffect.trim()]
      }));
      setNewSideEffect('');
    }
  };

  const removeSideEffect = (index: number) => {
    setFormData(prev => ({
      ...prev,
      sideEffects: prev.sideEffects.filter((_, i) => i !== index)
    }));
  };

  const addWarning = () => {
    if (newWarning.trim()) {
      setFormData(prev => ({
        ...prev,
        warnings: [...prev.warnings, newWarning.trim()]
      }));
      setNewWarning('');
    }
  };

  const removeWarning = (index: number) => {
    setFormData(prev => ({
      ...prev,
      warnings: prev.warnings.filter((_, i) => i !== index)
    }));
  };

  const addPharmacy = () => {
    if (newPharmacy.name.trim() && newPharmacy.address.trim()) {
      setFormData(prev => ({
        ...prev,
        pharmacyLocations: [...prev.pharmacyLocations, { ...newPharmacy }]
      }));
      setNewPharmacy({
        name: '',
        address: '',
        latitude: 0,
        longitude: 0,
        phone: '',
        distance: '',
        stock: 0
      });
    }
  };

  const removePharmacy = (index: number) => {
    setFormData(prev => ({
      ...prev,
      pharmacyLocations: prev.pharmacyLocations.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {medicine ? 'Edit Medicine' : 'Add New Medicine'}
        </h2>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Medicine Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Manufacturer and Dosage */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="manufacturer" className="block text-sm font-medium text-gray-700 mb-2">
              Manufacturer *
            </label>
            <input
              type="text"
              id="manufacturer"
              name="manufacturer"
              value={formData.manufacturer}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="dosage" className="block text-sm font-medium text-gray-700 mb-2">
              Dosage *
            </label>
            <input
              type="text"
              id="dosage"
              name="dosage"
              value={formData.dosage}
              onChange={handleInputChange}
              required
              placeholder="e.g., 500mg, 10ml"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Pricing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
              Price (₹) *
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
              min="0"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="originalPrice" className="block text-sm font-medium text-gray-700 mb-2">
              Original Price (₹) <span className="text-gray-400">(for discounts)</span>
            </label>
            <input
              type="number"
              id="originalPrice"
              name="originalPrice"
              value={formData.originalPrice}
              onChange={handleInputChange}
              min="0"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Stock Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="stockQuantity" className="block text-sm font-medium text-gray-700 mb-2">
              Stock Quantity *
            </label>
            <input
              type="number"
              id="stockQuantity"
              name="stockQuantity"
              value={formData.stockQuantity}
              onChange={handleInputChange}
              required
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex flex-col space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="inStock"
                name="inStock"
                checked={formData.inStock}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="inStock" className="ml-2 block text-sm text-gray-900">
                In Stock
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="prescriptionRequired"
                name="prescriptionRequired"
                checked={formData.prescriptionRequired}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="prescriptionRequired" className="ml-2 block text-sm text-gray-900">
                Prescription Required
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                checked={formData.featured}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="featured" className="ml-2 block text-sm text-gray-900">
                Featured Product
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="rare"
                name="rare"
                checked={formData.rare}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="rare" className="ml-2 block text-sm text-gray-900">
                Rare Medicine
              </label>
            </div>
          </div>
        </div>

        {/* Ingredients */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ingredients
          </label>
          <div className="space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                value={newIngredient}
                onChange={(e) => setNewIngredient(e.target.value)}
                placeholder="Add ingredient"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={addIngredient}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.ingredients.map((ingredient, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                >
                  {ingredient}
                  <button
                    type="button"
                    onClick={() => removeIngredient(index)}
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Side Effects */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Side Effects
          </label>
          <div className="space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                value={newSideEffect}
                onChange={(e) => setNewSideEffect(e.target.value)}
                placeholder="Add side effect"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={addSideEffect}
                className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.sideEffects.map((sideEffect, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-orange-100 text-orange-800"
                >
                  {sideEffect}
                  <button
                    type="button"
                    onClick={() => removeSideEffect(index)}
                    className="ml-2 text-orange-600 hover:text-orange-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Warnings */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Warnings
          </label>
          <div className="space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                value={newWarning}
                onChange={(e) => setNewWarning(e.target.value)}
                placeholder="Add warning"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={addWarning}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.warnings.map((warning, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-red-100 text-red-800"
                >
                  {warning}
                  <button
                    type="button"
                    onClick={() => removeWarning(index)}
                    className="ml-2 text-red-600 hover:text-red-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Pharmacy Locations */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Pharmacy Locations
          </label>
          
          {/* Add New Pharmacy Form */}
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Add Pharmacy Location</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Pharmacy Name"
                value={newPharmacy.name}
                onChange={(e) => setNewPharmacy(prev => ({ ...prev, name: e.target.value }))}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="text"
                placeholder="Address"
                value={newPharmacy.address}
                onChange={(e) => setNewPharmacy(prev => ({ ...prev, address: e.target.value }))}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="text"
                placeholder="Phone"
                value={newPharmacy.phone}
                onChange={(e) => setNewPharmacy(prev => ({ ...prev, phone: e.target.value }))}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="text"
                placeholder="Distance (e.g., 2.5 km)"
                value={newPharmacy.distance}
                onChange={(e) => setNewPharmacy(prev => ({ ...prev, distance: e.target.value }))}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="number"
                placeholder="Latitude"
                value={newPharmacy.latitude}
                onChange={(e) => setNewPharmacy(prev => ({ ...prev, latitude: parseFloat(e.target.value) || 0 }))}
                step="0.000001"
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="number"
                placeholder="Longitude"
                value={newPharmacy.longitude}
                onChange={(e) => setNewPharmacy(prev => ({ ...prev, longitude: parseFloat(e.target.value) || 0 }))}
                step="0.000001"
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              type="button"
              onClick={addPharmacy}
              className="mt-3 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Add Pharmacy
            </button>
          </div>

          {/* Existing Pharmacies */}
          <div className="space-y-2">
            {formData.pharmacyLocations.map((pharmacy, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
                <div>
                  <h5 className="font-medium text-gray-900">{pharmacy.name}</h5>
                  <p className="text-sm text-gray-600">{pharmacy.address}</p>
                  <p className="text-sm text-gray-500">{pharmacy.phone} • {pharmacy.distance}</p>
                </div>
                <button
                  type="button"
                  onClick={() => removePharmacy(index)}
                  className="text-red-600 hover:text-red-800 transition-colors"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4 pt-6 border-t">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            {medicine ? 'Update Medicine' : 'Create Medicine'}
          </button>
        </div>
      </form>
    </div>
  );
}