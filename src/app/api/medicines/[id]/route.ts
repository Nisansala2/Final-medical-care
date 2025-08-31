import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Medicine from '@/models/Medicine';

// GET single medicine
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const medicine = await Medicine.findById(params.id);
    
    if (!medicine) {
      return NextResponse.json({
        success: false,
        error: 'Medicine not found'
      }, { status: 404 });
    }
    
    return NextResponse.json({
      success: true,
      data: medicine
    });
  } catch (error) {
    console.error('Error fetching medicine:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch medicine'
    }, { status: 500 });
  }
}

// PUT - Update medicine
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const medicine = await Medicine.findByIdAndUpdate(
      params.id,
      body,
      { new: true, runValidators: true }
    );
    
    if (!medicine) {
      return NextResponse.json({
        success: false,
        error: 'Medicine not found'
      }, { status: 404 });
    }
    
    return NextResponse.json({
      success: true,
      data: medicine,
      message: 'Medicine updated successfully'
    });
  } catch (error) {
    console.error('Error updating medicine:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to update medicine'
    }, { status: 500 });
  }
}

// DELETE medicine
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const medicine = await Medicine.findByIdAndDelete(params.id);
    
    if (!medicine) {
      return NextResponse.json({
        success: false,
        error: 'Medicine not found'
      }, { status: 404 });
    }
    
    return NextResponse.json({
      success: true,
      message: 'Medicine deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting medicine:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to delete medicine'
    }, { status: 500 });
  }
}