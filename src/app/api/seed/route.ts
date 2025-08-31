// src/app/api/seed/route.ts
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
    warnings: ["Do not exceed recommended dose"],
    pharmacyLocations: [
      {
        name: "City Pharmacy",
        latitude: 6.9271,
        longitude: 79.8612,
        address: "123 Main St, Colombo",
        phone: "011-2345678",
        distance: "1.2 km"
      },
      {
        name: "MediCare Center",
        latitude: 6.9147,
        longitude: 79.9733,
        address: "45 Galle Road, Colombo",
        phone: "011-3456789",
        distance: "3.5 km"
      }
    ]
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
    warnings: ["Complete full course even if feeling better"],
    pharmacyLocations: [
      {
        name: "HealthFirst Pharmacy",
        latitude: 6.9275,
        longitude: 79.8610,
        address: "88 Kandy Rd, Colombo",
        phone: "011-5678901",
        distance: "2.1 km"
      },
      {
        name: "WellCare Pharmacy",
        latitude: 6.9300,
        longitude: 79.8725,
        address: "12 Station Rd, Colombo",
        phone: "011-6789012",
        distance: "4.8 km"
      }
    ]
  },
  {
    name: "Vitamin D3 1000IU",
    description: "Vitamin D supplement for bone health",
    price: 890,
    originalPrice: 1068,
    category: "Vitamins",
    manufacturer: "Health Plus",
    dosage: "1000IU",
    prescriptionRequired: false,
    inStock: true,
    stockQuantity: 75,
    featured: true,
    rare: true,
    ingredients: ["Cholecalciferol"],
    sideEffects: ["Rare: nausea, weakness"],
    warnings: ["Do not exceed daily recommended dose"],
    pharmacyLocations: [
      {
        name: "City Pharmacy",
        latitude: 6.9271,
        longitude: 79.8612,
        address: "123 Main Street, Colombo",
        phone: "011-2345678",
        distance: "1.2 km"
      },
      {
        name: "HealthCare Pharmacy",
        latitude: 6.9147,
        longitude: 79.9733,
        address: "456 Galle Road, Colombo",
        phone: "011-8765432",
        distance: "2.5 km"
      }
    ]
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
    warnings: ["Take before meals"],
    pharmacyLocations: [
      {
        name: "Central Pharmacy",
        latitude: 6.9200,
        longitude: 79.8600,
        address: "77 Hospital Rd, Colombo",
        phone: "011-9876543",
        distance: "1.5 km"
      }
    ]
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
    warnings: ["May cause drowsiness"],
    pharmacyLocations: [
      {
        name: "QuickMeds",
        latitude: 6.9250,
        longitude: 79.8700,
        address: "200 Highlevel Rd, Colombo",
        phone: "011-3456789",
        distance: "2.7 km"
      },
      {
        name: "Neighborhood Pharmacy",
        latitude: 6.9300,
        longitude: 79.8750,
        address: "32 Lake Rd, Colombo",
        phone: "011-4567890",
        distance: "5.2 km"
      }
    ]
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
    return NextResponse.json(
      //{ success: false, error: 'Failed to seed database', details: error.message },
      { status: 500 }
    );
  }
}
