import { Medicine } from '@/type'; // Using your existing type file

export function adaptMedicineForComponents(dbMedicine: any): Medicine {
  return {
    id: parseInt(dbMedicine._id?.toString()) || Math.floor(Math.random() * 10000), // Convert MongoDB _id to number
    name: dbMedicine.name,
    category: dbMedicine.category,
    price: `LKR ${dbMedicine.price}`, // Format price as string
    originalPrice: dbMedicine.price > 500 ? `LKR ${Math.floor(dbMedicine.price * 1.2)}` : '', // Return empty string
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
  };
}