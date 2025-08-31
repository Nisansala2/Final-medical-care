// src/app/api/medicines/bulk/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Medicine from '@/models/Medicine';

// DELETE - Clear all medicines from database
export async function DELETE() {
  try {
    await dbConnect();
    
    const result = await Medicine.deleteMany({});
    
    return NextResponse.json({
      success: true,
      message: `Successfully deleted ${result.deletedCount} medicines`,
      deletedCount: result.deletedCount
    });
  } catch (error) {
    console.error('Error clearing database:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to clear database' },
      { status: 500 }
    );
  }
}

// POST - Bulk update medicines
export async function POST(request: Request) {
  try {
    await dbConnect();
    
    const { medicines, operation } = await request.json();
    
    if (operation === 'updateStock') {
      // Bulk update stock quantities
      const bulkOps = medicines.map((med: any) => ({
        updateOne: {
          filter: { _id: med._id },
          update: { 
            stockQuantity: med.stockQuantity,
            inStock: med.stockQuantity > 0,
            updatedAt: new Date()
          }
        }
      }));
      
      const result = await Medicine.bulkWrite(bulkOps);
      
      return NextResponse.json({
        success: true,
        message: `Successfully updated ${result.modifiedCount} medicines`,
        modifiedCount: result.modifiedCount
      });
    }
    
    if (operation === 'updatePrices') {
      // Bulk update prices
      const bulkOps = medicines.map((med: any) => ({
        updateOne: {
          filter: { _id: med._id },
          update: { 
            price: med.price,
            originalPrice: med.originalPrice,
            updatedAt: new Date()
          }
        }
      }));
      
      const result = await Medicine.bulkWrite(bulkOps);
      
      return NextResponse.json({
        success: true,
        message: `Successfully updated prices for ${result.modifiedCount} medicines`,
        modifiedCount: result.modifiedCount
      });
    }
    
    return NextResponse.json(
      { success: false, error: 'Invalid operation' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error in bulk operation:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to perform bulk operation' },
      { status: 500 }
    );
  }
}