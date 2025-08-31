import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";

export async function GET() {
  try {
    console.log('Testing MongoDB connection...');
    console.log('MONGODB_URI exists:', !!process.env.MONGODB_URI);
    console.log('MONGODB_DB:', process.env.MONGODB_DB);

    const mongoose = await dbConnect();
    
    // Test the connection by accessing the database
    const db = mongoose.connection.db;
    if (!db) {
      throw new Error('Database connection not established');
    }

    // List collections to verify connection
    const collections = await db.listCollections().toArray();
    
    return NextResponse.json({ 
      ok: true, 
      message: 'MongoDB connected successfully',
      database: process.env.MONGODB_DB,
      collections: collections.map(c => c.name),
      connectionState: mongoose.connection.readyState // 1 = connected
    });
  } catch (error) {
    console.error('MongoDB connection error:', error);
    
    return NextResponse.json({ 
      ok: false, 
      error: (error as Error).message,
      mongodbUri: process.env.MONGODB_URI ? 'Set' : 'Not set',
      errorType: (error as any).code || 'Unknown'
    }, { status: 500 });
  }
}