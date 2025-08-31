import { Medicine } from '@/type';

const API_BASE = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

// Medicine API functions
export const medicineAPI = {
  // Get all medicines with optional filters
  getAll: async (params?: { category?: string; featured?: boolean; search?: string }) => {
    const searchParams = new URLSearchParams();
    if (params?.category) searchParams.set('category', params.category);
    if (params?.featured) searchParams.set('featured', 'true');
    if (params?.search) searchParams.set('search', params.search);
    
    const response = await fetch(`${API_BASE}/api/medicines?${searchParams}`);
    if (!response.ok) throw new Error('Failed to fetch medicines');
    return response.json();
  },

  // Get single medicine
  getById: async (id: string) => {
    const response = await fetch(`${API_BASE}/api/medicines/${id}`);
    if (!response.ok) throw new Error('Failed to fetch medicine');
    return response.json();
  },

  // Create new medicine (Admin)
  create: async (medicine: Omit<Medicine, '_id' | 'createdAt' | 'updatedAt'>) => {
    const response = await fetch(`${API_BASE}/api/medicines`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(medicine)
    });
    if (!response.ok) throw new Error('Failed to create medicine');
    return response.json();
  },

  // Update medicine
  update: async (id: string, medicine: Partial<Medicine>) => {
    const response = await fetch(`${API_BASE}/api/medicines/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(medicine)
    });
    if (!response.ok) throw new Error('Failed to update medicine');
    return response.json();
  },

  // Delete medicine
  delete: async (id: string) => {
    const response = await fetch(`${API_BASE}/api/medicines/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete medicine');
    return response.json();
  }
};

// Categories API
export const categoriesAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE}/api/categories`);
    if (!response.ok) throw new Error('Failed to fetch categories');
    return response.json();
  }
};