import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: { type: String, default: 'Sri Lanka' }
  },
  role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true
});

export default mongoose.models.User || mongoose.model('User', UserSchema);