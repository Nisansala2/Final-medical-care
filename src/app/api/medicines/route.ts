import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Medicine from '@/models/Medicine';

// GET all medicines with optional filters
export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const search = searchParams.get('search');
    
    let filter: any = { inStock: true };
    
    if (category) filter.category = category;
    if (featured === 'true') filter.featured = true;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    const medicines = await Medicine.find(filter).sort({ createdAt: -1 });
    
    return NextResponse.json({
      success: true,
      data: medicines,
      count: medicines.length
    });
  } catch (error) {
    console.error('Error fetching medicines:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch medicines'
    }, { status: 500 });
  }
}

// POST - Create new medicine (Admin only)
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const medicine = await Medicine.create(body);
    
    return NextResponse.json({
      success: true,
      data: medicine,
      message: 'Medicine created successfully'
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating medicine:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to create medicine'
    }, { status: 500 });
  }
}