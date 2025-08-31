import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Medicine from '@/models/Medicine';

const sampleMedicines = [
  {
    name: "Paracetamol 500mg",
    description: "Pain reliever and fever reducer",
    price: 150,
    category: "Pain Relief",
    manufacturer: "Generic Pharma",
    dosage: "500mg",
    prescriptionRequired: false,
    inStock: true,
    stockQuantity: 100,
    featured: true,
    ingredients: ["Paracetamol"],
    sideEffects: ["Nausea", "Skin rash (rare)"],
    warnings: ["Do not exceed recommended dose"]
  },
  {
    name: "Amoxicillin 250mg",
    description: "Antibiotic for bacterial infections",
    price: 320,
    category: "Antibiotics",
    manufacturer: "Pharma Solutions",
    dosage: "250mg",
    prescriptionRequired: true,
    inStock: true,
    stockQuantity: 50,
    featured: false,
    ingredients: ["Amoxicillin trihydrate"],
    sideEffects: ["Diarrhea", "Nausea", "Allergic reactions"],
    warnings: ["Complete full course even if feeling better"]
  },
  {
    name: "Vitamin D3 1000IU",
    description: "Vitamin D supplement for bone health",
    price: 890,
    category: "Vitamins",
    manufacturer: "Health Plus",
    dosage: "1000IU",
    prescriptionRequired: false,
    inStock: true,
    stockQuantity: 75,
    featured: true,
    ingredients: ["Cholecalciferol"],
    sideEffects: ["Rare: nausea, weakness"],
    warnings: ["Do not exceed daily recommended dose"]
  },
  {
    name: "Omeprazole 20mg",
    description: "Proton pump inhibitor for acid reflux",
    price: 450,
    category: "Digestive Health",
    manufacturer: "MediCare Ltd",
    dosage: "20mg",
    prescriptionRequired: false,
    inStock: true,
    stockQuantity: 30,
    featured: false,
    ingredients: ["Omeprazole"],
    sideEffects: ["Headache", "Diarrhea", "Stomach pain"],
    warnings: ["Take before meals"]
  },
  {
    name: "Cetirizine 10mg",
    description: "Antihistamine for allergies",
    price: 180,
    category: "Allergy Relief",
    manufacturer: "AllergyCare",
    dosage: "10mg",
    prescriptionRequired: false,
    inStock: true,
    stockQuantity: 60,
    featured: false,
    ingredients: ["Cetirizine hydrochloride"],
    sideEffects: ["Drowsiness", "Dry mouth"],
    warnings: ["May cause drowsiness"]
  }
];

export async function POST() {
  try {
    await dbConnect();
    
    // Clear existing medicines
    await Medicine.deleteMany({});
    
    // Insert sample data
    const medicines = await Medicine.insertMany(sampleMedicines);
    
    return NextResponse.json({
      success: true,
      message: `Successfully seeded ${medicines.length} medicines`,
      data: medicines
    });
  } catch (error) {
    console.error('Seeding error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to seed database'
    }, { status: 500 });
  }
}