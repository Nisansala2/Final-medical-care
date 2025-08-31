import { Medicine } from '@/type'; // Using your existing type file

export function adaptMedicineForComponents(dbMedicine: any): Medicine {
  return {
    id: dbMedicine._id?.toString() || Math.floor(Math.random() * 10000).toString(), // Convert MongoDB _id to string
    name: dbMedicine.name,
    category: dbMedicine.category,
    price: dbMedicine.price, // Keep as number
    originalPrice: dbMedicine.price > 500 ? Math.floor(dbMedicine.price * 1.2) : 0, // Return 0 if not applicable
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
    ingredients: dbMedicine.ingredients || [],
    pharmacyLocations: dbMedicine.pharmacyLocations?.map((loc: any) => ({
      name: loc.name,
      address: loc.address,
      latitude: loc.latitude,
      longitude: loc.longitude,
      stock: loc.stock
    })) || [],
    manufacturer: dbMedicine.manufacturer || '',
    dosage: dbMedicine.dosage || '',
    prescriptionRequired: dbMedicine.prescriptionRequired || false,
    inStock: dbMedicine.inStock || false,
    stockQuantity: dbMedicine.stockQuantity || 0,
    featured: dbMedicine.featured || false,
    sideEffects: dbMedicine.sideEffects || [],
    warnings: dbMedicine.warnings || [],
    createdAt: dbMedicine.createdAt ? new Date(dbMedicine.createdAt) : undefined,
    updatedAt: dbMedicine.updatedAt ? new Date(dbMedicine.updatedAt) : undefined
  };
}
