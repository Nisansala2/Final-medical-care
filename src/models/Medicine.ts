import mongoose from 'mongoose';

const MedicineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  manufacturer: { type: String, required: true },
  dosage: { type: String, required: true },
  prescriptionRequired: { type: Boolean, default: false },
  inStock: { type: Boolean, default: true },
  stockQuantity: { type: Number, default: 0 },
  image: { type: String, default: '/placeholder-medicine.jpg' },
  featured: { type: Boolean, default: false },
  ingredients: [{ type: String }],
  sideEffects: [{ type: String }],
  warnings: [{ type: String }]
}, {
  timestamps: true
});

export default mongoose.models.Medicine || mongoose.model('Medicine', MedicineSchema);