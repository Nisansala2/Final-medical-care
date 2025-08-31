import { useState, useEffect, useCallback } from 'react';
import { Medicine } from '@/type';
import { medicineAPI } from '@/lib/api';

export function useMedicines(filters?: { category?: string; featured?: boolean; search?: string }) {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMedicines = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await medicineAPI.getAll(filters);
      if (response.success) {
        setMedicines(response.data);
      } else {
        setError(response.error || 'Failed to fetch medicines');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [filters?.category, filters?.featured, filters?.search]);

  useEffect(() => {
    fetchMedicines();
  }, [fetchMedicines]);

  return { medicines, loading, error, refetch: fetchMedicines };
}

export function useMedicine(id: string) {
  const [medicine, setMedicine] = useState<Medicine | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    async function fetchMedicine() {
      try {
        setLoading(true);
        setError(null);
        const response = await medicineAPI.getById(id);
        if (response.success) {
          setMedicine(response.data);
        } else {
          setError(response.error || 'Failed to fetch medicine');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchMedicine();
  }, [id]);

  return { medicine, loading, error };
}