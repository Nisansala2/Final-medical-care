import { Medicine } from '@/type'; // Using your existing type file

export function adaptMedicineForComponents(dbMedicine: any): Medicine {
  const id = dbMedicine._id?.toString() || Math.random().toString(36).substr(2, 9);
  return {
    _id: dbMedicine._id?.toString(),
    id: id, // Use unique string id from MongoDB _id
    name: dbMedicine.name,
    category: dbMedicine.category,
    price: `LKR ${dbMedicine.price}`, // Format as string
    originalPrice: dbMedicine.price > 500 ? `LKR ${Math.floor(dbMedicine.price * 1.2)}` : '', // As string
    image: '💊', // Default emoji since your cards use emojis
    rating: 4.2, // Default rating
    reviews: Math.floor(Math.random() * 100) + 10, // Random reviews
    availability: dbMedicine.inStock
      ? (dbMedicine.stockQuantity < 10 ? 'Limited Stock' : 'In Stock')
      : 'Out of Stock',
    description: dbMedicine.description,
    prescription: dbMedicine.prescriptionRequired || false,
    rare: dbMedicine.featured || false, // Map featured to rare
    keywords: dbMedicine.ingredients || [], // Use ingredients as keywords
    manufacturer: dbMedicine.manufacturer || '',
    dosage: dbMedicine.dosage || '',
    prescriptionRequired: dbMedicine.prescriptionRequired || false,
    inStock: dbMedicine.inStock || true,
    stockQuantity: dbMedicine.stockQuantity || 0,
    featured: dbMedicine.featured || false,
    ingredients: dbMedicine.ingredients || [],
    sideEffects: dbMedicine.sideEffects || [],
    warnings: dbMedicine.warnings || [],
    pharmacyLocations: dbMedicine.pharmacyLocations?.map((loc: any) => ({
      name: loc.name,
      address: loc.address,
      latitude: loc.latitude,
      longitude: loc.longitude,
      stock: loc.stock
    })) || [],
    createdAt: dbMedicine.createdAt,
    updatedAt: dbMedicine.updatedAt
  };
}
